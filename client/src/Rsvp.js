import { useEffect } from "react";
import "./Rsvp.css";
import axios from "axios";


const Rsvp = (props) => {
    const { setGuestLoggedIn, guestLoggedIn } = props;

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

    useEffect(() => {
        axios.get('/guest/authenticate')
        .then(response => {
            if (response.data[0]) {
                setGuestLoggedIn(true);
            }
        })
    }, []);

    if (guestLoggedIn) {
        return (
        <div className="Rsvp">
            <p>RSVP</p>
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