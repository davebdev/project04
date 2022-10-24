const express = require('express');
const router = express.Router();
const Guest = require('../models/guest');
const Invite = require('../models/invite');
const Session = require('../models/session');

router.get("/:id", (request, response) => {
    const sid = request.sessionID;
    const invite_id = request.params.id;
    Session.checkSessionMatches(sid)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.json({ loggedIn: false })
        } else {
            const results = {}
            Invite.getInviteInfo(invite_id)
            .then(dbRes => {
                if (dbRes.rowCount === 0) {
                    return response.json({ errorMessage: 'No invitation with that id' })
                } else {
                    results.invite = dbRes.rows;
                    Guest.getInviteGuestInfo(invite_id)
                    .then(dbRes => {
                        results.guests = dbRes.rows;
                        return response.json(results);
                    })
                }
            })
            .catch(err => response.status(500).json({error: err}));
        }
    })
});

module.exports = router;