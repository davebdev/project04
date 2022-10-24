const express = require('express');
const router = express.Router();
const Session = require('../models/session');
const Guest = require('../models/guest');

router.get("/all", (request, response) => {
    const sid = request.sessionID;
    Session.checkSessionMatches(sid)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.json({ loggedIn: false })
        } else {
            Guest.getAllGuestInfo()
            .then(dbRes => {
                return response.json(dbRes.rows);
            })
            .catch(err => response.status(500).json({error: err}));
        }
    })
});

router.post("/login", (request, response) => {
    const email = request.body.email;
    Guest.getGuestInfo(email)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.status(400).json({ message: 'That email address wasn\'t found on our list. Please try another email or contact us directly to RSVP.' })
        } else {
            request.session.email = email;
            request.session.user = 'guest';
            return response.json({ authenticated: 'success' });
        }
    })
    .catch(() => response.sendStatus(500));
})

router.post("/", (request, response) => {
    const sid = request.sessionID;
    const invite_id = request.body.invite_id;
    Session.checkSessionMatches(sid)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.json({ loggedIn: false })
        } else {
            Guest.createNewGuestRow(invite_id)
            .then(dbRes => {
                return response.json(dbRes.rows);
            })
            .catch(err => response.status(500).json({error: err}));
        }
    })
})

router.put("/", (request, response) => {
    const sid = request.sessionID;
    const row = {
        id: request.body.id,
        fname: request.body.fname,
        lname: request.body.lname,
        email: request.body.email,
        rsvp: request.body.rsvp,
        dietary_reqs: request.body.dietary_reqs,
        age_bracket: request.body.age_bracket
    }
    Session.checkSessionMatches(sid)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.json({ loggedIn: false })
        } else {
            Guest.updateGuestRow(row)
            .then(() => {
                return response.json({ message: 'update successful' });
            })
            .catch(err => response.status(500).json({error: err}));
        }
    })
})

router.delete("/:id", (request, response) => {
    const sid = request.sessionID;
    const rowId = request.params.id;
    Session.checkSessionMatches(sid)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.json({ loggedIn: false })
        } else {
            Guest.deleteGuestRow(rowId)
            .then(() => {
                return response.json({ message: 'delete successful' });
            })
            .catch(err => response.status(500).json({error: err}));
        }
    })
})

module.exports = router;