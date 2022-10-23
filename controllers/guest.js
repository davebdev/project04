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


module.exports = router;