import * as React from 'react';
import { Button, Box } from '@mui/material/';
import './ManageGuests.css';
import { DataGrid, GridToolbar, GridToolbarContainer, GridRowModes, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridActionsCellItem } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';


const EditToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const ExportGuests = (props) => {
    const { theme } = props;
    const [rows, setRows] = React.useState([
          { comments: "-",
            guests: "-",
            id: 0,
            invite_status: "-",
            logged_in_guest: "-",
            logged_in_timestamp: "-"        }
        ]);


        const columns = [
            {
              field: 'id',
              headerName: 'ID',
              headerAlign: 'left',
              align: 'left',
              flex: 0.1,
              hideable: false,
              headerClassName: 'GuestsColumnHeader'
          },
          {
            field: 'fname',
            headerName: 'First name',
            headerAlign: 'left',
            align: 'left',
            flex: 0.1,
            editable: true,
            headerClassName: 'GuestsColumnHeader'
          },
          {
            field: 'lname',
            headerName: 'Last name',
            headerAlign: 'left',
            align: 'left',
            flex: 0.1,
            editable: true,
            headerClassName: 'GuestsColumnHeader'
          },
          {
            field: 'email',
            headerName: 'Email',
            headerAlign: 'left',
            align: 'left',
            flex: 0.15,
            editable: true,
            headerClassName: 'GuestsColumnHeader'
          },
          {
            field: 'rsvp',
            headerName: 'RSVP',
            headerAlign: 'left',
            align: 'left',
            flex: 0.08,
            editable: true,
          },
          {
            field: 'age_bracket',
            headerName: 'Age Bracket',
            headerAlign: 'left',
            align: 'left',
            flex: 0.08,
            editable: true,
            headerClassName: 'GuestsColumnHeader'
          },
          {
            field: 'dietary_reqs',
            headerName: 'Dietary Requirements',
            headerAlign: 'left',
            align: 'left',
            flex: 0.2,
            editable: true,
            headerClassName: 'GuestsColumnHeader'
          },
            {
              field: 'invite_status',
              headerName: 'Invite Status',
              headerAlign: 'left',
              align: 'left',
              flex: 0.1,
              editable: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'logged_in_timestamp',
              headerName: 'Last logged in',
              type: 'dateTime',
              headerAlign: 'left',
              align: 'left',
              flex: 0.1,
              editable: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'logged_in_guest',
              headerName: 'Logged in email',
              headerAlign: 'left',
              align: 'left',
              flex: 0.1,
              editable: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'comments',
              headerName: 'Comments',
              headerAlign: 'left',
              align: 'left',
              flex: 0.2,
              editable: true,
              headerClassName: 'GuestsColumnHeader'
            },
          ];

          React.useEffect(() => {
        axios.get('/guest/all')
        .then((dbRes) => {
            const allData = [...dbRes.data];
            allData.sort((a,b) => a.invite_id - b.invite_id);
            console.log(allData)
            setRows(allData);
        })
    }, [])



  return (
    <ThemeProvider theme={theme}>
        <Box className="GuestGrid" sx={{height: '80vh', width: '90vw', display: 'flex'}}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid
                    components={{ Toolbar: EditToolbar }}
                    rows={rows}
                    columns={columns}
                    pageSize={25}
                    rowsPerPageOptions={[25]}
                    checkboxSelection={false}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    sx={{ backgroundColor: '#F3f3f3'}}
                />
            </div>
        </Box>
    </ThemeProvider>
  );
}

export default ExportGuests;