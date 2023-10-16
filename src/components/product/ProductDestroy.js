import '../ItemList.css';
import './Product.css';
import '../Show.css' ;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function ProductDestroy() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        setLoading(false);

        console.log('Product deleted successfully')
      })
      .catch((error) => {
        setError('Error deleting product with: ', error);
        setLoading(false);

        console.log('Error deleting product')
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
          <p className="product-description">Product deleting failed with error: {error}.</p>
        </div>

        <Link to="/products">
          <button className="action-button">All Products</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="show-view">
      <div className="show-details">
        <p className="product-description">Product deleted successfully.</p>
      </div>

      <Link to="/products">
        <button className="action-button">All Products</button>
      </Link>
    </div>
  );
}

export default ProductDestroy;