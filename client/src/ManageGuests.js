import { useState, useEffect} from 'react';
import { Button, Box } from '@mui/material/';
import './ManageGuests.css';
import { DataGrid, GridToolbar, GridToolbarContainer, GridRowModes, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

// const theme = createTheme({
//     palette: {
//       primary: {
//         main: '#000000',
//       },
//       secondary: {
//         main: '#7c4dff',
//       },
//     },
//   });

const EditToolbar = (props) => {
    const { setAdminNav, setEditInvite } = props;

    const handleClick = () => {
        console.log('Add record click');
        axios.post("/invite")
        .then(dbRes => {
            console.log(dbRes);
            setEditInvite(dbRes.data[0].id);
            setAdminNav('EDIT INVITE');
        })
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<i className='fa-light fa-floppy-disk'></i>} onClick={handleClick}>
                Add record
            </Button>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

// EditToolbar.propTypes = {
// setRowModesModel: PropTypes.func.isRequired,
// setRows: PropTypes.func.isRequired,
// };

const ManageGuests = (props) => {
    const { setAdminNav, setEditInvite, theme } = props;
    const [rows, setRows] = useState([
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
              field: 'guests',
              headerName: 'Guests',
              headerAlign: 'left',
              align: 'left',
              flex: 0.3,
              editable: false,
            },
            {
              field: 'invite_status',
              headerName: 'Invite Status',
              headerAlign: 'left',
              align: 'left',
              flex: 0.1,
              editable: false,
              hide: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'logged_in_timestamp',
              headerName: 'Last logged in',
              type: 'dateTime',
              headerAlign: 'left',
              align: 'left',
              flex: 0.1,
              editable: false,
              hide: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'logged_in_guest',
              headerName: 'Logged in email',
              headerAlign: 'left',
              align: 'left',
              flex: 0.1,
              editable: false,
              hide: true,
              headerClassName: 'GuestsColumnHeader'
            },
            {
              field: 'comments',
              headerName: 'Comments',
              headerAlign: 'left',
              align: 'left',
              flex: 0.3,
              editable: false,
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
                      setEditInvite(params.row.id);
                      setAdminNav('EDIT INVITE');
                  }
                  return <Button variant="outlined" onClick={redirectToEdit}>EDIT INVITE</Button>;
              },
              headerClassName: 'GuestsColumnHeader'
            },
          ];

    useEffect(() => {
        axios.get('/guest/all')
        .then((dbRes) => {
            console.log(dbRes.data)
            const allData = dbRes.data
            const inviteData = []
            for (let i = 0; i < allData.length; i++) {
                if (i === 0) {
                    inviteData.push({
                        id: allData[i].invite_id,
                        guests: `${allData[i].fname} ${allData[i].lname}`,
                        invite_status: allData[i].invite_status,
                        logged_in_guest: allData[i].logged_in_guest,
                        logged_in_timestamp: allData[i].logged_in_timestamp,
                        comments: allData[i].comments
                    })
                } else if (allData[i].invite_id === allData[i-1].invite_id) {
                    inviteData.find((o, j) => {
                        if (o.id === allData[i].invite_id) {
                            inviteData[j].guests = inviteData[j].guests + `, ${allData[i].fname} ${allData[i].lname}`
                            return true;
                        }
                    });
                } else {
                    inviteData.push({
                        id: allData[i].invite_id,
                        guests: `${allData[i].fname} ${allData[i].lname}`,
                        invite_status: allData[i].invite_status,
                        logged_in_guest: allData[i].logged_in_guest,
                        logged_in_timestamp: allData[i].logged_in_timestamp,
                        comments: allData[i].comments
                })
            }
        }
        setRows(inviteData);
        })
    }, [])



  return (
    <ThemeProvider theme={theme}>
        <Box className="GuestGrid" sx={{height: '80vh', width: '90vw', display: 'flex'}}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid
                    components={{ Toolbar: EditToolbar }}
                    componentsProps={{
                        toolbar: { setAdminNav, setEditInvite },
                        }}
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

export default ManageGuests;