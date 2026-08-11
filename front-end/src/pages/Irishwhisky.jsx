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

export default IrishWhisky;
