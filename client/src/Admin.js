import './Admin.css';
import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';

const Admin = () => {
    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        axios.get('admin/authenticate')
        .then(res => {
            setLoggedIn(res.data.loggedIn);
        })
      }, [loggedIn]);

      const logout = (e) => {
        axios.delete('admin/session')
        .then(() => {
            localStorage.clear();
            setLoggedIn(false);
        })
      }

    if (!loggedIn) {
        return <Navigate replace to="/login" />;
      } else {
        return (
            <div className="Admin">
                <p>Testing</p>
                <p><button onClick={logout}>Logout</button></p>
            </div>
        )
      }



}

export default Admin;