import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeUpdate() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    types: [],
    video_url: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/recipes/${id}`)
      .then((response) => {
        setFormData(response.data);
        setLoading(false);

        console.log('Recipe gotten successfully')
      })
      .catch((error) => {
        setError('Error deleting recipe with: ', error);
        setLoading(false);

        console.log('Error getting recipe')
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/recipes/${id}`, formData)
      .then(() => {
        console.log('Recipe updated successfully')

        navigate(`/recipes/${id}`)
      })
      .catch((error) => {
        setError('Error updating recipe with: ', error);

        console.log('Error updating recipe')
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Update Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="video_url">Video URL:</label>
          <input type="text" id="video_url" name="video_url" value={formData.video_url} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
        </div>
        <button type="submit">Update Recipe</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default RecipeUpdate;