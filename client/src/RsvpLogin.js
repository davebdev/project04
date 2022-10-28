import axios from "axios";

const RsvpLogin = (props) => {
    const { setAuthenticated, setGuestArr } = props;

    const guestLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            email: formData.get('email'),
        };
        axios.post('/guest/login', data)
        .then((dbRes) => {
            axios.get('/guest')
            .then(response => {
                setGuestArr(response.data);
                setAuthenticated(true);
            })
            .catch(err => console.log(err))
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="Rsvp">
            <h2 id="login-heading">RSVP</h2>
            <form id="guest-login-form" data-testid="guest-login-form" onSubmit={guestLogin}>
            <input id="email" data-testid="guest-email-input" name="email" type="email" placeholder="Enter the email address your invite was sent to"/>
            <button data-testid="guest-login-button" type="submit">Continue</button>
            </form>
        </div>
    )
}

export default RsvpLogin;