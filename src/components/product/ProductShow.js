import '../ItemList.css';
import '../Show.css' ;
import './Product.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function ProductShow() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);

        console.log('Product shown successfully')
      })
      .catch(error => {
        setError('Error fetching product with: ', error);
        setLoading(false);

        console.log('Error showing product')
      });
  }, [id]);

  if (loading) {
    console.log('Loading...');

    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error: ', error);

    return (
      <div className="show-view">
        <div className="show-details">
          <p className="product-description">Product showing failed with error: {error}.</p>
        </div>

        <Link to="/products">
          <button className="action-button">All Products</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="show-view">
      <div className="show-header">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-types">
          {product.types.map((type) => type + ' ')}
        </p>
      </div>
      <div className="show-details">
        <p className="product-description">{product.description}</p>
      </div>

      <div className="button-container">
        <Link to="/products">
          <button className="action-button">All Products</button>
        </Link>
        <Link to={`/products/${id}/update`}>
          <button className="action-button">Update Product</button>
        </Link>
        <Link to={`/products/${id}/delete`}>
          <button className="delete-button">Delete Product</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductShow;