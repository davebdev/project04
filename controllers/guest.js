const { response } = require('express');
const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const Guest = require('../models/guest');

router.get("/all", (request, response) => {
    const sid = request.sessionID;
    Admin.checkSessionMatches(sid)
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

router.post("/", (request, response) => {
    const sid = request.sessionID;
    const invite_id = request.body.invite_id;
    Admin.checkSessionMatches(sid)
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
    Admin.checkSessionMatches(sid)
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

module.exports = router;