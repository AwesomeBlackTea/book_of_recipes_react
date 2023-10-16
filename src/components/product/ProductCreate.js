import React, { useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductCreate() {
  const [formData, setFormData] = useState({
    title: '',
    types: [],
    video_url: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTypesChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      types: value.split(',').map((type) => type.trim()),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3000/products', formData)
      .then((response) => {
        setLoading(false);

        console.log('Product created successfully:', response.data);

        //redirecting to show page
      })
      .catch((error) => {
        setLoading(false);
        setError('Error creating product: ' + error);

        console.error('Error creating product:', error);
      });
  };

  if (loading) {
    console.log('Loading...');

    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error: ', error);

    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Create a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="types">Types (comma-separated):</label>
          <input
            type="text"
            id="types"
            name="types"
            value={formData.types.join(', ')}
            onChange={handleTypesChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ProductCreate;