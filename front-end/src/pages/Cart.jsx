import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import { formatCurrency, parsePrice } from "../utils/productHelpers.js";

// Renders one larger, more readable product row inside the cart.
function CartRow({ item, onRemove, onUpdateQuantity }) {
  const { product, quantity } = item;
  const lineTotal = parsePrice(product.price) * quantity;
  const productDescription =
    product.description ||
    product.brand ||
    `${product.category || "Product"} · ${quantity === 1 ? "1 item" : `${quantity} items`}`;

  return (
    <article className="grid gap-5 border-b border-primary/10 py-6 last:border-0 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:items-center">
      <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-surface-container-high sm:h-28 sm:w-28">
        <img
          alt={product.name}
          className="h-full w-full object-contain p-2"
          src={product.image}
        />
      </div>

      <div className="min-w-0">
        <h2 className="text-lg font-semibold leading-snug sm:text-xl">
          {product.name}
        </h2>

        <p className="mt-2 text-sm leading-6 text-on-surface-variant sm:text-base">
          {productDescription}
        </p>

        {product.category && (
          <p className="mt-1 text-xs uppercase tracking-wider text-on-surface-variant/80">
            {product.category}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center rounded-lg border border-outline-variant/30 bg-surface-container-high">
            <button
              aria-label={`Decrease ${product.name} quantity`}
              className="material-symbols-outlined px-3 py-2 text-[18px] text-on-surface-variant hover:text-primary"
              onClick={() => onUpdateQuantity(product.name, quantity - 1)}
              type="button"
            >
              remove
            </button>

            <span className="min-w-10 px-2 text-center text-sm font-medium">
              {quantity}
            </span>

            <button
              aria-label={`Increase ${product.name} quantity`}
              className="material-symbols-outlined px-3 py-2 text-[18px] text-on-surface-variant hover:text-primary"
              onClick={() => onUpdateQuantity(product.name, quantity + 1)}
              type="button"
            >
              add
            </button>
          </div>

          <button
            className="text-sm text-on-surface-variant underline-offset-4 hover:text-primary hover:underline"
            onClick={() => onRemove(product.name)}
            type="button"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="sm:text-right">
        <p className="text-xs uppercase tracking-wider text-on-surface-variant">
          Item total
        </p>
        <p className="mt-1 font-headline-md text-xl text-primary sm:text-2xl">
          {formatCurrency(lineTotal)}
        </p>
        <p className="mt-1 text-sm text-on-surface-variant">
          {formatCurrency(parsePrice(product.price))} each
        </p>
      </div>
    </article>
  );
}

export default function Cart({
  cartItems,
  isLoggedIn,
  onCheckout,
  onRemove,
  onRequireSignUp,
  onShopAll,
  onUpdateQuantity,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.product.price) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (isLoggedIn) onCheckout();
    else onRequireSignUp();
  };

  return (
    <div className="pt-32 pb-24">
      <Reveal className="mx-auto max-w-6xl px-margin-mobile md:px-margin-desktop">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-7 flex items-center gap-2 text-sm text-on-surface-variant transition-colors hover:text-primary"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to home
        </button>

        {cartItems.length === 0 ? (
          <div className="glass-panel rounded-2xl px-6 py-20 text-center sm:px-10">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant">
              shopping_bag
            </span>
            <h1 className="mt-5 font-headline-md text-2xl uppercase tracking-[0.12em]">
              Your cart is empty
            </h1>
            <p className="mx-auto mt-3 max-w-md text-on-surface-variant">
              Your cart is empty. Time to fill it with something good.
            </p>
            <button
              className="mt-7 rounded-lg px-8 py-3 text-sm uppercase tracking-widest text-white primary-gradient"
              onClick={onShopAll}
              type="button"
            >
              Shop All Products
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem]">
            {/* Cart products */}
            <section className="glass-panel rounded-2xl p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-primary/10 pb-5">
                <div>
                  <h1 className="font-headline-md text-2xl uppercase tracking-[0.12em] sm:text-3xl">
                    Your cart
                  </h1>
                  <p className="mt-2 text-sm text-on-surface-variant">
                    {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
                  </p>
                </div>

                <span className="text-sm text-on-surface-variant">
                  Review your items before checkout
                </span>
              </div>

              <div>
                {cartItems.map((item) => (
                  <CartRow
                    item={item}
                    key={item.product.name}
                    onRemove={onRemove}
                    onUpdateQuantity={onUpdateQuantity}
                  />
                ))}
              </div>
            </section>

            {/* Cart summary */}
            <aside className="glass-panel h-fit rounded-2xl p-6 sm:p-7 lg:sticky lg:top-28">
              <h2 className="font-headline-md text-xl uppercase tracking-[0.12em] sm:text-2xl">
                Cart summary
              </h2>

              <div className="mt-6 space-y-4 border-t border-primary/10 pt-5">
                <div className="flex justify-between gap-4 text-sm text-on-surface-variant">
                  <span>Items ({totalItems})</span>
                  <span>{formatCurrency(total)}</span>
                </div>

                <div className="flex justify-between gap-4 text-sm text-on-surface-variant">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="flex justify-between gap-4 border-t border-primary/10 pt-5">
                  <span className="font-headline-md text-lg">Total</span>
                  <span className="font-headline-md text-2xl text-primary">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <button
                className="mt-7 w-full rounded-lg py-4 text-sm uppercase tracking-widest text-white shadow-lg primary-gradient"
                onClick={handleCheckout}
                type="button"
              >
                Proceed to checkout
              </button>

              <button
                className="mt-4 w-full text-sm text-on-surface-variant hover:text-primary"
                onClick={onShopAll}
                type="button"
              >
                Continue shopping
              </button>
            </aside>
          </div>
        )}
      </Reveal>
    </div>
  );
}
