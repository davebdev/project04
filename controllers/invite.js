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
            return response.status(401).json({errorMessage: "You are currently not logged in. Please login to view this page."})
        } else {
            const user = request.session.user;
            const expiryDate = new Date(dbRes.rows[0].expire);
            const currentDate = new Date();
            if (expiryDate.getTime() > currentDate.getTime()) {
                if (user === 'guest') {
                    return response.status(400).json({ errorMessage: "User currently logged in as Guest. User must be an admin to view this page."})
                } else if (user === 'admin') {
                    const results = {}
                    Invite.getInviteInfo(invite_id)
                    .then(dbRes => {
                        if (dbRes.rowCount === 0) {
                            return response.json({ errorMessage: "No invitation with that id" })
                        } else {
                            results.invite = dbRes.rows;
                            Guest.getGuestsByInviteId(invite_id)
                            .then(dbRes => {
                                results.guests = dbRes.rows;
                                return response.status(200).json(results);
                            })
                            .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
                        }
                    })
                }
            } else {
                return response.status(440).json({errorMessage: "Your session has expired. Please login again."})
            }
        }
    })
    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
});

router.post("/", (request, response) => {
    const sid = request.sessionID;
    Session.checkSessionMatches(sid)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.status(401).json({errorMessage: "You are currently not logged in. Please login to view this page."})
        } else {
            const user = request.session.user;
            const expiryDate = new Date(dbRes.rows[0].expire);
            const currentDate = new Date();
            if (expiryDate.getTime() > currentDate.getTime()) {
                if (user === 'guest') {
                    return response.status(400).json({ errorMessage: "User currently logged in as Guest. User must be an admin to view this page."})
                } else if (user === 'admin') {

                    Invite.createNewInvite()
                    .then(dbRes => response.status(200).json(dbRes.rows))
                    .catch(err => console.log(err));
                }
            }
        }
    })
    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
})

router.patch('/comment', (request, response) => {
    const sid = request.sessionID;
    const data = request.body;
    console.log("invite_id: ", data.invite_id, "comments: ", data.comments);
    Session.checkSessionMatches(sid)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.status(401).json({errorMessage: "You are currently not logged in. Please login to view this page."})
        } else {
            const user = request.session.user;
            const expiryDate = new Date(dbRes.rows[0].expire);
            const currentDate = new Date();
            if (expiryDate.getTime() > currentDate.getTime()) {
                Invite.updateComments(data)
                .then(dbRes => response.status(200).json({infoMessage: "Comments updated"}))
                .catch(err => console.log(err));
            }
        }
    })
    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
})

module.exports = router;