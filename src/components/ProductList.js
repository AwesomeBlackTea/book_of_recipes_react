// src/components/ProductList.js
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
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <h2>{product.types}</h2>
            <h2>{product.description}</h2>
            {/* Add more product details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;