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

const SUBURB_PATTERN = /^[A-Za-z][A-Za-z' -]{1,49}$/;

const VALID_STATES = [
  "New South Wales",
  "Victoria",
  "Queensland",
  "Western Australia",
  "South Australia",
  "Tasmania",
  "Australian Capital Territory",
  "Northern Territory",
];

const VALID_STATE_CODES = [
  "NSW",
  "VIC",
  "QLD",
  "WA",
  "SA",
  "TAS",
  "ACT",
  "NT",
];

const ADDRESS_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9\s,./#-]{10,100}$/;

const COUPONS = {
  SIPSAVE10: 10,
  SIPSAVE15: 15,
  SIPNOW25: 25,
};

/*
 * ============================================================
 * CHECKOUT PAGE
 * ============================================================
 */

export default function Checkout({ cartItems, user, onOrderComplete }) {
  /*
   * ==========================================================
   * FULFILMENT
   * ==========================================================
   */

  const [fulfilment, setFulfilment] = useState("delivery");

  /*
   * ==========================================================
   * COUPON / GIFT CARD
   * ==========================================================
   */

  const [couponCode, setCouponCode] = useState("");
  const [giftCardCode, setGiftCardCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  /*
   * Message displayed after applying
   * coupon or gift card.
   */
  const [codeNotice, setCodeNotice] = useState("");

  /*
   * ==========================================================
   * CHECKOUT FORM VALUES
   * ==========================================================
   */

  const [values, setValues] = useState({
  name: user?.name ?? "",
  phone: user?.mobile ?? "",
  address: "",
  city: "",
  state: "",
  postcode: "",
});

  /*
   * ==========================================================
   * VALIDATION ERRORS
   * ==========================================================
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
   * Calculate coupon discount.
   */
  const discount = (subtotal * couponDiscount) / 100;

  /*
   * Calculate final order total.
   */
  const total = subtotal - discount;

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
     * Exactly 9 digits.
     */

    if (!/^[6-9]\d{8}$/.test(values.phone.replace(/\s/g, ""))) {
      nextErrors.phone = "Enter a valid 9-digit phone number.";
    }

    /*
     * --------------------------------------------------------
     * DELIVERY ADDRESS
     * --------------------------------------------------------
     *
     * Address is only required for delivery.
     */

    const address = values.address.trim();

if (fulfilment === "delivery") {
  if (!address) {
    nextErrors.address = "Enter your delivery address.";
  } else if (address.length < 10) {
    nextErrors.address =
      "Enter a complete Australian delivery address.";
  } else if (address.length > 100) {
    nextErrors.address =
      "Address must be 100 characters or less.";
  } else if (!/\d/.test(address)) {
    nextErrors.address =
      "Enter a valid Australian address including a street number.";
  } else if (!/[A-Za-z]/.test(address)) {
    nextErrors.address =
      "Enter a valid Australian street address.";
  } else if (!/^[A-Za-z0-9\s,.'/#-]+$/.test(address)) {
    nextErrors.address =
      "Address contains invalid characters.";
  }
}

    /*
     * --------------------------------------------------------
     * CITY
     * --------------------------------------------------------
     */

    const enteredSuburb = values.city.trim();

    if (fulfilment === "delivery" && !SUBURB_PATTERN.test(enteredSuburb)) {
      nextErrors.city =
        "Enter a valid suburb using letters, spaces, hyphens or apostrophes.";
    }

    const enteredPostcode = values.postcode.trim();

    if (fulfilment === "delivery" && !/^\d{4}$/.test(enteredPostcode)) {
      nextErrors.postcode = "Enter a valid 4-digit Australian postcode.";
    }

    if (
      fulfilment === "delivery" &&
      !VALID_STATES.some(
        (state) =>
          state.toLowerCase() === values.state.trim().toLowerCase()
      )
    ) {
      nextErrors.state =
        "Select a valid Australian state or territory.";
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
      couponDiscount,
      discount,
      fulfilment,
      giftCardCode: giftCardCode.trim(),
      subtotal,
      total,
      placedAt: new Date().toISOString(),
    };

    /*
     * ========================================================
     * READ PREVIOUS ORDERS
     * ========================================================
     */

    const previousOrders = JSON.parse(
      window.localStorage.getItem("sipnow-orders") || "[]"
    );

    /*
     * ========================================================
     * SAVE ORDER HISTORY
     * ========================================================
     */

    window.localStorage.setItem(
      "sipnow-orders",
      JSON.stringify([order, ...previousOrders])
    );

    /*
     * Save most recent order.
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

    let cleanedValue = value;

    if (name === "name") {
      cleanedValue = value.replace(/[^A-Za-z ]/g, "");
    }

    if (name === "phone") {
      cleanedValue = value.replace(/\D/g, "").slice(0, 9);
    }

    if (name === "city") {
      cleanedValue = value.replace(/[^A-Za-z' -]/g, "");
    }

    if (name === "postcode") {
      cleanedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    /*
     * Address:
     * Keep normal address characters.
     */

    setValues((current) => ({
      ...current,
      [name]: cleanedValue,
    }));

    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  };

  /*
   * ==========================================================
   * APPLY COUPON
   * ==========================================================
   */

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    /*
     * Empty coupon.
     */
    if (!code) {
      setCodeNotice("Please enter a coupon code.");
      setCouponDiscount(0);
      return;
    }

    /*
     * Coupon format validation.
     */
    if (!/^[A-Z0-9-]{3,20}$/.test(code)) {
      setCodeNotice("Enter a valid coupon code.");
      setCouponDiscount(0);
      return;
    }

    /*
     * Check whether the coupon exists.
     */
    if (!COUPONS[code]) {
      setCodeNotice("Invalid or expired coupon code.");
      setCouponDiscount(0);
      return;
    }

    /*
     * Apply coupon.
     */
    setCouponCode(code);
    setCouponDiscount(COUPONS[code]);
    setCodeNotice(`Coupon ${code} applied successfully.`);
  };

  /*
   * ==========================================================
   * APPLY GIFT CARD
   * ==========================================================
   */

  const applyGiftCard = () => {
    const code = giftCardCode.trim();

    /*
     * Empty gift card.
     */
    if (!code) {
      setCodeNotice("Enter a gift card code first.");
      return;
    }

    /*
     * For now, save the gift card code to the order.
     */
    setCodeNotice("Gift card saved for this order.");
  };

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

          {/* ====================================================
              CART ITEMS
              ==================================================== */}

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
                  {formatCurrency(
                    parsePrice(product.price) * quantity
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* ====================================================
              COUPON AND GIFT CARD
              ==================================================== */}

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
                onClick={applyCoupon}
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
                onClick={applyGiftCard}
                type="button"
              >
                Apply
              </button>
            </div>

            {codeNotice && (
              <p className="text-xs text-primary">{codeNotice}</p>
            )}
          </div>

          {/* ====================================================
              CONTACT DETAILS
              ==================================================== */}

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
                  <span className="text-xs text-error">
                    {errors.name}
                  </span>
                )}
              </label>

              {/* Mobile */}
              <label>
                <span className="mb-2 block text-sm">
                  Mobile number
                </span>

                <input
                  className={inputClass("phone")}
                  name="phone"
                  onChange={update}
                  value={values.phone}
                  inputMode="numeric"
                  maxLength={9}
                />

                {errors.phone && (
                  <span className="text-xs text-error">
                    {errors.phone}
                  </span>
                )}
              </label>
            </div>

            {/* ====================================================
                DELIVERY-ONLY FIELDS
                ==================================================== */}

            {fulfilment === "delivery" && (
              <div className="mt-4 space-y-4">
                {/* Address */}
                <label>
                  <span className="mb-2 block text-sm">
                    Delivery address
                  </span>

                  <input
                    className={inputClass("address")}
                    name="address"
                    onChange={update}
                    value={values.address}
                    placeholder="123 George Street, Sydney"
                  />

                  {errors.address && (
                    <span className="text-xs text-error">
                      {errors.address}
                    </span>
                  )}
                </label>

                <div className="grid gap-4 sm:grid-cols-3">
                  {/* Suburb */}
                  <label>
                    <span className="mb-2 block text-sm">Suburb</span>

                    <input
                      className={inputClass("city")}
                      name="city"
                      onChange={update}
                      value={values.city}
                      placeholder="Sydney"
                      autoComplete="address-level2"
                    />

                    {errors.city && (
                      <span className="text-xs text-error">
                        {errors.city}
                      </span>
                    )}
                  </label>

                  {/* State */}
                  <label>
                    <span className="mb-2 block text-sm">State / Territory</span>

                    <select
                      className={inputClass("state")}
                      name="state"
                      onChange={update}
                      value={values.state}
                    >
                      <option value="">Select state</option>
                      {VALID_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>

                    {errors.state && (
                      <span className="text-xs text-error">
                        {errors.state}
                      </span>
                    )}
                  </label>

                  {/* Postcode */}
                  <label>
                    <span className="mb-2 block text-sm">Postcode</span>

                    <input
                      className={inputClass("postcode")}
                      name="postcode"
                      onChange={update}
                      value={values.postcode}
                      placeholder="2000"
                      inputMode="numeric"
                      maxLength={4}
                      autoComplete="postal-code"
                    />

                    {errors.postcode && (
                      <span className="text-xs text-error">
                        {errors.postcode}
                      </span>
                    )}
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* ====================================================
              PLACE ORDER
              ==================================================== */}

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

          {/* Fulfilment */}
          <div className="mt-5 space-y-3">
            {[
              ["delivery", "local_shipping", "Delivery", "Paid by card"],
              [
                "pickup",
                "storefront",
                "Pickup",
                "Pay cash or card in store",
              ],
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

          {/* ====================================================
              ORDER TOTALS
              ==================================================== */}

          <div className="mt-6 space-y-3 border-t border-primary/10 pt-5 text-sm">
            {/* Subtotal */}
            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal</span>

              <span>{formatCurrency(subtotal)}</span>
            </div>

            {/* Discount */}
            {couponDiscount > 0 && (
              <div className="flex justify-between text-on-surface-variant">
                <span>Discount ({couponDiscount}%)</span>

                <span>-{formatCurrency(discount)}</span>
              </div>
            )}

            {/* Delivery */}
            <div className="flex justify-between text-on-surface-variant">
              <span>Delivery</span>

              <span>
                {fulfilment === "delivery"
                  ? "To be confirmed"
                  : "Free"}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between border-t border-primary/10 pt-3 font-headline-md text-lg">
              <span>Total</span>

              <span className="text-primary">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </aside>
      </Reveal>
    </div>
  );
}