const express = require('express');
const router = express.Router();
const Session = require('../models/session');

router.get("/authenticate", (request, response) => {
    const sid = request.sessionID;
    Session.checkSessionMatches(sid)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.json({ loggedIn: false })
        } else {
            const user = request.session.user;
            const expiryDate = new Date(dbRes.rows[0].expire);
            const currentDate = new Date();
            if (expiryDate.getTime() > currentDate.getTime()) {
                if (user === 'admin') {
                    Session.getAdminData(request.session.email)
                    .then(dbRes => {
                        return response.json(dbRes.rows[0])
                    });
                } else if (user === 'guest') {
                    Session.getGuestData(request.session.email)
                    .then(dbRes => {
                        return response.json(dbRes.rows[0])
                    })
                }
            } else {
                return response.json({ loggedIn: false })
            }
        }
    })
})

router.delete("/", (request, response) => {
    const sid = request.sessionID;
    Session.checkSessionMatches(sid)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.json({ loggedOut: false });
        } else {
            request.session.destroy();
            return response.json({ loggedOut: true });
        }
    })
    .catch(() => response.sendStatus(500))
})

module.exports = router;