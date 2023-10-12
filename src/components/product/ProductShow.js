import '../ItemList.css';
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

        console.log('show is called successfull')
      })
      .catch(error => {
        setError('Error fetching products with: ', error);
        setLoading(false);

        console.log('show is called with error')
      });
  }, [id]);

  if (loading) {
    console.log('Loading...');

    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error: ', error);

    return <div>{error}</div>;
  }

  return (
    <div className="show-view">
      <div className="show-header">
        <h2 className="product-title">{product.title}</h2>
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
        <button className="action-button">Update Product</button>
        <button className="delete-button">Delete Product</button>
      </div>
    </div>
  );
}

export default ProductShow;