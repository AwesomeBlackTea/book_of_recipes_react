import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function RecipeDestroy() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .delete(`http://localhost:3000/recipes/${id}`)
      .then(() => {
        setLoading(false);

        console.log('Recipe deleted successfully')
      })
      .catch((error) => {
        setError('Error deleting recipe with: ', error);
        setLoading(false);

        console.log('Error deleting recipe')
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
      <div className="show-details">
        <p className="recipe-description">Recipe deleted successfully.</p>
      </div>

      <Link to="/">
        <button className="action-button">All Recipes</button>
      </Link>
    </div>
  );
}

export default RecipeDestroy;