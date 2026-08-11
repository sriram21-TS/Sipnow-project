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

export default OtherWhisky;
