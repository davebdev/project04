import { useState, useEffect } from "react";
import SaveTheDate from "./SaveTheDate";
import GuestNav from "./GuestNav";
import Rsvp from "./Rsvp";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";

function App() {
    const [guestNav, setGuestNav] = useState('SAVE THE DATE');
    const [guestLoggedIn, setGuestLoggedIn] = useState(false);

    const logout = (e) => {
        axios.delete('/guest/session')
        .then(() => {
            localStorage.clear();
            setGuestLoggedIn(false);
            setGuestNav('SAVE THE DATE');
        })
      }

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

      useEffect(() => {
        axios.get('/guest/authenticate')
        .then(response => {
            console.log(response);
            if (response.data.email) {
                setGuestLoggedIn(true);
            }
        })
    }, []);

  return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <GuestNav setGuestNav={setGuestNav} guestLoggedIn={guestLoggedIn}/>
            {guestNav === 'SAVE THE DATE' && <SaveTheDate setGuestLoggedIn={setGuestLoggedIn} />}
            {guestNav === 'RSVP' && <Rsvp setGuestLoggedIn={setGuestLoggedIn} guestLoggedIn={guestLoggedIn}/>}
            {guestNav === 'ON THE DAY' && <p>ON THE DAY</p>}
            {guestNav === 'TRAVEL & ACCOMM' && <p>TRAVEL & ACCOMM</p>}
            {guestNav === 'FAQS' && <p>FAQS</p>}
            {guestNav === 'GIFT REGISTRY' && <p>GIFT REGISTRY</p>}
            {guestNav === 'LOGOUT' && logout()}
        </ThemeProvider>
    </div>
  );
}

export default App;