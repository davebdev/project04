import './Admin.css';
import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import AdminNav from './AdminNav';
import ManageGuests from './ManageGuests';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminInvite from './AdminInvite';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#7c4dff',
    },
  },
});


const Admin = () => {
    const [loggedIn, setLoggedIn] = useState(true);
    const [userfname, setUserfname] = useState(null);
    const [userlname, setUserlname] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [adminNav, setAdminNav] = useState('MANAGE GUESTS');
    const [editInvite, setEditInvite] = useState(null);

    useEffect(() => {
        axios.get('session/authenticate')
        .then(res => {
            console.log(res);
            setLoggedIn(true);
            setUserfname(res.data.fname);
            setUserlname(res.data.lname);
            setUserEmail(res.data.email);
        })
      }, [loggedIn]);

      const logout = (e) => {
        axios.delete('/session')
        .then(() => {
            localStorage.clear();
            setLoggedIn(false);
        })
      }

    if (!loggedIn) {
        return <Navigate replace to="/login" />;
      } else {
        return (
            <ThemeProvider theme={theme}>
                <div className="Admin">
                    <AdminNav logout={logout} fname={userfname} lname={userlname} setAdminNav={setAdminNav} theme={theme}/>
                    {adminNav === 'MANAGE GUESTS' && <ManageGuests setAdminNav={setAdminNav} setEditInvite={setEditInvite} theme={theme}/>}
                    {adminNav === 'EDIT INVITE' && <AdminInvite setAdminNav={setAdminNav} setEditInvite={setEditInvite} editInvite={editInvite} theme={theme}/>}
                </div>
            </ThemeProvider>
        )
      }



}

export default Admin;