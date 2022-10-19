import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import SaveTheDate from "./SaveTheDate";
import AdminLogin from "./AdminLogin";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="" element={<SaveTheDate />} />
            <Route path="admin/login" element={<AdminLogin />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
