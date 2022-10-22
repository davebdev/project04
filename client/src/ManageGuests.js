import * as React from 'react';
import './ManageGuests.css';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

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

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerAlign: 'left',
    align: 'left',
    width: 90,
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
    field: 'firstName',
    headerName: 'First name',
    headerAlign: 'left',
    align: 'left',
    width: 150,
    editable: true,
    headerClassName: 'GuestsColumnHeader'
  },
  {
    field: 'lastName',
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
    field: 'comments',
    headerName: 'Comments',
    headerAlign: 'left',
    align: 'left',
    width: 300,
    editable: true,
    headerClassName: 'GuestsColumnHeader'
  },

];

const ManageGuests = (props) => {
    const [rows, setRows] = React.useState([
          { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        ]);

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