import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RecipeCreate() {
  const [formData, setFormData] = useState({
    title: '',
    types: [],
    video_url: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3000/recipes', formData)
      .then((response) => {
        setLoading(false);

        console.log('Recipe created successfully:', response.data);

        navigate(`/recipes/${response.data.id}`)
      })
      .catch((error) => {
        setLoading(false);
        setError('Error creating recipe: ' + error);

        console.error('Error creating recipe:', error);
      });
  };

  if (loading) {
    console.log('Loading...');

    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Create a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="video_url">Video URL:</label>
          <input
            type="text"
            id="video_url"
            name="video_url"
            value={formData.video_url}
            onChange={handleChange}
          />
        </div>
        {/* <div>
          <label htmlFor="product_ids">Products:</label>
          <input
            type="text"
            id="product_ids"
            name="product_ids"
            value={formData.video_url}
            onChange={handleChange}
          />
        </div> */}
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Recipe</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default RecipeCreate;