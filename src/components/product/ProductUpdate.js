import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function ProductUpdate() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    types: [],
    video_url: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((response) => {
        setFormData(response.data);
        setLoading(false);

        console.log('Product gotten successfully')
      })
      .catch((error) => {
        setError('Error deleting product with: ', error);
        setLoading(false);

        console.log('Error getting product')
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/products/${id}`, formData)
      .then(() => {
        console.log('Product updated successfully')
      })
      .catch((error) => {
        setError('Error updating product with: ', error);

        console.log('Error updating product')
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="types">Types (comma-separated):</label>
          <input type="text" id="types" name="types" value={formData.types.join(', ')} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default ProductUpdate;