import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WHISKY_CATEGORY_SLUGS = {
  whisky: "Whisky",
  whiskey: "Whisky",
  "other-whisky": "Other Whisky",
  "scotch-whisky": "Scotch Whisky",
  "japanese-whisky": "Japanese Whisky",
  "irish-whisky": "Irish Whisky",
  "american-whisky": "American Whisky",
  "australian-whisky": "Australian Whisky",
  "austrialian-whisky": "Australian Whisky",
};

function Whisky({
  onAddToCart: onAddToCartProp,
  onBack,
  cartItems = [],
  onRemove,
  onUpdateQuantity,
  productsLoading,
}) {
  // ==========================================
  // WHISKY CATEGORIES
  // ==========================================

  const categories = [
    "Whisky",
    "Other Whisky",
    "Scotch Whisky",
    "Japanese Whisky",
    "Irish Whisky",
    "American Whisky",
    "Australian Whisky",
  ];

  // ==========================================
  // WHISKY PRODUCTS
  // ==========================================

  const whiskyProducts = [
    {
      id: 1,
      name: "Premium Scotch Whisky",
      category: "Scotch Whisky",
      price: 3500,
      oldPrice: 4200,
      image: "/images/whisky1.jpg",
      description:
        "A smooth and rich Scotch whisky with a balanced character.",
    },

    {
      id: 2,
      name: "Classic Japanese Whisky",
      category: "Japanese Whisky",
      price: 4500,
      oldPrice: 5200,
      image: "/images/whisky2.jpg",
      description:
        "Elegant Japanese whisky with delicate and refined flavours.",
    },

    {
      id: 3,
      name: "Irish Gold Whisky",
      category: "Irish Whisky",
      price: 3200,
      oldPrice: 3800,
      image: "/images/whisky3.jpg",
      description:
        "Smooth Irish whisky with a light and pleasant finish.",
    },

    {
      id: 4,
      name: "American Bourbon",
      category: "American Whisky",
      price: 4000,
      oldPrice: 4700,
      image: "/images/whisky4.jpg",
      description:
        "Rich American bourbon with warm oak and vanilla notes.",
    },

    {
      id: 5,
      name: "Australian Whisky",
      category: "Australian Whisky",
      price: 3700,
      oldPrice: 4300,
      image: "/images/whisky5.jpg",
      description:
        "Australian whisky with a smooth and distinctive character.",
    },

    {
      id: 6,
      name: "Classic Whisky",
      category: "Other Whisky",
      price: 2800,
      oldPrice: 3300,
      image: "/images/whisky6.jpg",
      description:
        "A classic whisky suitable for both beginners and whisky lovers.",
    },
  ];

  // ==========================================
  // STATES
  // ==========================================

  const { categoryKey } = useParams();

  const defaultCategory =
    (categoryKey && WHISKY_CATEGORY_SLUGS[categoryKey]) || "Whisky";

  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  const [search, setSearch] = useState("");

  useEffect(() => {
    setSelectedCategory(defaultCategory);
  }, [defaultCategory]);

  const [localCart, setLocalCart] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const currentCart = cartItems.length > 0 ? cartItems : localCart;

  const normalizedCart = currentCart.map((item) =>
    item && item.product
      ? { ...item.product, quantity: item.quantity }
      : item
  );

  // ==========================================
  // CATEGORY FILTER
  // ==========================================

  const filteredProducts = whiskyProducts.filter((product) => {
    if (selectedCategory !== "Whisky" && product.category !== selectedCategory) {
      return false;
    }

    if (search.trim() === "") {
      return true;
    }

    return product.name.toLowerCase().includes(search.toLowerCase());
  });

  // ==========================================
  // ADD TO CART
  // ==========================================

  const addToCart = (product) => {
    if (typeof onAddToCartProp === "function") {
      onAddToCartProp(product);
    } else {
      setLocalCart((previousCart) => {
        const existingProduct = previousCart.find(
          (item) => item.id === product.id
        );

        if (existingProduct) {
          return previousCart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          );
        }

        return [
          ...previousCart,
          {
            ...product,
            quantity: 1,
          },
        ];
      });
    }

    alert(`${product.name} added to cart`);
  };

  // ==========================================
  // REMOVE FROM CART
  // ==========================================

  const removeCartItem = (item) => {
    if (typeof onRemove === "function" && item?.product) {
      onRemove(item.product.name);
      return;
    }

    const itemId = item?.id ?? item?.product?.id;
    setLocalCart((previousCart) =>
      previousCart.filter((cartItem) => cartItem.id !== itemId)
    );
  };

  // ==========================================
  // CART TOTAL
  // ==========================================

  const cartTotal = normalizedCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="whisky-page">

      {/* =====================================
          WHISKY HERO
      ====================================== */}

      <section className="whisky-hero">

        <div className="whisky-hero-content">

          <p className="whisky-small-title">
            SIP NOW
          </p>

          <h1>
            Discover Whisky
          </h1>

          <p>
            Explore our collection of Scotch,
            Japanese, Irish, American and Australian
            whisky.
          </p>

          <button
            onClick={() => setSelectedCategory("Whisky")}
          >
            Explore Whisky
          </button>

        </div>

      </section>


      {/* =====================================
          WHISKY CATEGORIES
      ====================================== */}

      <section className="whisky-categories">

        <div className="section-heading">

          <p>OUR COLLECTION</p>

          <h2>
            Whisky Categories
          </h2>

          <span>
            Find your favourite whisky
          </span>

        </div>


        <div className="whisky-category-grid">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={
                selectedCategory === category
                  ? "whisky-category active"
                  : "whisky-category"
              }
            >

              {category}

            </button>

          ))}

        </div>

      </section>


      {/* =====================================
          SEARCH
      ====================================== */}

      <section className="whisky-search">

        <input
          type="text"
          placeholder="Search whisky..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <span>
          {filteredProducts.length} products
        </span>

      </section>


      {/* =====================================
          PRODUCTS
      ====================================== */}

      <section className="whisky-products">

        <div className="section-heading">

          <p>SHOP NOW</p>

          <h2>
            {selectedCategory}
          </h2>

        </div>


        {filteredProducts.length === 0 ? (

          <div className="no-products">

            <h3>
              No Whisky Found
            </h3>

            <p>
              Try another whisky category or search.
            </p>

            <button
              onClick={() => {
                setSelectedCategory("Whisky");
                setSearch("");
              }}
            >
              Show All Whisky
            </button>

          </div>

        ) : (

          <div className="whisky-product-grid">

            {filteredProducts.map((product) => (

              <div
                className="whisky-product-card"
                key={product.id}
              >

                <div className="whisky-image-container">

                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(event) => {
                      event.currentTarget.style.display =
                        "none";
                    }}
                  />

                  <span className="whisky-badge">
                    Whisky
                  </span>

                </div>


                <div className="whisky-product-info">

                  <p className="whisky-product-category">
                    {product.category}
                  </p>

                  <h3>
                    {product.name}
                  </h3>

                  <p className="whisky-description">
                    {product.description}
                  </p>


                  <div className="whisky-price">

                    <strong>
                      ₹{product.price.toLocaleString("en-IN")}
                    </strong>

                    <del>
                      ₹{product.oldPrice.toLocaleString("en-IN")}
                    </del>

                  </div>


                  <div className="whisky-card-buttons">

                    <button
                      onClick={() =>
                        setSelectedProduct(product)
                      }
                    >
                      View Details
                    </button>

                    <button
                      onClick={() =>
                        addToCart(product)
                      }
                    >
                      Add to Cart
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* =====================================
          WHISKY INFORMATION
      ====================================== */}

      <section className="whisky-information">

        <h2>
          Explore the World of Whisky
        </h2>

        <p>
          From classic Scotch whisky to Japanese,
          Irish, American and Australian whisky,
          explore a collection made for every whisky
          lover.
        </p>

      </section>


      {/* =====================================
          CART
      ====================================== */}

      <section className="whisky-cart">

        <div className="cart-header">

          <h2>
            Your Cart
          </h2>

          <span>
            {normalizedCart.reduce((total, item) => total + item.quantity, 0)}{" "}
            items
          </span>

        </div>


        {normalizedCart.length === 0 ? (

          <p className="empty-cart">
            Your cart is empty.
          </p>

        ) : (

          <>

            <div className="cart-items">

              {normalizedCart.map((item) => (

                <div
                  className="cart-item"
                  key={item.name || item.id}
                >

                  <div>

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                  </div>


                  <strong>
                    ₹
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString("en-IN")}
                  </strong>


                  <button
                    onClick={() => removeCartItem(item)}
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>


            <div className="cart-total">

              <h3>
                Total: ₹
                {normalizedCart
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toLocaleString("en-IN")}
              </h3>

              <button>
                Proceed to Checkout
              </button>

            </div>

          </>

        )}

      </section>


      {/* =====================================
          PRODUCT DETAILS POPUP
      ====================================== */}

      {selectedProduct && (

        <div
          className="whisky-modal-overlay"
          onClick={() =>
            setSelectedProduct(null)
          }
        >

          <div
            className="whisky-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="close-modal"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              ×
            </button>


            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />


            <p>
              {selectedProduct.category}
            </p>


            <h2>
              {selectedProduct.name}
            </h2>


            <p>
              {selectedProduct.description}
            </p>


            <h3>
              ₹
              {selectedProduct.price.toLocaleString(
                "en-IN"
              )}
            </h3>


            <button
              onClick={() => {
                addToCart(selectedProduct);
                setSelectedProduct(null);
              }}
            >
              Add to Cart
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

function OtherWhisky() {
  const products = [
    {
      id: 1,
      name: "Premium Other Whisky",
      category: "Other Whisky",
      price: 2499,
      image: "🥃",
    },
    {
      id: 2,
      name: "Classic Other Whisky",
      category: "Other Whisky",
      price: 2999,
      image: "🥃",
    },
    {
      id: 3,
      name: "Reserve Other Whisky",
      category: "Other Whisky",
      price: 3999,
      image: "🥃",
    },
  ];

  return (
    <div className="whisky-page">
      <h1>Other Whisky</h1>

      <p>Explore our Other Whisky collection.</p>

      <div className="whisky-products">
        {products.map((product) => (
          <div className="whisky-card" key={product.id}>
            <div className="whisky-image">{product.image}</div>

            <h2>{product.name}</h2>

            <p>{product.category}</p>

            <h3>₹{product.price}</h3>

            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScotchWhisky() {
  const products = [
    {
      id: 1,
      name: "Premium Scotch Whisky",
      category: "Single Malt Scotch",
      price: 4999,
      image: "🥃",
    },
    {
      id: 2,
      name: "Classic Scotch Whisky",
      category: "Blended Scotch",
      price: 5999,
      image: "🥃",
    },
    {
      id: 3,
      name: "Scotch Reserve Whisky",
      category: "Premium Scotch",
      price: 7499,
      image: "🥃",
    },
  ];

  return (
    <div className="whisky-page">
      <h1>Scotch Whisky</h1>

      <p>Explore our Scotch Whisky collection.</p>

      <div className="whisky-products">
        {products.map((product) => (
          <div className="whisky-card" key={product.id}>
            <div className="whisky-image">{product.image}</div>

            <h2>{product.name}</h2>

            <p>{product.category}</p>

            <h3>₹{product.price}</h3>

            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function JapaneseWhisky() {
  const products = [
    {
      id: 1,
      name: "Japanese Premium Whisky",
      category: "Japanese Single Malt",
      price: 6499,
      image: "🥃",
    },
    {
      id: 2,
      name: "Japanese Classic Whisky",
      category: "Japanese Whisky",
      price: 7499,
      image: "🥃",
    },
    {
      id: 3,
      name: "Japanese Reserve",
      category: "Premium Japanese Whisky",
      price: 8999,
      image: "🥃",
    },
  ];

  return (
    <div className="whisky-page">
      <h1>Japanese Whisky</h1>

      <p>Explore our Japanese Whisky collection.</p>

      <div className="whisky-products">
        {products.map((product) => (
          <div className="whisky-card" key={product.id}>
            <div className="whisky-image">{product.image}</div>

            <h2>{product.name}</h2>

            <p>{product.category}</p>

            <h3>₹{product.price}</h3>

            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function IrishWhisky() {
  const products = [
    {
      id: 1,
      name: "Premium Irish Whisky",
      category: "Irish Whisky",
      price: 3499,
      image: "🥃",
    },
    {
      id: 2,
      name: "Classic Irish Whisky",
      category: "Blended Irish Whisky",
      price: 3999,
      image: "🥃",
    },
    {
      id: 3,
      name: "Irish Reserve",
      category: "Premium Irish Whisky",
      price: 4999,
      image: "🥃",
    },
  ];

  return (
    <div className="whisky-page">
      <h1>Irish Whisky</h1>

      <p>Explore our Irish Whisky collection.</p>

      <div className="whisky-products">
        {products.map((product) => (
          <div className="whisky-card" key={product.id}>
            <div className="whisky-image">{product.image}</div>

            <h2>{product.name}</h2>

            <p>{product.category}</p>

            <h3>₹{product.price}</h3>

            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AmericanWhisky() {
  const products = [
    {
      id: 1,
      name: "American Premium Whisky",
      category: "American Whisky",
      price: 3299,
      image: "🥃",
    },
    {
      id: 2,
      name: "Classic American Whisky",
      category: "American Whisky",
      price: 4299,
      image: "🥃",
    },
    {
      id: 3,
      name: "American Reserve",
      category: "Premium American Whisky",
      price: 5499,
      image: "🥃",
    },
  ];

  return (
    <div className="whisky-page">
      <h1>American Whisky</h1>

      <p>Explore our American Whisky collection.</p>

      <div className="whisky-products">
        {products.map((product) => (
          <div className="whisky-card" key={product.id}>
            <div className="whisky-image">{product.image}</div>

            <h2>{product.name}</h2>

            <p>{product.category}</p>

            <h3>₹{product.price}</h3>

            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AustralianWhisky() {
  const products = [
    {
      id: 1,
      name: "Australian Premium Whisky",
      category: "Australian Whisky",
      price: 4499,
      image: "🥃",
    },
    {
      id: 2,
      name: "Australian Classic Whisky",
      category: "Australian Whisky",
      price: 5499,
      image: "🥃",
    },
    {
      id: 3,
      name: "Australian Single Malt",
      category: "Single Malt",
      price: 6999,
      image: "🥃",
    },
  ];

  return (
    <div className="whisky-page">
      <h1>Australian Whisky</h1>

      <p>Explore our Australian Whisky collection.</p>

      <div className="whisky-products">
        {products.map((product) => (
          <div className="whisky-card" key={product.id}>
            <div className="whisky-image">{product.image}</div>

            <h2>{product.name}</h2>

            <p>{product.category}</p>

            <h3>₹{product.price}</h3>

            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Whisky;

