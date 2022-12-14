import { useState, useEffect, forwardRef } from "react";
import "./Rsvp.css";
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, Box, TextField } from '@mui/material';
import { DataGrid, GridToolbar, GridRowModes, GridToolbarContainer, GridActionsCellItem, GridCellParams, useGridApiContext, useGridApiEventHandler } from '@mui/x-data-grid';
import MuiAlert from '@mui/material/Alert';
import SnackBar from './SnackBar';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
                                    padding: theme.spacing(2),
                                },
    '& .MuiDialogActions-root': {
                                    padding: theme.spacing(1),
                                },
        })
);

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (

            <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <i className="fa-light fa-xmark"></i>
            </IconButton>
        ) : null}
        </DialogTitle>
    );
}

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };



const RsvpDetails = (props) => {
    const { guestArr, setGuestArr, rsvpAcknowledgement, setRsvpAcknowledgement, mainTheme } = props;
    const [invitationOpen, setInvitationOpen] = useState(true);
    const [rows, setRows] = useState(guestArr);
    const [rowModesModel, setRowModesModel] = useState({});
    const [update, setUpdate] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState(null);

    const forceUpdate = () => {
        setUpdate(!update);
    }

    const InvitationModal = () => {

        const names = () => {
            let result;
            if (rows) {
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
            }
            return result;
        }

        const handleClose = () => {
            setInvitationOpen(false);
            setRsvpAcknowledgement(true);
        };

        return (
                <div>
                    {!rsvpAcknowledgement &&
                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={invitationOpen}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Dear {guestArr !== null && names()}
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                        <Typography gutterBottom>
                            Tyson and Dave with their families are delighted to invite you to join them in celebration on the occasion of their wedding.<br/><br/>

                            This website is designed to give you all the information you should need regarding the event, but should you have any further questions, please don't hesitate to get in touch with Dave (davidpaulbuckley@gmail) or Tyson (tysondonnelly@gmail).<br/><br/>

                            Click 'OK' to view the details we have for you, and RSVP your attendance.
                        </Typography>
                        </DialogContent>
                        <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            OK
                        </Button>
                        </DialogActions>
                    </BootstrapDialog>}
                </div>
        )
    }

    let invite = {}
    if (guestArr) {
        invite.invite_id = guestArr[0].invite_id;
        invite.comments = guestArr[0].comments;
    }


    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
        console.log("handleRowEditStart params: ", params);
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
        console.log("handleRowEditStop params: ", params);
        console.log("handleRowEditStop event: ", event);
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        console.log(`handleEditClick (id): ${id}`);
    };

    const handleSaveClick = (id) => (e) => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        console.log(`handleSaveClick (id): ${id}`);
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
            });
        console.log(`handleCancelClick (id): ${id}`);
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
        field: 'fname',
        headerName: 'First name',
        headerAlign: 'left',
        align: 'left',
        flex: 0.1,
        minWidth: 50,
        editable: false,
        headerClassName: 'GuestsColumnHeader'
        },
        {
        field: 'lname',
        headerName: 'Last name',
        headerAlign: 'left',
        align: 'left',
        flex: 0.1,
        editable: false,
        headerClassName: 'GuestsColumnHeader'
        },
        {
        field: 'email',
        headerName: 'Email',
        headerAlign: 'left',
        align: 'left',
        flex: 0.2,
        editable: false,
        headerClassName: 'GuestsColumnHeader'
        },
        {
        field: 'rsvp',
        type: 'singleSelect',
        valueOptions: [{ value: 'Yes', label: 'Yes' }, { value: 'Yes Pending', label: 'Yes - Pending circumstances' }, { value: 'No', label: 'No' }],
        headerName: 'RSVP',
        headerAlign: 'left',
        align: 'left',
        flex: 0.2,
        editable: true,
        },
        {
        field: 'age_bracket',
        type: 'singleSelect',
        valueOptions: [{ value: 'A', label: 'Adult' }, { value: 'T', label: 'Teen (U18)' }, { value: 'C', label: 'Child (U12)' }],
        headerName: 'Age Bracket',
        headerAlign: 'left',
        align: 'left',
        flex: 0.1,
        editable: true,
        headerClassName: 'GuestsColumnHeader'
        },
        {
        field: 'dietary_reqs',
        headerName: 'Dietary Requirements',
        headerAlign: 'left',
        align: 'left',
        flex: 0.3,
        editable: true,
        headerClassName: 'GuestsColumnHeader'
        },
        {
        field: 'actions',
        type: 'actions',
        headerName: 'Edit',
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
            ];
        },
        },
    ];

    const handleForm = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);

        const data = {
            invite_id: invite.invite_id,
            comments: form.get('comments')
        }
        console.log(data);
        axios.patch('/invite/comment', data)
        .then(dbRes => {
            if (dbRes.data.infoMessage) {
                setSnackbarMessage(dbRes.data.infoMessage);
            } else if (dbRes.data.errorMessage) {
                setSnackbarMessage(dbRes.data.errorMessage);
            }
            setSnackOpen(true);
            forceUpdate();
        })
        .catch(err => console.log(err))

    }

    useEffect(() => {
        axios.get('/guest')
        .then(response => {
            setGuestArr(response.data);
        })
    }, [rowModesModel, rsvpAcknowledgement, rows])

    return (
    <div className="Rsvp">
        <ThemeProvider theme={mainTheme}>
            <InvitationModal />
        </ThemeProvider>
        <ThemeProvider theme={mainTheme}>
            <div className="rsvpContent">
                <Box className="GuestGrid" sx={{height: '40vh', width: '100%', display: 'flex'}}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
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
                <Box component='form' className="InviteComments" onSubmit={handleForm} sx={{ padding: '10px', backgroundColor: '#F3f3f3', borderRadius: '5px', m: '20px 0', height: 'fit-content' }}>
                    <TextField
                    id="comments"
                    label="Comments"
                    name="comments"
                    multiline
                    maxRows={5}
                    defaultValue={invite.comments}
                    />
                    <Button sx={{ m: '10px 0' }} variant="contained" type="submit">Save</Button>
                </Box>
            </div>
        <SnackBar snackOpen={snackOpen} setSnackOpen={setSnackOpen} snackbarMessage={snackbarMessage} />
        </ThemeProvider>
    </div>
    )
}

export default RsvpDetails;