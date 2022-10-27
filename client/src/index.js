import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import Admin from "./Admin";
import AdminLogin from './AdminLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element={<App />} />
                <Route path="admin" element={<Admin />} />
                <Route path="login" element={<AdminLogin />} />
            </Routes>
        </BrowserRouter>
  </React.StrictMode>
);