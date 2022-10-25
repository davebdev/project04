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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


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

//   const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

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
    const { loggedInData, guestLoggedIn, guestData, setGuestData, setGuestLoggedIn, rsvpAcknowledgement, setRsvpAcknowledgement } = props;
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
            <Box sx={{ flexGrow: 1 }} className='guestDetails'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <h2>{guest.fname} {guest.lname} {guest.email !== null && `(${guest.email})`}</h2>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel sx={{color: 'white'}} id="rsvp-select-label">RSVP</InputLabel>
                        <Select
                        sx={{color: 'white', border: '2px solid white'}}
                        autoWidth
                        labelId="rsvp-select-label"
                        id="rsvp"
                        label="RSVP"
                        value={guest.rsvp}
                        >
                            <MenuItem value={'Yes'}>Yes</MenuItem>
                            <MenuItem value={'Yes Pending'}>Yes - pending flights</MenuItem>
                            <MenuItem value={'No'}>No</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel sx={{color: 'white'}} id="age-bracket-select-label">Age bracket</InputLabel>
                        <Select
                        sx={{color: 'white', border: '2px solid white'}}
                        autoWidth
                        labelId="age-bracket-select-label"
                        id="rsvp"
                        label="RSVP"
                        value={guest.age_bracket}
                        >
                            <MenuItem value={'A'}>Adult</MenuItem>
                            <MenuItem value={'T'}>Teen</MenuItem>
                            <MenuItem value={'C'}>Child</MenuItem>
                        </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <p>Dietary Requirements</p>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Vegetarian" />
                            <FormControlLabel control={<Checkbox />} label="Vegan" />
                        </Grid>
                </Grid>
            </Box>
            )
    }

    if (guestLoggedIn) {
        return (
        <div className="Rsvp">
            <ThemeProvider theme={theme}>
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
            <div className="rsvpContent">
                {guestData !== null && guestData.map((guest, index) => <div key={index}>{displayGuest(guest)}</div>)}
            </div>
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