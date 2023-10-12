import React, { useState} from 'react';
import axios from 'axios';

function RecipeCreate() {
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

    // Split the comma-separated values into an array and trim each value
    const typesArray = value.split(',').map((type) => type.trim());

    setFormData({
      ...formData,
      [name]: typesArray, // Update the "types" attribute with the array
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:3000/recipes', formData)
      .then((response) => {
        setLoading(false);

        console.log('Recipe created successfully:', response.data);
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

  if (error) {
    console.error('Error: ', error);

    return <div>{error}</div>;
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
          <label htmlFor="video_url">Video URL:</label>
          <input
            type="text"
            id="video_url"
            name="video_url"
            value={formData.video_url}
            onChange={handleChange}
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
        <button type="submit">Create Recipe</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default RecipeCreate;