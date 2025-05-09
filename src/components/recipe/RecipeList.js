// src/components/RecipeList.js
import '../ItemList.css';
import './Recipe.css';
import '../Show.css' ;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://localhost:3000/recipes';

    axios
      .get(apiUrl)
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);

        console.log('index is called successfully')
      })
      .catch((error) => {
        setError('Error fetching recipes with: ', error);
        setLoading(false);

        console.log('index is called with error')
      });
  }, []);

  if (loading) {
    console.log('Loading...');

    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error: ', error);

    return (
      <div className="show-view">
        <div className="show-details">
          <p className="recipe-description">Recipe list showing failed with error: {error}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-container">
      <h1 className="list-title">Delicious Recipes</h1>

      <ul className="list">
        {recipes.map((recipe) => (
          <li className="list-item" key={recipe.id}>
            <div className="item-header">
              <h2 className="recipe-title">{recipe.title}</h2>
            </div>
            <Link to={`/recipes/${recipe.id}`}>
              <button className="view-details-button">View Details</button>
            </Link>
          </li>
        ))}
      </ul>

      <div className="button-container">
        <Link to="/recipes/create">
          <button className="action-button">Create Recipe</button>
        </Link>
        {/* <button className="action-button">Add Recipe</button> */}
        {/* <button className="action-button">View All Recipe Requests</button> */}
        <Link to="/products">
          <button className="action-button">All Products</button>
        </Link>
        <button className="action-button">More...</button>
      </div>
    </div>
  );
}

export default RecipeList;