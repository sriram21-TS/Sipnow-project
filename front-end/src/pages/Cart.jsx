import Reveal from "../components/Reveal.jsx";
import { formatCurrency, parsePrice } from "../utils/productHelpers.js";

// Renders one product row inside the cart.
function CartRow({ item, onRemove, onUpdateQuantity }) {
  const { product, quantity } = item;

  return (
    <article className="flex items-center gap-4 border-b border-primary/10 py-4 last:border-0">
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-surface-container-high">
        <img
          alt={product.name}
          className="h-full w-full object-contain"
          src={product.image}
        />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-base font-medium">{product.name}</h2>
        <p className="mt-1 text-xs text-on-surface-variant">
          {product.category} · {quantity}{" "}
          {quantity === 1 ? "individual" : "items"}
        </p>
        <div className="mt-2 flex items-center gap-3 text-xs">
          <button
            aria-label={`Decrease ${product.name} quantity`}
            className="material-symbols-outlined text-[16px] text-on-surface-variant hover:text-primary"
            onClick={() => onUpdateQuantity(product.name, quantity - 1)}
            type="button"
          >
            remove_circle_outline
          </button>
          <span>{quantity}</span>
          <button
            aria-label={`Increase ${product.name} quantity`}
            className="material-symbols-outlined text-[16px] text-on-surface-variant hover:text-primary"
            onClick={() => onUpdateQuantity(product.name, quantity + 1)}
            type="button"
          >
            add_circle_outline
          </button>
          <button
            className="text-on-surface-variant hover:text-primary"
            onClick={() => onRemove(product.name)}
            type="button"
          >
            Remove
          </button>
        </div>
      </div>
      <p className="shrink-0 font-headline-md text-primary">
        {formatCurrency(parsePrice(product.price) * quantity)}
      </p>
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
  // Calculate the current cart total from product price × quantity.
  const total = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.product.price) * item.quantity,
    0
  );

  // Checkout requires an authenticated user; App.jsx decides whether
  // to continue to checkout or send the user to signup.
  const handleCheckout = () => {
    if (isLoggedIn) onCheckout();
    else onRequireSignUp();
  };

  return (
    <div className="pt-32 pb-24">
      <Reveal className="mx-auto max-w-3xl px-margin-mobile md:px-margin-desktop">
        {cartItems.length === 0 ? (
          <div className="space-y-6 py-16 text-center">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant">
              shopping_bag
            </span>
            <p className="text-on-surface-variant">
              Your cart is empty. Time to fill it with something good.
            </p>
            <button
              className="rounded-lg px-6 py-3 text-sm uppercase tracking-widest text-white primary-gradient"
              onClick={onShopAll}
              type="button"
            >
              Shop All Products
            </button>
          </div>
        ) : (
          <section className="glass-panel rounded-2xl p-5 sm:p-8">
            <h1 className="font-headline-md text-2xl uppercase tracking-[0.12em]">
              Your cart
            </h1>
            <div className="mt-3">
              {cartItems.map((item) => (
                <CartRow
                  item={item}
                  key={item.product.name}
                  onRemove={onRemove}
                  onUpdateQuantity={onUpdateQuantity}
                />
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-primary/10 pt-5">
              <span className="font-headline-md text-lg">Total</span>
              <span className="font-headline-md text-2xl text-primary">
                {formatCurrency(total)}
              </span>
            </div>
            <button
              className="mt-6 w-full rounded-lg py-3 text-sm uppercase tracking-widest text-white shadow-lg primary-gradient"
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
          </section>
        )}
      </Reveal>
    </div>
  );
}
