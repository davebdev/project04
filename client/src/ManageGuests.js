import * as React from 'react';
import Button from '@mui/material/Button';
import './ManageGuests.css';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
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

const ManageGuests = (props) => {
    const [rows, setRows] = React.useState([
          { age_bracket: "-",
            comments: "-",
            dietary_reqs: "-",
            email: "-",
            fname: "-",
            id: 1,
            invite_id: null,
            invite_status: "-",
            lname: "-",
            logged_in_guest: "-",
            logged_in_timestamp: "-",
            primary_email: "-",
            rsvp: "-" }
        ]);

        const columns = [
            {
              field: 'id',
              headerName: 'ID',
              headerAlign: 'left',
              align: 'left',
              width: 90,
              hideable: false,
              headerClassName: 'GuestsColumnHeader'
          },
            {
              field: 'invite_id',
              headerName: 'Invite ID',
              type: 'number',
              headerAlign: 'left',
              align: 'left',
              width: 90,
              editable: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'fname',
              headerName: 'First name',
              headerAlign: 'left',
              align: 'left',
              width: 150,
              editable: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'lname',
              headerName: 'Last name',
              headerAlign: 'left',
              align: 'left',
              width: 150,
              editable: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'email',
              headerName: 'Email',
              headerAlign: 'left',
              align: 'left',
              width: 200,
              editable: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'rsvp',
              headerName: 'RSVP',
              headerAlign: 'left',
              align: 'left',
              width: 90,
              editable: true,
            },
            {
              field: 'age_bracket',
              headerName: 'Age Bracket',
              headerAlign: 'left',
              align: 'left',
              width: 110,
              editable: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'dietary_reqs',
              headerName: 'Dietary Requirements',
              headerAlign: 'left',
              align: 'left',
              width: 300,
              editable: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'primary_email',
              headerName: 'Primary email',
              headerAlign: 'left',
              align: 'left',
              width: 200,
              editable: true,
              hide: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'invite_status',
              headerName: 'Invite Status',
              headerAlign: 'left',
              align: 'left',
              width: 100,
              editable: true,
              hide: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'logged_in_timestamp',
              headerName: 'Last logged in',
              type: 'dateTime',
              headerAlign: 'left',
              align: 'left',
              width: 100,
              editable: true,
              hide: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'logged_in_guest',
              headerName: 'Logged in email',
              headerAlign: 'left',
              align: 'left',
              width: 200,
              editable: true,
              hide: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'comments',
              headerName: 'Comments',
              headerAlign: 'left',
              align: 'left',
              width: 300,
              editable: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'edit_invite',
              headerName: 'Edit Invite',
              headerAlign: 'left',
              align: 'left',
              width: 150,
              editable: false,
              renderCell: (params) => {
                  const redirectToEdit = (e) => {
                      e.stopPropagation();
                      props.setEditInvite(params.row.invite_id);
                      props.setAdminNav('EDIT INVITE');
                  }
                  return <Button onClick={redirectToEdit}>EDIT INVITE</Button>;
              },
              headerClassName: 'GuestsColumnHeader'
            },
          ];

    React.useEffect(() => {
        axios.get('/guest/all')
        .then((dbRes) => {
            setRows(dbRes.data)
        })
    }, [])



  return (
    <ThemeProvider theme={theme}>
        <Box className="GuestGrid" sx={{height: '80vh', width: '90vw'}}>
        <DataGrid
            components={{ Toolbar: GridToolbar }}
            rows={rows}
            columns={columns}
            pageSize={25}
            rowsPerPageOptions={[25]}
            checkboxSelection
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            sx={{ backgroundColor: '#F3f3f3'}}
        />
        </Box>
    </ThemeProvider>
  );
}

export default ManageGuests;