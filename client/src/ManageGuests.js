import * as React from 'react';
import './ManageGuests.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    headerAlign: 'center',
    align: 'center',
    width: 90
},
  {
    field: 'invite_id',
    headerName: 'Invite ID',
    type: 'number',
    headerAlign: 'center',
    align: 'center',
    width: 90,
    editable: true,
  },
  {
    field: 'firstName',
    headerName: 'First name',
    headerAlign: 'center',
    align: 'center',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    headerAlign: 'center',
    align: 'center',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    headerAlign: 'center',
    align: 'center',
    width: 200,
    editable: true,
  },
  {
    field: 'rsvp',
    headerName: 'RSVP',
    headerAlign: 'center',
    align: 'center',
    width: 90,
    editable: true,
  },
  {
    field: 'dietary_reqs',
    headerName: 'Dietary Requirements',
    headerAlign: 'center',
    align: 'center',
    width: 150,
    editable: true,
  },
  {
    field: 'age_bracket',
    headerName: 'Age Bracket',
    headerAlign: 'center',
    align: 'center',
    width: 90,
    editable: true,
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const ManageGuests = (props) => {
    const [rows, setRows] = React.useState(null);

    // React.useEffect(() => {

    // }, [])

  return (
    <ThemeProvider theme={theme}>
        <Box className="GuestGrid" sx={{height: '80vh', width: '90vw'}}>
        <DataGrid
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