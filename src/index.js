import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import RecipeList from './components/recipe/RecipeList';
import RecipeShow from './components/recipe/RecipeShow';
import ProductList from './components/product/ProductList';
import ProductShow from './components/product/ProductShow';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <div className="app">
      <header className="app-header">
        <h1>Book of Recipes</h1>
        <div className="button-container">
          <button className="action-button">Sign in</button>
          <button className="action-button">Sign up</button>
          <button className="action-button">Sign out</button>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="products" element={<ProductList />} />
          <Route path='/recipes/:id' element={<RecipeShow />} />
          <Route path='/products/:id' element={<ProductShow />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();