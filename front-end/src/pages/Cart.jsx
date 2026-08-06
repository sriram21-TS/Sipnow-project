import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import { formatCurrency, parsePrice } from "../data/products.js";

function CartRow({ item, onUpdateQuantity, onRemove }) {
  const { product, quantity } = item;
  const unitPrice = parsePrice(product.price);

  return (
    <div className="flex gap-4 sm:gap-6 glass-panel rounded-xl p-4 sm:p-5 items-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-surface-container-high">
        <img
          alt={product.name}
          className="w-full h-full object-contain"
          src={product.image}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-on-surface-variant uppercase tracking-[0.2em] text-[11px]">
          {product.category}
        </p>
        <h3 className="font-headline-md text-base sm:text-lg truncate pr-2">
          {product.name}
        </h3>
        <p className="text-primary font-headline-md text-sm mt-1">
          {formatCurrency(unitPrice)}{" "}
          <span className="text-on-surface-variant font-normal">each</span>
        </p>
      </div>

      <div className="flex flex-col items-end gap-3 shrink-0">
        <button
          aria-label={`Remove ${product.name} from cart`}
          className="material-symbols-outlined text-[18px] text-on-surface-variant hover:text-primary transition-colors"
          onClick={() => onRemove(product.name)}
          type="button"
        >
          delete
        </button>

        <div className="flex items-center gap-2.5">
          <button
            aria-label={`Decrease ${product.name} quantity`}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-outline-variant/40 text-on-surface hover:border-primary hover:text-primary transition-colors"
            onClick={() => onUpdateQuantity(product.name, quantity - 1)}
            type="button"
          >
            <span className="material-symbols-outlined text-[14px]">
              remove
            </span>
          </button>
          <span className="w-6 text-center text-sm font-medium text-on-surface">
            {quantity}
          </span>
          <button
            aria-label={`Increase ${product.name} quantity`}
            className="flex h-7 w-7 items-center justify-center rounded-full primary-gradient text-white transition-transform hover:scale-110"
            onClick={() => onUpdateQuantity(product.name, quantity + 1)}
            type="button"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
          </button>
        </div>

        <p className="font-headline-md text-primary text-sm">
          {formatCurrency(unitPrice * quantity)}
        </p>
      </div>
    </div>
  );
}

export default function Cart({
  cartItems,
  onUpdateQuantity,
  onRemove,
  onBack,
  onShopAll,
}) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.product.price) * item.quantity,
    0
  );
  const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="pt-32 pb-24">
      <PageHero
        description="Review your selections before checkout."
        onBack={onBack}
        tag="Your Cart"
        title="Shopping Cart"
      />

      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {cartItems.length === 0 ? (
          <div className="text-center py-16 space-y-6">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant">
              shopping_bag
            </span>
            <p className="text-on-surface-variant">
              Your cart is empty. Time to fill it with something good.
            </p>
            <button
              className="inline-block px-6 py-3 rounded-lg primary-gradient text-white text-sm uppercase tracking-widest"
              onClick={onShopAll}
              type="button"
            >
              Shop All Products
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            <div className="flex-1 min-w-0 space-y-4">
              {cartItems.map((item) => (
                <CartRow
                  item={item}
                  key={item.product.name}
                  onRemove={onRemove}
                  onUpdateQuantity={onUpdateQuantity}
                />
              ))}
            </div>

            <aside className="lg:w-80 shrink-0">
              <div className="lg:sticky lg:top-32 glass-panel rounded-xl p-6 space-y-5">
                <h3 className="font-headline-md text-lg">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Items ({totalUnits})</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                </div>
                <div className="border-t border-primary/10 pt-4 flex justify-between items-baseline">
                  <span className="text-on-surface-variant text-sm">
                    Subtotal
                  </span>
                  <span className="font-headline-md text-xl text-primary">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <button
                  className="w-full rounded-lg primary-gradient py-3 text-sm uppercase tracking-widest text-white shadow-lg"
                  type="button"
                >
                  Proceed to Checkout
                </button>
                <button
                  className="w-full text-center text-sm text-on-surface-variant hover:text-primary transition-colors"
                  onClick={onShopAll}
                  type="button"
                >
                  Continue Shopping
                </button>
              </div>
            </aside>
          </div>
        )}
      </Reveal>
    </div>
  );
}
