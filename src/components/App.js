// App.js
import '../App.css';
import React from 'react';
import RecipeList from './RecipeList';

const App = () => {
  return (
    <div className="app">
      <header className="App-header">
        <h1>Book of Recipes</h1>
        <div className="button-container">
          <button className="App-button">Sign in</button>
          <button className="App-button">Sign up</button>
        </div>
      </header>
      <main className="main-content">
        <RecipeList />
      </main>
    </div>
  );
};

export default App;