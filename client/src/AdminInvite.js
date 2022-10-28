import axios from 'axios';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridToolbar, GridRowModes, GridToolbarContainer, GridActionsCellItem, GridCellParams } from '@mui/x-data-grid';
import './AdminInvite.css';
import { Input, InputLabel, Button, Box, TextField, OutlinedInput, FormControl } from '@mui/material';

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
    const { setRows, setRowModesModel, setNewRow, inviteDetails } = props;

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
            setNewRow({rowId: id});
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
    const [newRow, setNewRow] = useState({rowId: null});
    const [update, setUpdate] = useState(false);

    const forceUpdate = () => {
        setUpdate(!update);
    }

    const guestNames = () => {
        let result;
        const lastIndex = rows.length - 1;
        for (let i = 0; i < rows.length; i++) {
            if (i === 0) {
                result = rows[0].fname;
            } else if (i !== 0 && i !== lastIndex) {
                result = result + `, ${rows[i].fname}`
            } else if (i === lastIndex && lastIndex !== 0) {
                result = result + ` and ${rows[i].fname}`
            }
        }
        return result;
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
        setNewRow({rowId: null});
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      };

      const handleDeleteClick = (id) => () => {
        axios.delete(`/guest/${id}`)
        .then(() => {
            forceUpdate();
        })
      };

      const handleCancelClick = (id) => () => {
        if (newRow.rowId === id) {
            axios.delete(`/guest/${id}`)
            .then(dbRes => {
                console.log('deleted ok client side')
                setRowModesModel({
                    ...rowModesModel,
                    [id]: { mode: GridRowModes.View, ignoreModifications: true },
                  });
            })
        } else {
            setRowModesModel({
                ...rowModesModel,
                [id]: { mode: GridRowModes.View, ignoreModifications: true },
              });
        }
      };

      const processRowUpdate = (newRow) => {
        console.log(newRow)
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
                  icon={<i className="fa-light fa-pen-to-square"></i>}
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
        ];

    const ariaLabel = { 'aria-label': 'description' };

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
                <h1>Invitation to {guestNames()}</h1>
                <h2>Guests attached to this invite:</h2>
            </div>
            <Box className="GuestGrid" sx={{height: '35vh', width: '90vw', display: 'flex'}}>
            <div style={{ flexGrow: 1 }}>
                <DataGrid
                    components={{
                        Toolbar: EditToolbar,
                        }}
                    componentsProps={{
                        toolbar: { setRows, setRowModesModel, setNewRow, inviteDetails },
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
        <div className='InviteBox'>
        <Box
                component="form"
                sx={{
                    borderRadius: '5px',
                    backgroundColor: '#F3f3f3',
                    height: '35vh',
                    width: '90vw',
                    display: 'flex'
                }}
                >
                    <div className='InviteDetails' style={{ flexGrow: 1 , padding: '10px'}}>
                    <FormControl variant="filled">
                    <InputLabel htmlFor="invite-status">Invite status</InputLabel>
                        <OutlinedInput
                        margin="none"
                        className='inviteField'
                        inputProps={ariaLabel}
                        id="invite-status"
                        disabled
                        defaultValue={inviteDetails.invite_status === null ? '' : inviteDetails.invite_status}/>
                    </FormControl>
                    <FormControl variant="filled">
                        <InputLabel htmlFor="logged-in-timestamp">Last logged in</InputLabel>
                        <OutlinedInput
                        margin="normal"
                        className='inviteField'
                        inputProps={ariaLabel}
                        id="logged-in-timestamp"
                        disabled
                        defaultValue={inviteDetails.logged_in_timestamp === null ? '' : inviteDetails.logged_in_timestamp}/>
                    </FormControl>
                    <FormControl variant="filled">
                        <InputLabel htmlFor="logged-in-guest">By</InputLabel>
                        <OutlinedInput
                        margin="normal"
                        className='inviteField'
                        inputProps={ariaLabel}
                        id="logged-in-guest"
                        disabled
                        defaultValue={inviteDetails.logged_in_guest === null ? '' : inviteDetails.logged_in_guest}/>
                    </FormControl>
                    <FormControl variant="filled">
                        <InputLabel htmlFor="comments">Comments</InputLabel>
                        <OutlinedInput
                        margin="normal"
                        className='inviteField'
                        inputProps={ariaLabel}
                        id="comments"
                        disabled
                        multiline={true}
                        rows='4'
                        fullWidth={true}
                        defaultValue={inviteDetails.comments === null ? '' : inviteDetails.comments}/>
                    </FormControl>
                    </div>
                </Box>
        </div>
        </ThemeProvider>
    )
}

export default AdminInvite;
