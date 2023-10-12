import '../ItemList.css';
import './Recipe.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function RecipeShow() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
        setLoading(false);

        console.log('show is called successfull')
      })
      .catch(error => {
        setError('Error fetching recipes with: ', error);
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
        <h2 className="recipe-title">{recipe.title}</h2>
        <p className="recipe-types">
          {recipe.types.map((type) => type + ' ')}
        </p>
      </div>
      <div className="show-details">
        <p className="recipe-video-url">
          <a href={recipe.video_url} target="_blank" rel="noreferrer">
            Watch Video
          </a>
        </p>
        <p className="recipe-description">{recipe.description}</p>
      </div>

      <div className="button-container">
        <Link to="/">
          <button className="action-button">All Recipes</button>
        </Link>
        <button className="action-button">Update Recipe</button>
        <button className="delete-button">Delete Recipe</button>
      </div>
    </div>
  );
}

export default RecipeShow;