import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, ImagePlus, Eye, EyeOff } from "lucide-react";
import { api } from "../lib/api";
import Modal from "../components/Modal";
import { validateImage, OFFER_BANNER } from "../lib/imageValidation";
import DeleteModalActions from "../components/DeleteModalActions";
import ImageUploadTrigger from "../components/ImageUploadTrigger";

type CouponSummary = {
  id: string;
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
};

type GeneralPromotion = {
  id: string;
  title: string;
  imageUrl: string;
  couponId: string;
  coupon: CouponSummary;
  active: boolean;
};

type PromotionForm = {
  title: string;
  imageUrl: string;
  couponId: string;
  active: boolean;
};

const EMPTY_FORM: PromotionForm = {
  title: "",
  imageUrl: "",
  couponId: "",
  active: true,
};

function formatDiscount(c: CouponSummary) {
  return c.type === "PERCENTAGE" ? `${c.value}%` : `$ ${c.value}`;
}

export default function Offers() {
  const queryClient = useQueryClient();

  const [modal, setModal] = useState<"add" | "edit" | "delete" | null>(null);
  const [editing, setEditing] = useState<GeneralPromotion | null>(null);
  const [form, setForm] = useState<PromotionForm>(EMPTY_FORM);
  const [formErr, setFormErr] = useState("");

  const [uploadingImg, setUploadingImg] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const {
    data: promotions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["general-promotions"],
    queryFn: () => api.get<GeneralPromotion[]>("/offers/all"),
  });

  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => api.get<CouponSummary[]>("/coupons"),
  });

  const saveMutation = useMutation({
    mutationFn: (data: {
      mode: "add" | "edit";
      id?: string;
      body: PromotionForm;
    }) =>
      data.mode === "add"
        ? api.post("/offers", data.body)
        : api.put(`/offers/${data.id}`, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["general-promotions"] });
      setModal(null);
    },
    onError: (err: Error) => setFormErr(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/offers/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["general-promotions"] });
      setModal(null);
    },
    onError: (err: Error) => setFormErr(err.message),
  });

  const toggleMutation = useMutation({
    mutationFn: (promo: GeneralPromotion) =>
      api.put(`/offers/${promo.id}`, {
        title: promo.title,
        imageUrl: promo.imageUrl,
        couponId: promo.couponId,
        active: !promo.active,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["general-promotions"] }),
  });

  function openAdd() {
    setForm(EMPTY_FORM);
    setFormErr("");
    setModal("add");
  }

  function openEdit(p: GeneralPromotion) {
    setEditing(p);
    setForm({
      title: p.title,
      imageUrl: p.imageUrl,
      couponId: p.couponId,
      active: p.active,
    });
    setFormErr("");
    setModal("edit");
  }

  function openDelete(p: GeneralPromotion) {
    setEditing(p);
    setFormErr("");
    setModal("delete");
  }

  function f(key: keyof PromotionForm, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function uploadImage(file: File) {
    const error = await validateImage(file, OFFER_BANNER);
    if (error) {
      setFormErr(error);
      return;
    }

    const fd = new FormData();
    fd.append("image", file);
    setUploadingImg(true);
    try {
      const res = await api.upload<{ url: string }>(
        "/admin/upload/image?type=offer",
        fd,
      );
      f("imageUrl", res.url);
    } catch (err) {
      setFormErr(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setUploadingImg(false);
    }
  }

  function save() {
    setFormErr("");
    if (!form.couponId) {
      setFormErr("Select a coupon for this promotion");
      return;
    }
    saveMutation.mutate({
      mode: modal === "add" ? "add" : "edit",
      id: editing?.id,
      body: form,
    });
  }

  const inputCls =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition";

  const promotionsContent =
    promotions.length === 0 ? (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <p className="text-sm text-gray-400">
          No general promotions yet. Add one to get started.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {promotions.map((p) => (
          <div
            key={p.id}
            className={`bg-white rounded-xl border overflow-hidden ${p.active ? "border-gray-100" : "border-gray-100 opacity-60"}`}
          >
            {p.imageUrl ? (
              <img
                src={p.imageUrl}
                alt={p.title}
                className="w-full h-36 object-cover"
              />
            ) : (
              <div className="w-full h-36 bg-gray-100 flex items-center justify-center">
                <ImagePlus size={28} className="text-gray-300" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-semibold text-gray-900 text-sm leading-snug">
                  {p.title}
                </p>
                <span
                  className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${p.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                >
                  {p.active ? "Active" : "Hidden"}
                </span>
              </div>
              {p.coupon && (
                <p className="text-xs text-primary/70 font-mono truncate mt-1">
                  {p.coupon.code} · {formatDiscount(p.coupon)} off
                </p>
              )}
              <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-50">
                <button
                  onClick={() => toggleMutation.mutate(p)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors px-2 py-1 rounded-lg hover:bg-gray-50"
                  title={p.active ? "Hide" : "Show"}
                >
                  {p.active ? <EyeOff size={13} /> : <Eye size={13} />}
                  {p.active ? "Hide" : "Show"}
                </button>
                <button
                  onClick={() => openEdit(p)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary/5"
                >
                  <Pencil size={13} /> Edit
                </button>
                <button
                  onClick={() => openDelete(p)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50 ml-auto"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          General Promotions
        </h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 text-xs bg-primary text-white rounded-lg px-3 py-2 hover:bg-primary-dark transition-colors"
        >
          <Plus size={13} /> Add Promotion
        </button>
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error.message}</p>}

      {isLoading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : (
        promotionsContent
      )}

      {/* Add / Edit Modal */}
      {(modal === "add" || modal === "edit") && (
        <Modal
          title={
            modal === "add" ? "Add General Promotion" : "Edit General Promotion"
          }
          onClose={() => setModal(null)}
        >
          <div className="space-y-3">
            {formErr && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {formErr}
              </p>
            )}

            {/* Image */}
            <div>
              <label
                htmlFor="promoImageUrl"
                className="block text-xs font-medium text-gray-600 mb-1.5"
              >
                Banner Image
              </label>
              <div className="flex items-center gap-3 mb-2">
                {form.imageUrl ? (
                  <img
                    src={form.imageUrl}
                    alt="preview"
                    className="w-24 h-14 object-cover rounded-lg border border-gray-200 shrink-0"
                  />
                ) : (
                  <div className="w-24 h-14 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    <ImagePlus size={18} className="text-gray-300" />
                  </div>
                )}
                <div>
                  <ImageUploadTrigger
                    inputRef={imageRef}
                    uploading={uploadingImg}
                    onFileSelect={uploadImage}
                    helpText="1200×300 px · landscape"
                  />
                </div>
              </div>
              <input
                id="promoImageUrl"
                type="text"
                value={form.imageUrl}
                onChange={(e) => f("imageUrl", e.target.value)}
                placeholder="https://res.cloudinary.com/…"
                className={inputCls}
              />
            </div>

            <div>
              <label
                htmlFor="promoTitle"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Title *
              </label>
              <input
                id="promoTitle"
                className={inputCls}
                required
                value={form.title}
                onChange={(e) => f("title", e.target.value)}
                placeholder="e.g. Summer Sale"
              />
            </div>

            <div>
              <label
                htmlFor="promoCoupon"
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Coupon *
              </label>
              <select
                id="promoCoupon"
                className={inputCls}
                value={form.couponId}
                onChange={(e) => f("couponId", e.target.value)}
              >
                <option value="">Select a coupon…</option>
                {coupons.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} — {formatDiscount(c)} off
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">
                Clicking the banner copies this coupon's code for the customer.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="promoActive"
                checked={form.active}
                onChange={(e) => f("active", e.target.checked)}
                className="w-4 h-4 accent-primary"
              />
              <label htmlFor="promoActive" className="text-sm text-gray-700">
                Active (visible on homepage)
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
                {saveMutation.isPending ? "Saving…" : "Save Promotion"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation */}
      {modal === "delete" && editing && (
        <Modal title="Delete General Promotion" onClose={() => setModal(null)}>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete{" "}
            <strong className="text-gray-900">"{editing.title}"</strong>? This
            cannot be undone.
          </p>
          <DeleteModalActions
            formErr={formErr}
            isPending={deleteMutation.isPending}
            onCancel={() => setModal(null)}
            onDelete={() => deleteMutation.mutate(editing.id)}
          />
        </Modal>
      )}
    </div>
  );
}
