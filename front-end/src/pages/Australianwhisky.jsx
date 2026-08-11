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

export default AustralianWhisky;
