import './Admin.css';
import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import AdminNav from './AdminNav';

const Admin = () => {
    const [loggedIn, setLoggedIn] = useState(true);
    const [userfname, setUserfname] = useState(null);
    const [userlname, setUserlname] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        axios.get('admin/authenticate')
        .then(res => {
            console.log(res);
            setLoggedIn(true);
            setUserfname(res.data.fname);
            setUserlname(res.data.lname);
            setUserEmail(res.data.email);
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
                <AdminNav logout={logout} fname={userfname} lname={userlname}/>
            </div>
        )
      }



}

export default Admin;