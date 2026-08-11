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

export default ScotchWhisky;
