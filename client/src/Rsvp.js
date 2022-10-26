import { useState, useEffect } from "react";
import "./Rsvp.css";
import RsvpLogin from './RsvpLogin';
import RsvpDetails from './RsvpDetails';



const Rsvp = (props) => {
    const { authenticated, setAuthenticated, guestArr, setGuestArr, rsvpAcknowledgement, setRsvpAcknowledgement, mainTheme } = props;

    if (authenticated) {
        return (
            <RsvpDetails guestArr={guestArr} setGuestArr={setGuestArr} rsvpAcknowledgement={rsvpAcknowledgement} setRsvpAcknowledgement={setRsvpAcknowledgement} mainTheme={mainTheme} />
        )
    } else {
        return (
            <RsvpLogin setAuthenticated={setAuthenticated} />
        )
    }
}

export default Rsvp;