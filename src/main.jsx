import "./globals.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

import { BACKEND_SERVER_URL } from "./constants/utils.js";

axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
axios.defaults.baseURL = BACKEND_SERVER_URL;

// prettier-ignore
ReactDOM 
  .createRoot(document.getElementById('root'))
  .render(<App />)
