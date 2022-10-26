import axios from "axios";

const RsvpLogin = (props) => {
    const { setAuthenticated } = props;

    const guestLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            email: formData.get('email'),
        };
        axios.post('/guest/login', data)
        .then((dbRes) => {
            console.log(dbRes)
            setAuthenticated(true);
        })
        .catch((err) => {
            console.log(err);
        })
    }

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

export default RsvpLogin;