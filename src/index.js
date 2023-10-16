import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

import RecipeList from './components/recipe/RecipeList';
import RecipeShow from './components/recipe/RecipeShow';
import RecipeCreate from './components/recipe/RecipeCreate';
import RecipeUpdate from './components/recipe/RecipeUpdate';
import RecipeDestroy from './components/recipe/RecipeDestroy';

import ProductList from './components/product/ProductList';
import ProductShow from './components/product/ProductShow';
import ProductCreate from './components/product/ProductCreate';
import ProductUpdate from './components/product/ProductUpdate';
import ProductDestroy from './components/product/ProductDestroy';

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
          <Route path='/recipes/:id' element={<RecipeShow />} />
          <Route path="/recipes/create" element={<RecipeCreate />} />
          <Route path="/recipes/:id/update" element={<RecipeUpdate />} />
          <Route path="/recipes/:id/delete" element={<RecipeDestroy />} />

          <Route path="products" element={<ProductList />} />
          <Route path='/products/:id' element={<ProductShow />} />
          <Route path="/products/create" element={<ProductCreate />} />
          <Route path="/products/:id/update" element={<ProductUpdate />} />
          <Route path="/products/:id/delete" element={<ProductDestroy />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();