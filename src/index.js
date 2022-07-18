import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/Main";
import AddProductPage from "./components/AddProductPage";
import CardPage from "./components/CardPage";
import OrderPage from "./components/OrderPage";
import AddShopPage from "./components/AddShopPage";
import store from "./store/reducer";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App><MainPage/></App>} />
          <Route path="/sign" element={<App><LoginPage/></App>} />
          <Route path="/add-product" element={<App><AddProductPage/></App>} />
          <Route path="/card" element={<App><CardPage/></App>} />
          <Route path="/orders" element={<App><OrderPage/></App>} />
          <Route path="/add-shop" element={<App><AddShopPage/></App>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
