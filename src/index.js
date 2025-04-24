import React from "react";
import reactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./context/AuthProvider";
import 'animate.css'
import { CartProvider } from "./context/CartContext";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'


const root = reactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
  <CartProvider>
    <AuthProvider>
  
        <App></App>
       

    </AuthProvider>
    </CartProvider>
  </BrowserRouter>
);
