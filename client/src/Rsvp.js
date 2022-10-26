import { useState } from "react";
import "./Rsvp.css";
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


const rsvpTheme = createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#ffffff',
      },
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  });

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%'
  }));

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

function BootstrapDialogTitle(props) {
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

const Rsvp = (props) => {
    const { loggedInData, guestLoggedIn, guestData, setGuestData, setGuestLoggedIn, rsvpAcknowledgement, setRsvpAcknowledgement, mainTheme } = props;
    const [invitationOpen, setInvitationOpen] = useState(true);

    const handleClose = () => {
        setInvitationOpen(false);
        setRsvpAcknowledgement(true);
    };

    const guestLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            email: formData.get('email'),
        };
        axios.post('/guest/login', data)
        .then((dbRes) => {
            setGuestLoggedIn(true);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const names = () => {
        let result;

        if (guestData.length === 1) {
            result = guestData[0].fname;
        } else {
            const lastIndex = guestData.length - 1;
            result = guestData.filter((guest, index) => index != lastIndex).map(guest => `${guest.fname}, `);
            result.push(`and ${guestData[lastIndex].fname}`)
        }
        return result;
    }

    const displayGuest = (guest) => {
        return (
            <ThemeProvider theme={rsvpTheme}>
                <Box sx={{ flexGrow: 1 }} theme={mainTheme} className='guestDetails'>
                    <Grid container spacing={1}>
                        <Item>
                            <Grid item xs={12}>
                                <h2>{guest.fname} {guest.lname} {guest.email !== null && `(${guest.email})`}</h2>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="rsvp-select-label">RSVP</InputLabel>
                                <Select
                                autoWidth
                                labelId="rsvp-select-label"
                                id="rsvp"
                                label="RSVP"
                                value={guest.rsvp}
                                color='secondary'
                                >
                                    <MenuItem value={'Yes'}>Yes</MenuItem>
                                    <MenuItem value={'Yes Pending'}>Yes - pending flights</MenuItem>
                                    <MenuItem value={'No'}>No</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="age-bracket-select-label">Age bracket</InputLabel>
                                <Select
                                // sx={{color: 'white', border: '2px solid white'}}
                                autoWidth
                                labelId="age-bracket-select-label"
                                id="age-bracket"
                                label="Age Bracket"
                                value={guest.age_bracket}
                                color='secondary'
                                >
                                    <MenuItem value={'A'}>Adult</MenuItem>
                                    <MenuItem value={'T'}>Teen</MenuItem>
                                    <MenuItem value={'C'}>Child</MenuItem>
                                </Select>
                            </Grid>
                            <Grid className="dietary-reqs-box" item xs={12}>
                                <TextField
                                className="dietary-reqs-textfield"
                                id="dietary-reqs-textfield"
                                label="Dietary Requirements"
                                multiline
                                rows={4}
                                defaultValue={guest.dietary_reqs}
                                />
                            </Grid>
                        </Item>
                    </Grid>
                </Box>
            </ThemeProvider>
            )
    }

    if (guestLoggedIn) {
        return (
        <div className="Rsvp">
            <ThemeProvider theme={rsvpTheme}>
                <div>
                    {!rsvpAcknowledgement &&
                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={invitationOpen}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Dear {guestData !== null && names()}
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                        <Typography gutterBottom>
                            <p>Tyson and Dave with their families are delighted to invite you to join them in celebration on the occasion of their wedding.</p>

                            <p>This website is designed to give you all the information you should need regarding the event, but should you have any further questions, please don't hesitate to get in touch with Dave (davidpaulbuckley@gmail) or Tyson (tysondonnelly@gmail).</p>

                            <p>Click 'OK' to view the details we have for you and RSVP your attendance.</p>
                        </Typography>
                        </DialogContent>
                        <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            OK
                        </Button>
                        </DialogActions>
                    </BootstrapDialog>}
                    </div>
            </ThemeProvider>
            <ThemeProvider theme={rsvpTheme}>
            <div className="rsvpContent">
                        <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                {guestData !== null && guestData.map((guest, index) => <div key={index}>{displayGuest(guest)}</div>)}
                <Button>SAVE</Button>
                </Box>
            </div>
            </ThemeProvider>
        </div>
        )
    } else {
        return (
            <div className="Rsvp">
                <h2 id="login-heading">RSVP</h2>
                <form id="guest-login-form" onSubmit={guestLogin}>
                <input id="email" name="email" type="email" placeholder="Enter the email address your invite was sent to"/>
                <button type="submit">Continue</button>
                </form>
            </div>
        )
    }
}

export default Rsvp;