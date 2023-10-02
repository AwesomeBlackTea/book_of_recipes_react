// App.js
import '../App.css';
import React from 'react';
import RecipeList from './RecipeList';

function App() {
  return (
    <div className="App">
      <h1>My App</h1>
      <RecipeList /> {/* Use MyComponent here */}
    </div>
  );
}

export default App;
