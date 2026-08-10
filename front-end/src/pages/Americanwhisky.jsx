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

export default AmericanWhisky;
