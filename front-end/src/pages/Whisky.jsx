function Whisky() {
  const products = [
    {
      id: 1,
      name: "Premium Scotch Whisky",
      category: "Scotch Whisky",
      price: 4999,
      image: "🥃",
    },
    {
      id: 2,
      name: "Japanese Premium Whisky",
      category: "Japanese Whisky",
      price: 6499,
      image: "🥃",
    },
    {
      id: 3,
      name: "Premium Irish Whisky",
      category: "Irish Whisky",
      price: 3499,
      image: "🥃",
    },
    {
      id: 4,
      name: "American Premium Whisky",
      category: "American Whisky",
      price: 3299,
      image: "🥃",
    },
    {
      id: 5,
      name: "Australian Premium Whisky",
      category: "Australian Whisky",
      price: 4499,
      image: "🥃",
    },
    {
      id: 6,
      name: "Premium Other Whisky",
      category: "Other Whisky",
      price: 2499,
      image: "🥃",
    },
  ];

  return (
    <div className="whisky-page">
      <h1>Whisky Collection</h1>

      <p>Explore our complete Whisky collection</p>

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
