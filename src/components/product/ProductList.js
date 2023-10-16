// src/components/ProductList.js
import '../ItemList.css';
import './Product.css';
import '../Show.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://localhost:3000/products';

    axios
      .get(apiUrl)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);

        console.log('index is called successfully')
      })
      .catch((error) => {
        setError('Error fetching products with: ', error);
        setLoading(false);

        console.log('index is called with error')
      });
  }, []);

  if (loading) {
    console.log('Loading...');

    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error: ', error);

    return (
      <div className="show-view">
        <div className="show-details">
          <p className="product-description">Product list showing failed with error: {error}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-container">
      <h1 className="list-title">Products</h1>

      <ul className="list">
        {products.map((product) => (
          <li className="list-item" key={product.id}>
            <div className="item-header">
              <h2 className="product-name">{product.name}</h2>
            </div>
            <p className="product-types">
              {product.types.map((type)=> (
                type + ' '
              ))}
            </p>
            <Link to={`/products/${product.id}`}>
              <button className="view-details-button">View Details</button>
            </Link>
          </li>
        ))}
      </ul>

      <div className="button-container">
        <Link to="/products/create">
          <button className="action-button">Create Product</button>
        </Link>
        <Link to="/">
          <button className="action-button">All Recipes</button>
        </Link>
        <button className="action-button">More...</button>
      </div>
    </div>
  );
}

export default ProductList;