// src/components/RecipeList.js
import React, { useState, useEffect } from 'react';
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
        console.log(response.data);
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Error fetching recipes');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Recipe List</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h2>{recipe.title}</h2>
            {/* Add more recipe details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;