import { useState } from "react";
import Reveal from "../components/Reveal.jsx";
import { formatCurrency, parsePrice } from "../utils/productHelpers.js";

/*
 * ============================================================
 * VALIDATION RULES
 * ============================================================
 */

/*
 * Name:
 * - Letters and spaces only
 * - Minimum 2 characters
 * - Maximum 50 characters
 */
const NAME_PATTERN = /^[A-Za-z ]{2,50}$/;

/*
 * ============================================================
 * CHECKOUT PAGE
 * ============================================================
 */

export default function Checkout({ cartItems, user, onOrderComplete }) {
  /*
   * Delivery or pickup.
   */
  const [fulfilment, setFulfilment] = useState("delivery");

  /*
   * Coupon and gift card values.
   */
  const [couponCode, setCouponCode] = useState("");
  const [giftCardCode, setGiftCardCode] = useState("");

  /*
   * Message displayed when coupon/gift card
   * is applied.
   */
  const [codeNotice, setCodeNotice] = useState("");

  /*
   * Checkout form values.
   */
  const [values, setValues] = useState({
    name: user?.name ?? "",
    phone: user?.mobile ?? "",
    address: "",
    city: "",
  });

  /*
   * Validation errors.
   */
  const [errors, setErrors] = useState({});

  /*
   * ==========================================================
   * CALCULATE SUBTOTAL
   * ==========================================================
   */

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.product.price) * item.quantity,
    0
  );

  /*
   * ==========================================================
   * SUBMIT CHECKOUT
   * ==========================================================
   */

  const submit = (event) => {
    /*
     * Prevent normal browser form submission.
     */
    event.preventDefault();

    const nextErrors = {};

    /*
     * --------------------------------------------------------
     * NAME VALIDATION
     * --------------------------------------------------------
     */

    if (!NAME_PATTERN.test(values.name.trim())) {
      nextErrors.name = "Name can contain letters and spaces only.";
    }

    /*
     * --------------------------------------------------------
     * PHONE VALIDATION
     * --------------------------------------------------------
     *
     * Remove spaces before checking the number.
     *
     * Example:
     * 98765 43210
     * becomes:
     * 9876543210
     */

    if (!/^[6-9]\d{9}$/.test(values.phone.replace(/\s/g, ""))) {
      nextErrors.phone = "Enter a valid 10-digit phone number.";
    }

    /*
     * --------------------------------------------------------
     * DELIVERY ADDRESS
     * --------------------------------------------------------
     *
     * Address and city are only required for delivery.
     */

    if (fulfilment === "delivery" && values.address.trim().length < 5) {
      nextErrors.address = "Enter your delivery address.";
    }

    /*
     * --------------------------------------------------------
     * CITY
     * --------------------------------------------------------
     */

    if (fulfilment === "delivery" && values.city.trim().length < 2) {
      nextErrors.city = "Enter your city.";
    }

    /*
     * Store validation errors.
     */
    setErrors(nextErrors);

    /*
     * If there are validation errors,
     * don't place the order.
     */
    if (Object.keys(nextErrors).length) return;

    /*
     * ========================================================
     * CREATE ORDER
     * ========================================================
     */

    const order = {
      cartItems,
      couponCode: couponCode.trim(),
      fulfilment,
      giftCardCode: giftCardCode.trim(),
      subtotal,
      placedAt: new Date().toISOString(),
    };

    /*
     * Read previous orders.
     */
    const previousOrders = JSON.parse(
      window.localStorage.getItem("sipnow-orders") || "[]"
    );

    /*
     * Add the new order to the beginning.
     */
    window.localStorage.setItem(
      "sipnow-orders",
      JSON.stringify([order, ...previousOrders])
    );

    /*
     * Save the most recent order.
     */
    window.localStorage.setItem("sipnow-last-order", JSON.stringify(order));

    /*
     * Notify App.jsx that checkout is complete.
     */
    onOrderComplete();
  };

  /*
   * ==========================================================
   * INPUT STYLING
   * ==========================================================
   */

  const inputClass = (field) =>
    `w-full rounded-xl border bg-surface-container-high px-4 py-3 text-sm focus:ring-0 ${
      errors[field]
        ? "border-error"
        : "border-outline-variant/30 focus:border-primary"
    }`;

  /*
   * ==========================================================
   * UPDATE INPUT VALUES
   * ==========================================================
   */

  const update = (event) => {
    const { name, value } = event.target;

    /*
     * Name field:
     *
     * Immediately remove numbers and special characters.
     */
    const cleanedValue =
      name === "name" ? value.replace(/[^A-Za-z ]/g, "") : value;

    setValues((current) => ({
      ...current,
      [name]: cleanedValue,
    }));
  };

  /*
   * ==========================================================
   * COUPON / GIFT CARD
   * ==========================================================
   *
   * Current implementation only checks whether
   * the user entered something.
   */

  const applyCode = (code, label) =>
    setCodeNotice(
      code.trim()
        ? `${label} saved for this order.`
        : `Enter a ${label.toLowerCase()} first.`
    );

  /*
   * ==========================================================
   * UI
   * ==========================================================
   */

  return (
    <div className="pt-32 pb-24">
      <Reveal className="mx-auto grid max-w-5xl gap-8 px-margin-mobile md:grid-cols-[minmax(0,1fr)_19rem] md:px-margin-desktop">
        <form
          className="glass-panel rounded-2xl p-5 sm:p-8"
          noValidate
          onSubmit={submit}
        >
          <h1 className="font-headline-md text-2xl uppercase tracking-[0.12em]">
            Order summary
          </h1>

          {/* Cart items */}
          <div className="mt-3">
            {cartItems.map(({ product, quantity }) => (
              <div
                className="flex items-center gap-3 border-b border-primary/10 py-3 last:border-0"
                key={product.name}
              >
                <img
                  alt=""
                  className="h-12 w-12 rounded-md bg-surface-container-high object-contain"
                  src={product.image}
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{product.name}</p>

                  <p className="text-xs text-on-surface-variant">
                    {product.category} · {quantity} individual
                  </p>
                </div>

                <p className="font-headline-md text-primary">
                  {formatCurrency(parsePrice(product.price) * quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Coupon and gift card */}
          <div className="mt-5 space-y-3 border-t border-primary/10 pt-5">
            {/* Coupon */}
            <div className="flex gap-2">
              <input
                aria-label="Coupon code"
                className="min-w-0 flex-1 rounded-full border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-sm placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-0"
                onChange={(event) => setCouponCode(event.target.value)}
                placeholder="COUPON CODE"
                value={couponCode}
              />

              <button
                className="rounded-full px-5 text-sm text-white primary-gradient"
                onClick={() => applyCode(couponCode, "Coupon code")}
                type="button"
              >
                Apply
              </button>
            </div>

            {/* Gift card */}
            <div className="flex gap-2">
              <input
                aria-label="Gift card code"
                className="min-w-0 flex-1 rounded-full border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-sm placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-0"
                onChange={(event) => setGiftCardCode(event.target.value)}
                placeholder="GIFT CARD CODE"
                value={giftCardCode}
              />

              <button
                className="rounded-full px-5 text-sm text-white primary-gradient"
                onClick={() => applyCode(giftCardCode, "Gift card code")}
                type="button"
              >
                Apply
              </button>
            </div>

            {codeNotice && <p className="text-xs text-primary">{codeNotice}</p>}
          </div>

          {/* Contact details */}
          <div className="mt-6 border-t border-primary/10 pt-6">
            <h2 className="font-headline-md text-lg uppercase tracking-[0.12em]">
              Contact details
            </h2>

            <p className="mt-2 text-sm text-on-surface-variant">
              Logged in as {user?.email}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {/* Full name */}
              <label>
                <span className="mb-2 block text-sm">Full name</span>

                <input
                  className={inputClass("name")}
                  name="name"
                  onChange={update}
                  value={values.name}
                />

                {errors.name && (
                  <span className="text-xs text-error">{errors.name}</span>
                )}
              </label>

              {/* Mobile */}
              <label>
                <span className="mb-2 block text-sm">Mobile number</span>

                <input
                  className={inputClass("phone")}
                  name="phone"
                  onChange={update}
                  value={values.phone}
                />

                {errors.phone && (
                  <span className="text-xs text-error">{errors.phone}</span>
                )}
              </label>
            </div>

            {/* Delivery-only fields */}
            {fulfilment === "delivery" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {/* Address */}
                <label>
                  <span className="mb-2 block text-sm">Delivery address</span>

                  <input
                    className={inputClass("address")}
                    name="address"
                    onChange={update}
                    value={values.address}
                  />

                  {errors.address && (
                    <span className="text-xs text-error">{errors.address}</span>
                  )}
                </label>

                {/* City */}
                <label>
                  <span className="mb-2 block text-sm">City</span>

                  <input
                    className={inputClass("city")}
                    name="city"
                    onChange={update}
                    value={values.city}
                  />

                  {errors.city && (
                    <span className="text-xs text-error">{errors.city}</span>
                  )}
                </label>
              </div>
            )}
          </div>

          {/* Place order */}
          <button
            className="mt-7 w-full rounded-lg py-3 text-sm uppercase tracking-widest text-white primary-gradient"
            type="submit"
          >
            Place order
          </button>
        </form>

        {/* ====================================================
            FULFILMENT / ORDER TOTAL
            ==================================================== */}

        <aside className="glass-panel h-fit rounded-2xl p-5 sm:p-6">
          <h2 className="font-headline-md text-lg uppercase tracking-[0.12em]">
            How would you like your order?
          </h2>

          <div className="mt-5 space-y-3">
            {[
              ["delivery", "local_shipping", "Delivery", "Paid by card"],
              ["pickup", "storefront", "Pickup", "Pay cash or card in store"],
            ].map(([value, icon, title, text]) => (
              <button
                aria-pressed={fulfilment === value}
                className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left ${
                  fulfilment === value
                    ? "border-primary bg-primary/10"
                    : "border-outline-variant/30"
                }`}
                key={value}
                onClick={() => setFulfilment(value)}
                type="button"
              >
                <span className="material-symbols-outlined text-primary">
                  {icon}
                </span>

                <span>
                  <span className="block font-medium">{title}</span>

                  <span className="block text-xs text-on-surface-variant">
                    {text}
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* Order totals */}
          <div className="mt-6 space-y-3 border-t border-primary/10 pt-5 text-sm">
            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between text-on-surface-variant">
              <span>Delivery</span>

              <span>
                {fulfilment === "delivery" ? "To be confirmed" : "Free"}
              </span>
            </div>

            <div className="flex justify-between border-t border-primary/10 pt-3 font-headline-md text-lg">
              <span>Total</span>

              <span className="text-primary">{formatCurrency(subtotal)}</span>
            </div>
          </div>
        </aside>
      </Reveal>
    </div>
  );
}
