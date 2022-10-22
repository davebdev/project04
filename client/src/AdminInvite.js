import axios from 'axios';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from "react-router-dom";

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

const AdminInvite = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <div>testing admin invite for invite {props.editInvite}</div>
        </ThemeProvider>
    )
}

export default AdminInvite;