// src/components/ProductList.js
import '../ItemList.css';
import '../ProductList.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the API endpoint for your Rails API
    const apiUrl = 'http://localhost:3000/products';

    // Fetch the products from the API
    axios
      .get(apiUrl)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching products with: ', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    console.log('Loading...');

    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error: ', error);

    return <div>{error}</div>;
  }

  console.log('Success with products: ', products);

  return (
    <div className="list-container">
      <h1 className="list-title">Products</h1>
      <ul className="list">
        {products.map((product) => (
          <li className="item" key={product.id}>
            <div className="item-header">
              <h2 className="product-name">{product.name}</h2>
            </div>
            <p className="product-types">
              {product.types.map((type)=> (
                type + ' '
              ))}
            </p>
            <p className="product-description">{product.description}</p>
            <button className="view-details-button">View Details</button>
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button className="action-button">Create Product</button>
        <button className="action-button">More...</button>
      </div>
    </div>
  );
}

export default ProductList;