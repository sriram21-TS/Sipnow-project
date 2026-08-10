import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, X, Search, Star } from "lucide-react";
import { api } from "../lib/api";
import Modal from "../components/Modal";
import DeleteModalActions from "../components/DeleteModalActions";

type CouponProduct = {
  productId: string;
  product: { id: string; name: string; sku: string };
};

type FeaturedCoupon = {
  id: number;
  couponId: string;
  displayText: string;
  coupon: Coupon;
};

type CouponScope = "SPECIFIC_PRODUCTS" | "SITEWIDE" | "SITEWIDE_EXCLUDE_PROMO";

type Coupon = {
  id: string;
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  minOrderAmount: number | null;
  maxUses: number | null;
  usedCount: number;
  expiresAt: string | null;
  isActive: boolean;
  scope: CouponScope;
  products: CouponProduct[];
  _count: { orders: number };
};

type ProductOption = { id: string; name: string; sku: string };

type CouponForm = {
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: string;
  minOrderAmount: string;
  maxUses: string;
  expiresAt: string;
  isActive: boolean;
  scope: CouponScope;
  productIds: string[];
};

const EMPTY_FORM: CouponForm = {
  code: "",
  type: "PERCENTAGE",
  value: "",
  minOrderAmount: "",
  maxUses: "",
  expiresAt: "",
  isActive: true,
  scope: "SITEWIDE",
  productIds: [],
};

const SCOPE_OPTIONS: { value: CouponScope; label: string; hint: string }[] = [
  {
    value: "SITEWIDE",
    label: "All products",
    hint: "Applies to every item in the cart",
  },
  {
    value: "SITEWIDE_EXCLUDE_PROMO",
    label: "All products except items already on promotion",
    hint: "Excludes in-store promo, clearance, and member-priced items",
  },
  {
    value: "SPECIFIC_PRODUCTS",
    label: "Specific products",
    hint: "Only the products selected below",
  },
];

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition";

function formatDiscount(c: Coupon) {
  return c.type === "PERCENTAGE"
    ? `${c.value}%`
    : `$ ${c.value.toLocaleString("en-IN")}`;
}

export default function Coupons() {
  const queryClient = useQueryClient();

  const [modal, setModal] = useState<"add" | "edit" | "delete" | null>(null);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [form, setForm] = useState<CouponForm>(EMPTY_FORM);
  const [formErr, setFormErr] = useState("");

  const [productSearch, setProductSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<ProductOption[]>([]);

  const [featuredModal, setFeaturedModal] = useState<Coupon | null>(null);
  const [displayText, setDisplayText] = useState("");

  const {
    data: coupons = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => api.get<Coupon[]>("/coupons"),
  });

  const { data: featured = null } = useQuery({
    queryKey: ["featured-coupon"],
    queryFn: () => api.get<FeaturedCoupon | null>("/coupons/featured"),
  });

  const { data: productResults = [] } = useQuery({
    queryKey: ["product-search", productSearch],
    queryFn: () =>
      productSearch.trim().length >= 2
        ? api
            .get<{
              products: ProductOption[];
            }>(`/products?q=${encodeURIComponent(productSearch)}&limit=10`)
            .then((r) => r.products)
        : Promise.resolve([]),
    enabled: productSearch.trim().length >= 2,
  });

  const saveMutation = useMutation({
    mutationFn: (data: { mode: "add" | "edit"; id?: string; body: object }) =>
      data.mode === "add"
        ? api.post("/coupons", data.body)
        : api.put(`/coupons/${data.id}`, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      setModal(null);
    },
    onError: (err: Error) => setFormErr(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/coupons/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      setModal(null);
    },
    onError: (err: Error) => setFormErr(err.message),
  });

  const featureMutation = useMutation({
    mutationFn: ({
      id,
      displayText: text,
    }: {
      id: string;
      displayText: string;
    }) => api.put(`/coupons/${id}/feature`, { displayText: text }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["featured-coupon"] });
      setFeaturedModal(null);
      setDisplayText("");
    },
    onError: (err: Error) => setFormErr(err.message),
  });

  const clearFeatureMutation = useMutation({
    mutationFn: () => api.delete("/coupons/featured"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["featured-coupon"] });
      setFeaturedModal(null);
      setDisplayText("");
    },
    onError: (err: Error) => setFormErr(err.message),
  });

  function f(
    key: keyof CouponForm,
    value: string | boolean | string[] | CouponScope,
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function openAdd() {
    setForm(EMPTY_FORM);
    setSelectedProducts([]);
    setProductSearch("");
    setFormErr("");
    setModal("add");
  }

  function openEdit(c: Coupon) {
    setEditing(c);
    setForm({
      code: c.code,
      type: c.type,
      value: String(c.value),
      minOrderAmount: c.minOrderAmount != null ? String(c.minOrderAmount) : "",
      maxUses: c.maxUses != null ? String(c.maxUses) : "",
      expiresAt: c.expiresAt ? c.expiresAt.slice(0, 10) : "",
      isActive: c.isActive,
      scope: c.scope,
      productIds: c.products.map((p) => p.productId),
    });
    setSelectedProducts(c.products.map((p) => p.product));
    setProductSearch("");
    setFormErr("");
    setModal("edit");
  }

  function openDelete(c: Coupon) {
    setEditing(c);
    setFormErr("");
    setModal("delete");
  }

  function openFeatured(c: Coupon) {
    setFormErr("");
    setDisplayText(featured?.couponId === c.id ? featured.displayText : "");
    setFeaturedModal(c);
  }

  function addProduct(p: ProductOption) {
    if (selectedProducts.some((s) => s.id === p.id)) return;
    const next = [...selectedProducts, p];
    setSelectedProducts(next);
    f(
      "productIds",
      next.map((s) => s.id),
    );
    setProductSearch("");
  }

  function removeProduct(id: string) {
    const next = selectedProducts.filter((p) => p.id !== id);
    setSelectedProducts(next);
    f(
      "productIds",
      next.map((p) => p.id),
    );
  }

  function setScope(scope: CouponScope) {
    f("scope", scope);
    if (scope !== "SPECIFIC_PRODUCTS") {
      setSelectedProducts([]);
      setProductSearch("");
      f("productIds", []);
    }
  }

  function save() {
    setFormErr("");
    const value = Number.parseFloat(form.value);
    if (Number.isNaN(value) || value < 0) {
      setFormErr("Discount value must be a positive number");
      return;
    }
    if (form.type === "PERCENTAGE" && value > 100) {
      setFormErr("Percentage discount cannot exceed 100");
      return;
    }
    if (form.scope === "SPECIFIC_PRODUCTS" && form.productIds.length === 0) {
      setFormErr("Select at least one product for this scope");
      return;
    }
    const body = {
      code: form.code.trim().toUpperCase(),
      type: form.type,
      value,
      minOrderAmount: form.minOrderAmount
        ? Number.parseFloat(form.minOrderAmount)
        : null,
      maxUses: form.maxUses ? Number.parseInt(form.maxUses, 10) : null,
      expiresAt: form.expiresAt || null,
      isActive: form.isActive,
      scope: form.scope,
      productIds: form.scope === "SPECIFIC_PRODUCTS" ? form.productIds : [],
    };
    saveMutation.mutate({
      mode: modal === "add" ? "add" : "edit",
      id: editing?.id,
      body,
    });
  }

  const STATUS_BADGE: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-500",
    expired: "bg-red-100 text-red-600",
  };

  function couponStatus(c: Coupon) {
    if (!c.isActive) return "inactive";
    if (c.expiresAt && new Date(c.expiresAt) < new Date()) return "expired";
    return "active";
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Coupons</h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 text-xs bg-primary text-white rounded-lg px-3 py-2 hover:bg-primary-dark transition-colors"
        >
          <Plus size={13} /> Create Coupon
        </button>
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error.message}</p>}

      {isLoading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : coupons.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <p className="text-sm text-gray-400">
            No coupons yet. Create one to get started.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Code</th>
                <th className="px-4 py-3 text-left">Discount</th>
                <th className="px-4 py-3 text-left">Scope</th>
                <th className="px-4 py-3 text-left">Uses</th>
                <th className="px-4 py-3 text-left">Expires</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => {
                const status = couponStatus(c);
                return (
                  <tr
                    key={c.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50"
                  >
                    <td className="px-4 py-3 font-mono font-semibold text-gray-900">
                      {c.code}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {formatDiscount(c)}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {c.scope === "SITEWIDE_EXCLUDE_PROMO"
                        ? "All products (excl. promo)"
                        : c.scope === "SPECIFIC_PRODUCTS"
                          ? `${c.products.length} product${c.products.length === 1 ? "" : "s"}`
                          : "All products"}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {c.usedCount}
                      {c.maxUses != null ? ` / ${c.maxUses}` : ""}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {c.expiresAt
                        ? new Date(c.expiresAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_BADGE[status]}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          title={
                            featured?.couponId === c.id
                              ? "Featured"
                              : "Set as featured"
                          }
                          onClick={() => openFeatured(c)}
                          className={`flex items-center gap-1 text-xs transition-colors px-2 py-1 rounded-lg ${featured?.couponId === c.id ? "text-yellow-500 hover:bg-yellow-50" : "text-gray-300 hover:text-yellow-400 hover:bg-yellow-50"}`}
                        >
                          <Star
                            size={12}
                            fill={
                              featured?.couponId === c.id
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                        <button
                          onClick={() => openEdit(c)}
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary/5"
                        >
                          <Pencil size={12} /> Edit
                        </button>
                        <button
                          onClick={() => openDelete(c)}
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <Modal
          title={modal === "add" ? "Create Coupon" : "Edit Coupon"}
          onClose={() => setModal(null)}
        >
          <div className="space-y-3">
            {formErr && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {formErr}
              </p>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Code *
                </label>
                <input
                  className={`${inputCls} uppercase`}
                  value={form.code}
                  onChange={(e) => f("code", e.target.value)}
                  placeholder="SUMMER10"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Type *
                </label>
                <select
                  className={inputCls}
                  value={form.type}
                  onChange={(e) => f("type", e.target.value)}
                >
                  <option value="PERCENTAGE">Percentage (%)</option>
                  <option value="FIXED">Fixed amount ($)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {form.type === "PERCENTAGE" ? "Discount %" : "Discount $"} *
                </label>
                <input
                  type="number"
                  min={0}
                  max={form.type === "PERCENTAGE" ? 100 : undefined}
                  className={inputCls}
                  value={form.value}
                  onChange={(e) => f("value", e.target.value)}
                  placeholder={form.type === "PERCENTAGE" ? "10" : "200"}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Min order amount ($)
                </label>
                <input
                  type="number"
                  min={0}
                  className={inputCls}
                  value={form.minOrderAmount}
                  onChange={(e) => f("minOrderAmount", e.target.value)}
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Max uses
                </label>
                <input
                  type="number"
                  min={1}
                  className={inputCls}
                  value={form.maxUses}
                  onChange={(e) => f("maxUses", e.target.value)}
                  placeholder="Unlimited"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Expiry date
                </label>
                <input
                  type="date"
                  className={inputCls}
                  value={form.expiresAt}
                  onChange={(e) => f("expiresAt", e.target.value)}
                />
              </div>
            </div>

            {/* Scope */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Applies to
              </label>
              <div className="space-y-1.5">
                {SCOPE_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="couponScope"
                      className="mt-0.5 accent-primary"
                      checked={form.scope === opt.value}
                      onChange={() => setScope(opt.value)}
                    />
                    <span>
                      {opt.label}
                      <span className="block text-xs text-gray-400 font-normal">
                        {opt.hint}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Product restriction */}
            {form.scope === "SPECIFIC_PRODUCTS" && (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Select products *
                </label>
                {selectedProducts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {selectedProducts.map((p) => (
                      <span
                        key={p.id}
                        className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full"
                      >
                        {p.name}
                        <button
                          type="button"
                          onClick={() => removeProduct(p.id)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="relative">
                  <Search
                    size={13}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search products to restrict…"
                  />
                </div>
                {productResults.length > 0 &&
                  productSearch.trim().length >= 2 && (
                    <div className="border border-gray-200 rounded-lg mt-1 max-h-40 overflow-y-auto">
                      {productResults.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => addProduct(p)}
                          className="w-full text-left px-3 py-2 text-xs hover:bg-primary/5 transition-colors flex items-center justify-between"
                        >
                          <span className="text-gray-800 truncate">
                            {p.name}
                          </span>
                          <span className="text-gray-400 font-mono ml-2 shrink-0">
                            {p.sku}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="couponActive"
                checked={form.isActive}
                onChange={(e) => f("isActive", e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <label htmlFor="couponActive" className="text-sm text-gray-700">
                Active
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setModal(null)}
                className="text-sm text-gray-600 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saveMutation.isPending}
                className="text-sm bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark disabled:opacity-60 transition-colors"
              >
                {saveMutation.isPending
                  ? "Saving…"
                  : modal === "add"
                    ? "Create Coupon"
                    : "Save Changes"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      {modal === "delete" && editing && (
        <Modal title="Delete Coupon" onClose={() => setModal(null)}>
          <p className="text-sm text-gray-600">
            Delete coupon{" "}
            <strong className="text-gray-900 font-mono">{editing.code}</strong>?
            This cannot be undone. Orders that used this coupon will retain
            their recorded discount amount.
          </p>
          <DeleteModalActions
            formErr={formErr}
            isPending={deleteMutation.isPending}
            onCancel={() => setModal(null)}
            onDelete={() => deleteMutation.mutate(editing.id)}
          />
        </Modal>
      )}

      {/* Featured Coupon Modal */}
      {featuredModal && (
        <Modal
          title="Featured Coupon Banner"
          onClose={() => {
            setFeaturedModal(null);
            setDisplayText("");
            setFormErr("");
          }}
        >
          <div className="space-y-3">
            {formErr && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {formErr}
              </p>
            )}
            <p className="text-sm text-gray-600">
              Coupon{" "}
              <strong className="font-mono text-gray-900">
                {featuredModal.code}
              </strong>{" "}
              will be shown in the site-wide banner.
            </p>
            <div>
              <label
                htmlFor="featuredDisplayText"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Banner text *
              </label>
              <input
                id="featuredDisplayText"
                className={inputCls}
                value={displayText}
                onChange={(e) => setDisplayText(e.target.value)}
                placeholder={`e.g. Use code ${featuredModal.code} for 10% off!`}
              />
              <p className="text-xs text-gray-400 mt-1">
                Include the coupon code so customers know what to use.
              </p>
            </div>
            <div className="flex justify-between gap-2 pt-2">
              {featured?.couponId === featuredModal.id && (
                <button
                  onClick={() => clearFeatureMutation.mutate()}
                  disabled={clearFeatureMutation.isPending}
                  className="text-sm text-red-500 border border-red-200 rounded-lg px-4 py-2 hover:bg-red-50 disabled:opacity-60 transition-colors"
                >
                  {clearFeatureMutation.isPending
                    ? "Removing…"
                    : "Remove Banner"}
                </button>
              )}
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => {
                    setFeaturedModal(null);
                    setDisplayText("");
                    setFormErr("");
                  }}
                  className="text-sm text-gray-600 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    featureMutation.mutate({
                      id: featuredModal.id,
                      displayText,
                    })
                  }
                  disabled={featureMutation.isPending || !displayText.trim()}
                  className="text-sm bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark disabled:opacity-60 transition-colors"
                >
                  {featureMutation.isPending ? "Saving…" : "Set as Featured"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
