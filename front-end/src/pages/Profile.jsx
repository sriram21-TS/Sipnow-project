import { useState } from "react";
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
 * Email:
 * - Valid basic email structure
 * - Allows commonly used domain extensions
 */
const EMAIL_PATTERN =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|in|org|net|edu|gov)$/i;

/*
 * ============================================================
 * READ ORDERS FROM LOCAL STORAGE
 * ============================================================
 */

function readOrders() {
  try {
    /*
     * First try to get all stored orders.
     */
    const orders = JSON.parse(window.localStorage.getItem("sipnow-orders"));

    if (orders?.length) return orders;

    /*
     * If there are no orders in the main list,
     * check whether a last order exists.
     */
    const lastOrder = JSON.parse(
      window.localStorage.getItem("sipnow-last-order")
    );

    return lastOrder ? [lastOrder] : [];
  } catch {
    /*
     * If localStorage contains invalid JSON,
     * return an empty list instead of crashing.
     */
    return [];
  }
}

/*
 * ============================================================
 * ORDER CARD
 * ============================================================
 */

function OrderCard({ order }) {
  return (
    <article className="rounded-xl border border-primary/20 bg-primary/5 p-5">
      <p className="font-medium text-primary">Order placed successfully</p>

      <p className="mt-2 text-sm text-on-surface-variant">
        {new Date(order.placedAt).toLocaleString()} ·{" "}
        {order.fulfilment === "delivery" ? "Delivery" : "Pickup"}
      </p>

      {/* Products in this order */}
      <div className="mt-4 space-y-2 border-t border-primary/10 pt-4">
        {order.cartItems.map((item) => (
          <div
            className="flex justify-between gap-4 text-sm"
            key={item.product.name}
          >
            <span>
              {item.product.name} × {item.quantity}
            </span>

            <span>
              {formatCurrency(parsePrice(item.product.price) * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Order total */}
      <div className="mt-4 flex justify-between border-t border-primary/10 pt-4 font-headline-md">
        <span>Total</span>

        <span className="text-primary">{formatCurrency(order.subtotal)}</span>
      </div>
    </article>
  );
}

/*
 * ============================================================
 * PROFILE PAGE
 * ============================================================
 */

export default function Profile({ onLogout, onSave, onShopAll, user }) {
  /*
   * Controls whether profile fields are editable.
   */
  const [editing, setEditing] = useState(false);

  /*
   * Profile form values.
   */
  const [values, setValues] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    mobile: user?.mobile ?? "",
  });

  /*
   * General validation error message.
   */
  const [error, setError] = useState("");

  /*
   * Read order history.
   */
  const orders = readOrders();

  /*
   * ==========================================================
   * HANDLE PROFILE INPUT
   * ==========================================================
   */

  const update = (event) => {
    const { name, value } = event.target;

    /*
     * Name field:
     *
     * Immediately remove:
     * - numbers
     * - @
     * - -
     * - punctuation
     * - other special characters
     *
     * Only letters and spaces remain.
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
   * SAVE PROFILE
   * ==========================================================
   */

  const save = (event) => {
    /*
     * Prevent browser refresh.
     */
    event.preventDefault();

    /*
     * Create validation errors.
     */
    const nextErrors = [];

    /*
     * --------------------------------------------------------
     * NAME
     * --------------------------------------------------------
     */

    if (!NAME_PATTERN.test(values.name.trim())) {
      nextErrors.push("Name can contain letters and spaces only.");
    }

    /*
     * --------------------------------------------------------
     * EMAIL
     * --------------------------------------------------------
     */

    if (!EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.push("Enter a valid email address.");
    }

    /*
     * --------------------------------------------------------
     * MOBILE
     * --------------------------------------------------------
     */

    if (!/^[6-9]\d{9}$/.test(values.mobile.replace(/\s/g, ""))) {
      nextErrors.push("Enter a valid 10-digit mobile number.");
    }

    /*
     * If any validation error exists:
     * - Show the first error
     * - Stop the save operation
     */
    if (nextErrors.length) {
      setError(nextErrors[0]);
      return;
    }

    /*
     * ========================================================
     * SAVE VALID PROFILE
     * ========================================================
     */

    onSave({
      ...values,

      /*
       * Remove unnecessary spaces from name.
       */
      name: values.name.trim(),

      /*
       * Store email in lowercase.
       */
      email: values.email.trim().toLowerCase(),

      /*
       * Remove spaces from mobile number.
       */
      mobile: values.mobile.replace(/\s/g, ""),
    });

    /*
     * Clear errors.
     */
    setError("");

    /*
     * Exit editing mode.
     */
    setEditing(false);
  };

  /*
   * ==========================================================
   * UI
   * ==========================================================
   */

  return (
    <div className="pt-32 pb-24">
      <main className="mx-auto max-w-3xl px-margin-mobile md:px-margin-desktop">
        {/* ====================================================
            PROFILE INFORMATION
            ==================================================== */}

        <section className="glass-panel rounded-2xl p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                My account
              </p>

              <h1 className="mt-3 font-headline-md text-4xl">
                Welcome, {user?.name}
              </h1>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                className="rounded-lg border border-primary/30 px-4 py-2 text-sm hover:border-primary"
                onClick={() => setEditing((value) => !value)}
                type="button"
              >
                {editing ? "Cancel" : "Edit profile"}
              </button>

              <button
                className="rounded-lg px-4 py-2 text-sm text-white primary-gradient"
                onClick={onLogout}
                type="button"
              >
                Logout
              </button>
            </div>
          </div>

          {/* ==================================================
              EDIT PROFILE FORM
              ================================================== */}

          {editing ? (
            <form
              className="mt-8 grid gap-4 border-t border-primary/10 pt-6 sm:grid-cols-3"
              noValidate
              onSubmit={save}
            >
              {[
                ["name", "Name"],
                ["email", "Email", "email"],
                ["mobile", "Mobile"],
              ].map(([name, label, type]) => (
                <label key={name}>
                  <span className="mb-2 block text-xs uppercase tracking-wider text-on-surface-variant">
                    {label}
                  </span>

                  <input
                    className={`w-full rounded-lg border bg-surface-container-high px-3 py-2 text-sm focus:border-primary focus:ring-0 ${
                      error ? "border-error" : "border-outline-variant/30"
                    }`}
                    name={name}
                    onChange={update}
                    type={type || "text"}
                    value={values[name]}
                  />
                </label>
              ))}

              {/* Error + Save button */}
              <div className="sm:col-span-3">
                {error && <p className="mb-3 text-sm text-error">{error}</p>}

                <button
                  className="rounded-lg px-5 py-2 text-sm text-white primary-gradient"
                  type="submit"
                >
                  Save changes
                </button>
              </div>
            </form>
          ) : (
            /*
             * ==================================================
             * PROFILE DISPLAY
             * ==================================================
             */

            <div className="mt-8 grid gap-4 border-t border-primary/10 pt-6 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-on-surface-variant">
                  Name
                </p>

                <p className="mt-1">{user?.name}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-on-surface-variant">
                  Email
                </p>

                <p className="mt-1 break-words">{user?.email}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-on-surface-variant">
                  Mobile
                </p>

                <p className="mt-1">{user?.mobile || "Not added"}</p>
              </div>
            </div>
          )}
        </section>

        {/* ====================================================
            ORDER HISTORY
            ==================================================== */}

        <section className="glass-panel mt-6 rounded-2xl p-6 sm:p-8">
          <h2 className="font-headline-md text-2xl">Order history</h2>

          {orders.length ? (
            <div className="mt-5 space-y-4">
              {orders.map((order, index) => (
                <OrderCard key={`${order.placedAt}-${index}`} order={order} />
              ))}
            </div>
          ) : (
            <div className="mt-5 text-sm text-on-surface-variant">
              <p>You have not placed an order yet.</p>

              <button
                className="mt-4 rounded-lg px-5 py-2 text-sm text-white primary-gradient"
                onClick={onShopAll}
                type="button"
              >
                Start shopping
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
