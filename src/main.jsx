import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import { Toaster } from "sonner";
import { store } from './app/store'
import { Provider } from 'react-redux'


axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

// prettier-ignore
ReactDOM 
  .createRoot(document.getElementById('root'))
  .render(
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
        <Toaster richColors />
      </BrowserRouter>
    </Provider>
  )
