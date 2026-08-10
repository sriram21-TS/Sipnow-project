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

export default JapaneseWhisky;
