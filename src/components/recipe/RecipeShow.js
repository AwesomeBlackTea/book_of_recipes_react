import '../ItemList.css';
import './Recipe.css';
import '../Show.css' ;
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

        console.log('Recipe shown successfully')
      })
      .catch(error => {
        setError('Error fetching recipe with: ', error);
        setLoading(false);

        console.log('Error showing recipe')
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
          <p className="recipe-description">Recipe showing failed with error: {error}.</p>
        </div>

        <Link to="/">
          <button className="action-button">All Recipes</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="show-view">
      <div className="show-header">
        <h2 className="recipe-title">{recipe.title}</h2>
      </div>
      <div className="show-details">
        {recipe.video_url && (
        <p className="recipe-video-url">
          <a href={recipe.video_url} target="_blank" rel="noreferrer">
            Watch Video
          </a>
        </p>)}
        <p className="recipe-description">{recipe.description}</p>
      </div>

      <div className="button-container">
        <Link to="/">
          <button className="action-button">All Recipes</button>
        </Link>
        <Link to={`/recipes/${id}/update`}>
          <button className="action-button">Update Recipe</button>
        </Link>
        <Link to={`/recipes/${id}/delete`}>
          <button className="delete-button">Delete Recipe</button>
        </Link>
      </div>
    </div>
  );
}

export default RecipeShow;