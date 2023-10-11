// src/components/RecipeList.js
import '../ItemList.css';
import '../RecipeList.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the API endpoint for your Rails API
    const apiUrl = 'http://localhost:3000/recipes';

    // Fetch the recipes from the API
    axios
      .get(apiUrl)
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching recipes with: ', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    console.log('Loading...');

    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error: ', error);

    return <div>{error}</div>;
  }

  console.log('Success with recipes: ', recipes);

  return (
    <div className="list-container">
      <h1 className="list-title">Delicious Recipes</h1>

      <ul className="list">
        {recipes.map((recipe) => (
          <li className="item" key={recipe.id}>
            <div className="item-header">
              <h2 className="recipe-title">{recipe.title}</h2>
            </div>
            <p className="recipe-types">
              {recipe.types.map((type)=> (
                type + ' '
              ))}
            </p>
            <p className="recipe-video-url">{recipe.video_url}</p>
            <p className="recipe-description">{recipe.description}</p>
            <button className="view-details-button">View Details</button>
          </li>
        ))}
      </ul>

      <div className="button-container">
        <button className="action-button">Create Recipe</button>
        <button className="action-button">Add Recipe</button>
        <Link to="/product-list">
          <button className="action-button">Products List</button>
        </Link>
        <button className="action-button">More...</button>
      </div>
    </div>
  );
}

export default RecipeList;