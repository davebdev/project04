import axios from 'axios';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridToolbar, GridRowModes, GridToolbarContainer, GridActionsCellItem } from '@mui/x-data-grid';
import './AdminInvite.css';
import { Input, Button, Box } from '@mui/material';

import PropTypes from 'prop-types';

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

// CRUD functionality code adapted from https://mui.com/x/react-data-grid/editing/#full-featured-crud-component

const EditToolbar = (props) => {
    const { setRows, setRowModesModel, inviteDetails } = props;

    const handleClick = () => {
        const inviteId = inviteDetails.id.toString();
        const form = new FormData();
        form.append("invite_id", inviteId);
        const data = {
            invite_id: form.get('invite_id')
        }
        axios.post('/guest', data)
        .then(dbRes => {
            const id = dbRes.data[0].id;
            console.log("row id:", id);
            setRows((oldRows) => [...oldRows, { id, invite_id: inviteDetails.id, fname: '', lname: '', email: '', rsvp: '', dietary_reqs: '', age_bracket: 'A',  isNew: true }]);
            setRowModesModel((oldModel) => ({
              ...oldModel,
              [id]: { mode: GridRowModes.Edit, fieldToFocus: 'fname' },
            }));
        })
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<i className='fa-light fa-floppy-disk'></i>} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }

  EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
  };


const AdminInvite = (props) => {
    const [rows, setRows] = useState([
        { age_bracket: "-",
          dietary_reqs: "-",
          email: "-",
          fname: "-",
          id: 0,
          lname: "-",
          rsvp: "-" }
      ]);
    const [inviteDetails, setInviteDetails] = useState({invite_id: props.editInvite})
    const [rowModesModel, setRowModesModel] = useState({});
    const [update, setUpdate] = useState(false);

    const forceUpdate = () => {
        setUpdate(!update);
    }

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
      };

      const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
        console.log("handleRowEditStop params: ", params);
      };

      const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        console.log(`handleEditClick (id): ${id}`);
      };

      const handleSaveClick = (id) => (e) => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      };

      const handleDeleteClick = (id) => () => {
        axios.delete(`/guest/${id}`)
        .then(dbRes => {
            console.log('deleted ok client side')
            forceUpdate();
        })
        // delete row from db then use forceUpdate() to update page
        // setRows(rows.filter((row) => row.id !== id))
      };

      const handleCancelClick = (id) => () => {
        // check if row is a new row, if so delete from db
        setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
          setRows(rows.filter((row) => row.id !== id));
        }
      };

      const processRowUpdate = (newRow) => {
        axios.put("/guest", newRow)
        .then(dbRes => dbRes);
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
      };

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
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
              const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

              if (isInEditMode) {
                return [
                  <GridActionsCellItem
                    icon={<i className='fa-light fa-floppy-disk'></i>}
                    label="Save"
                    onClick={handleSaveClick(id)}
                  />,
                  <GridActionsCellItem
                    icon={<i className="fa-light fa-ban"></i>}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                  />,
                ];
              }

              return [
                <GridActionsCellItem
                  icon={<i className="fa-thin fa-pen-to-square"></i>}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
                />,
                <GridActionsCellItem
                  icon={<i className="fa-light fa-trash"></i>}
                  label="Delete"
                  onClick={handleDeleteClick(id)}
                  color="inherit"
                />,
              ];
            },
          },
        ];

  useEffect(() => {
      axios.get(`/invite/${props.editInvite}`)
      .then((dbRes) => {
          setRows(dbRes.data.guests);
          setInviteDetails(dbRes.data.invite[0]);
      })
  }, [rowModesModel, update])

    return (
        <ThemeProvider theme={theme}>
            <div className='InviteBox'>
                <h1>Invitation to: {inviteDetails.primary_email}</h1>
                <Box
                component="form"
                sx={{
                    borderRadius: '5px',
                    backgroundColor: 'white',
                    height: '30vh',
                    width: '90vw',
                    display: 'flex'
                }}
                >
                    <div className='InviteDetails' style={{ flexGrow: 1 }}>
                        <Input id="primary-email" disabled placeholder='Primary email (null)' value={inviteDetails.primary_email}/>

                        <Input id="invite-status" disabled placeholder='Invite status (null)' value={inviteDetails.invite_status === null ? '' : inviteDetails.invite_status}/>

                        <Input id="logged-in-timestamp" disabled placeholder='Last logged in (never)' value={inviteDetails.logged_in_timestamp === null ? '' : inviteDetails.logged_in_timestamp}/>

                        <Input id="logged-in-guest" disabled placeholder='Login email (null)' value={inviteDetails.logged_in_guest === null ? '' : inviteDetails.logged_in_guest}/>

                        <Input id="comments" disabled multiline={true} rows='4' fullWidth={true} placeholder='Comments (none)' value={inviteDetails.comments === null ? '' : inviteDetails.comments}/>
                    </div>
                </Box>
                <h2>Guests attached to this invite:</h2>
            </div>
            <Box className="GuestGrid" sx={{height: '30vh', width: '90vw', display: 'flex'}}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid
                    components={{
                        Toolbar: EditToolbar,
                        }}
                    componentsProps={{
                        toolbar: { setRows, setRowModesModel, inviteDetails },
                        }}
                    experimentalFeatures={{ newEditingApi: true }}
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={(error) => console.log(error)}
                    pageSize={3}
                    rowsPerPageOptions={[3]}
                    checkboxSelection={false}
                    disableSelectionOnClick
                    sx={{ backgroundColor: '#F3f3f3'}}
                />
            </div>
        </Box>
        </ThemeProvider>
    )
}

export default AdminInvite;
