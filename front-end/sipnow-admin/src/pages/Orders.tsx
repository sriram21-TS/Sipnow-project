import { useState, type ChangeEvent } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { Search, ChevronDown } from "lucide-react";
import { api } from "../lib/api";
import Modal from "../components/Modal";
import PaginationBar from "../components/PaginationBar";
import OrderDeliveryPanel, {
  type Delivery,
} from "../components/OrderDeliveryPanel";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type OrderUser = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
};

type PickupStore = {
  name: string;
  line1: string;
  line2: string | null;
  city: string;
  county: string;
  postcode: string;
  phone: string | null;
  hours: string | null;
};

type Order = {
  id: string;
  user: OrderUser | null;
  guestName: string | null;
  guestEmail: string | null;
  guestPhone: string | null;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string | null;
  fulfillmentType: "delivery" | "pickup";
  shippingAddress: Record<string, string> | null;
  pickupStore: PickupStore | null;
  createdAt: string;
  updatedAt: string;
};

function customerName(o: Order) {
  return o.user
    ? `${o.user.firstName} ${o.user.lastName}`
    : (o.guestName ?? "Guest");
}
function customerEmail(o: Order) {
  return o.user?.email ?? o.guestEmail ?? "—";
}
function customerPhone(o: Order) {
  return o.user?.phone ?? o.guestPhone ?? null;
}

const ALL_STATUSES = [
  "pending",
  "created",
  "ready_for_pickup",
  "booked",
  "assigned",
  "collected",
  "delivered",
  "cancelled",
  "returned",
];

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  created: "bg-blue-100 text-blue-700",
  ready_for_pickup: "bg-orange-100 text-orange-700",
  booked: "bg-cyan-100 text-cyan-700",
  assigned: "bg-indigo-100 text-indigo-700",
  collected: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  returned: "bg-gray-100 text-gray-600",
};

const STATUS_LABELS: Record<string, string> = {
  ready_for_pickup: "ready for pickup",
};

const PER_PAGE = 20;

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Orders() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState<Order | null>(null);
  const [statusErr, setStatusErr] = useState("");
  const [deliveryActionErr, setDeliveryActionErr] = useState("");
  const [isDownloadingLabel, setIsDownloadingLabel] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-orders", page, search, statusFilter],
    queryFn: () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(PER_PAGE),
      });
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      return api.get<{ orders: Order[]; total: number }>(
        `/admin/orders?${params}`,
      );
    },
    placeholderData: keepPreviousData,
  });

  const orders = data?.orders ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PER_PAGE);

  // For delivery orders, status is otherwise derived automatically from
  // Rendr's delivery status — cancellation is the sole manual override there,
  // for cases Rendr can't represent (e.g. a support-initiated cancellation).
  // Pickup orders have no Rendr delivery to sync from at all, so
  // ready_for_pickup/delivered are also manual, admin-driven transitions.
  const cancelOrderMutation = useMutation({
    mutationFn: (id: string) =>
      api.patch<Order>(`/orders/${id}/status`, { status: "cancelled" }),
    onSuccess: (updated: Order) => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      setSelected(updated);
      setStatusErr("");
    },
    onError: (err: Error) => setStatusErr(err.message),
  });

  const markReadyForPickupMutation = useMutation({
    mutationFn: (id: string) =>
      api.patch<Order>(`/orders/${id}/status`, { status: "ready_for_pickup" }),
    onSuccess: (updated: Order) => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      setSelected(updated);
      setStatusErr("");
    },
    onError: (err: Error) => setStatusErr(err.message),
  });

  const markCollectedMutation = useMutation({
    mutationFn: (id: string) =>
      api.patch<Order>(`/orders/${id}/status`, { status: "delivered" }),
    onSuccess: (updated: Order) => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      setSelected(updated);
      setStatusErr("");
    },
    onError: (err: Error) => setStatusErr(err.message),
  });

  const deliveryQuery = useQuery({
    queryKey: ["order-delivery", selected?.id],
    queryFn: () => api.get<Delivery>(`/admin/deliveries/order/${selected!.id}`),
    enabled: !!selected && selected.fulfillmentType !== "pickup",
    retry: false,
  });

  function invalidateDelivery() {
    queryClient.invalidateQueries({
      queryKey: ["order-delivery", selected?.id],
    });
  }

  const retryDeliveryMutation = useMutation({
    mutationFn: () =>
      api.post<Delivery>(`/admin/deliveries/order/${selected!.id}/retry`, {}),
    onSuccess: () => {
      invalidateDelivery();
      setDeliveryActionErr("");
    },
    onError: (err: Error) => setDeliveryActionErr(err.message),
  });

  const cancelDeliveryMutation = useMutation({
    mutationFn: (reason: string) =>
      api.patch<Delivery>(`/admin/deliveries/order/${selected!.id}/cancel`, {
        reason,
      }),
    onSuccess: () => {
      invalidateDelivery();
      setDeliveryActionErr("");
    },
    onError: (err: Error) => setDeliveryActionErr(err.message),
  });

  const refreshDeliveryMutation = useMutation({
    mutationFn: () =>
      api.post<Delivery>(`/admin/deliveries/order/${selected!.id}/refresh`, {}),
    onSuccess: () => {
      invalidateDelivery();
      setDeliveryActionErr("");
    },
    onError: (err: Error) => setDeliveryActionErr(err.message),
  });

  async function handleDownloadLabel() {
    if (!selected) return;
    setIsDownloadingLabel(true);
    try {
      const blob = await api.getBlob(
        `/admin/deliveries/order/${selected.id}/label`,
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `delivery-label-${selected.id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      setDeliveryActionErr("");
    } catch (err) {
      setDeliveryActionErr(
        err instanceof Error ? err.message : "Failed to download label",
      );
    } finally {
      setIsDownloadingLabel(false);
    }
  }

  function openOrder(order: Order) {
    setSelected(order);
    setStatusErr("");
    setDeliveryActionErr("");
  }

  function cancelOrder() {
    if (!selected) return;
    if (
      !globalThis.confirm(
        `Cancel order #${selected.id.slice(-8).toUpperCase()}? This cannot be undone.`,
      )
    )
      return;
    cancelOrderMutation.mutate(selected.id);
  }

  const addr = selected?.shippingAddress;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <h2 className="text-xl font-semibold text-gray-900">Orders</h2>
        {total > 0 && <p className="text-sm text-gray-400">{total} total</p>}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative max-w-xs flex-1">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name, email, phone or order ID…"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white"
          >
            <option value="">All statuses</option>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <ChevronDown
            size={13}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error.message}</p>}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Order
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Items
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Total
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(() => {
                if (isLoading) {
                  return (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-10 text-center text-sm text-gray-400"
                      >
                        Loading…
                      </td>
                    </tr>
                  );
                }
                if (orders.length === 0) {
                  return (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-10 text-center text-sm text-gray-400"
                      >
                        No orders found
                      </td>
                    </tr>
                  );
                }
                return orders.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => openOrder(o)}
                    className="hover:bg-gray-50/60 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">
                      #{o.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 truncate max-w-40">
                        {customerName(o)}
                      </p>
                      <p className="text-xs text-gray-400 truncate max-w-40">
                        {customerEmail(o)}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      {fmt(o.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {o.items.length}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      $ {o.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[o.status] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {STATUS_LABELS[o.status] ?? o.status}
                      </span>
                    </td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>

        <PaginationBar
          page={page}
          totalPages={totalPages}
          total={total}
          perPage={PER_PAGE}
          onPageChange={setPage}
        />
      </div>

      {/* Order detail modal */}
      {selected && (
        <Modal
          title={`Order #${selected.id.slice(-8).toUpperCase()}`}
          onClose={() => setSelected(null)}
        >
          <div className="space-y-4 text-sm">
            {/* Customer */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">
                  Customer
                </p>
                <p className="font-medium text-gray-900">
                  {customerName(selected)}
                </p>
                <p className="text-xs text-gray-500">
                  {customerEmail(selected)}
                </p>
                {customerPhone(selected) && (
                  <p className="text-xs text-gray-500">
                    {customerPhone(selected)}
                  </p>
                )}
                {!selected.user && (
                  <span className="text-[10px] text-gray-400 bg-gray-100 rounded px-1.5 py-0.5">
                    Guest
                  </span>
                )}
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">
                  Placed
                </p>
                <p className="text-gray-700">{fmt(selected.createdAt)}</p>
              </div>
            </div>

            {/* Shipping address (delivery orders) */}
            {addr && (
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">
                  Shipping Address
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {[
                    addr.line1,
                    addr.line2,
                    addr.city,
                    addr.county,
                    addr.postcode,
                    addr.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            )}

            {/* Pickup store + ready/collected controls (pickup orders) */}
            {selected.fulfillmentType === "pickup" && (
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">
                  Pickup Store
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {selected.pickupStore
                    ? [
                        selected.pickupStore.name,
                        selected.pickupStore.line1,
                        selected.pickupStore.line2,
                        selected.pickupStore.city,
                        selected.pickupStore.county,
                        selected.pickupStore.postcode,
                      ]
                        .filter(Boolean)
                        .join(", ")
                    : "—"}
                </p>
                {!["cancelled", "delivered", "returned"].includes(
                  selected.status,
                ) && (
                  <div className="flex items-center gap-2 mt-2">
                    {selected.status !== "ready_for_pickup" && (
                      <button
                        onClick={() =>
                          markReadyForPickupMutation.mutate(selected.id)
                        }
                        disabled={markReadyForPickupMutation.isPending}
                        className="text-xs border border-primary/30 text-primary rounded-lg px-3 py-1.5 hover:bg-primary/5 disabled:opacity-50 transition-colors"
                      >
                        {markReadyForPickupMutation.isPending
                          ? "Updating…"
                          : "Mark Ready for Pickup"}
                      </button>
                    )}
                    <button
                      onClick={() => markCollectedMutation.mutate(selected.id)}
                      disabled={markCollectedMutation.isPending}
                      className="text-xs border border-green-200 text-green-700 rounded-lg px-3 py-1.5 hover:bg-green-50 disabled:opacity-50 transition-colors"
                    >
                      {markCollectedMutation.isPending
                        ? "Updating…"
                        : "Mark Collected"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Delivery (delivery orders only — pickup orders never dispatch to Rendr) */}
            {selected.fulfillmentType !== "pickup" && (
              <OrderDeliveryPanel
                delivery={deliveryQuery.data ?? null}
                isLoading={deliveryQuery.isLoading}
                onRetry={() => retryDeliveryMutation.mutate()}
                onCancel={(reason) => cancelDeliveryMutation.mutate(reason)}
                onRefresh={() => refreshDeliveryMutation.mutate()}
                onDownloadLabel={handleDownloadLabel}
                isRetrying={retryDeliveryMutation.isPending}
                isCancelling={cancelDeliveryMutation.isPending}
                isRefreshing={refreshDeliveryMutation.isPending}
                isDownloading={isDownloadingLabel}
                actionError={deliveryActionErr}
              />
            )}

            {/* Items */}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1.5">Items</p>
              <div className="border border-gray-100 rounded-lg divide-y divide-gray-50">
                {selected.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center px-3 py-2"
                  >
                    <p className="text-gray-800 truncate flex-1 mr-4">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 shrink-0">
                      ×{item.quantity}
                    </p>
                    <p className="text-xs font-semibold text-gray-900 ml-4 shrink-0">
                      $ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between px-3 py-2 bg-gray-50">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-semibold text-gray-900">
                    $ {selected.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order status — for delivery orders this is derived
                automatically from Rendr's delivery status (see the Delivery
                panel above); for pickup orders it's driven by the Mark
                Ready/Collected controls above. */}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1.5">
                Order Status
              </p>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[selected.status] ?? "bg-gray-100 text-gray-600"}`}
                >
                  {STATUS_LABELS[selected.status] ?? selected.status}
                </span>
                {!["cancelled", "delivered", "returned"].includes(
                  selected.status,
                ) && (
                  <button
                    onClick={cancelOrder}
                    disabled={cancelOrderMutation.isPending}
                    className="text-xs border border-red-200 text-red-600 rounded-lg px-3 py-1.5 hover:bg-red-50 disabled:opacity-50 transition-colors"
                  >
                    {cancelOrderMutation.isPending
                      ? "Cancelling…"
                      : "Cancel Order"}
                  </button>
                )}
              </div>
              {statusErr && (
                <p className="text-xs text-red-500 mt-1.5">{statusErr}</p>
              )}
            </div>

            {/* Payment info — shown once a payment method is known. Every
                order now has one set at creation (cash or card), so this
                shows immediately at checkout regardless of fulfillment type
                or status. */}
            {selected.paymentMethod && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-0.5">
                    Payment status
                  </p>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      selected.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : selected.paymentStatus === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {selected.paymentStatus}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-0.5">
                    Payment method
                  </p>
                  <p className="text-gray-700 capitalize">
                    {selected.paymentMethod.replaceAll("_", " ")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
