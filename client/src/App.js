import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import SaveTheDate from "./SaveTheDate"

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="" element={<SaveTheDate />} />
            <Route path="invites" element={<Invite />} />
        </Routes>
    </BrowserRouter>
  );
}

const testStyle = {
    color: 'white',
    textAlign: 'center'
  };

function Invite() {
    return <h2 style={testStyle}>About</h2>;
}

export default App;
