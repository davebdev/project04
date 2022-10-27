import { useState, useEffect } from "react";
import SaveTheDate from "./SaveTheDate";
import GuestNav from "./GuestNav";
import Rsvp from "./Rsvp";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";

function App() {
    const [guestNav, setGuestNav] = useState('SAVE THE DATE');
    const [authenticated, setAuthenticated] = useState(false);
    const [userData, setUserData] = useState([]);
    const [guestArr, setGuestArr] = useState([]);
    const [rsvpAcknowledgement, setRsvpAcknowledgement] = useState(false);

    const logout = (e) => {
        axios.delete('/guest/session')
        .then(() => {
            localStorage.clear();
            setAuthenticated(false);
            setUserData(null);
            setGuestArr([]);
            setRsvpAcknowledgement(false);
            setGuestNav('SAVE THE DATE');
        })
      }

    const mainTheme = createTheme({
        palette: {
          primary: {
            main: '#000000',
          },
          secondary: {
            main: '#ffffff',
          },
        },
      });

      useEffect(() => {
        axios.get('/guest/authenticate')
        .then(response => {
            console.log(response.data)
            if (response.data.email) {
                setUserData(response.data);
                axios.get('/guest')
                .then(response => {
                    console.log("***", response.data)
                    setGuestArr(response.data);
                    setAuthenticated(true);
            })
            .catch(err => console.log(err));
            } else {
                setAuthenticated(false);
            }
        })
        .catch(err => console.log(err));
    }, [authenticated]);

  return (
    <div className="App">
        <ThemeProvider theme={mainTheme}>
            <GuestNav setGuestNav={setGuestNav} authenticated={authenticated}/>
            {guestNav === 'SAVE THE DATE' && <SaveTheDate />}
            {guestNav === 'RSVP' && <Rsvp setAuthenticated={setAuthenticated} authenticated={authenticated} userData={userData} guestArr={guestArr} setGuestArr={setGuestArr} rsvpAcknowledgement={rsvpAcknowledgement} setRsvpAcknowledgement={setRsvpAcknowledgement} mainTheme={mainTheme}/>}
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