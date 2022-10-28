const express = require('express');
const router = express.Router();
const { isValidPassword, generateHash } = require('../util/hash');
const Admin = require('../models/admin');
const Session = require('../models/session');

router.get("/authenticate", (request, response) => {
    const sid = request.sessionID;
    Session.checkSessionMatches(sid)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.json({errorMessage: "You are currently not logged in. Please login to view this page."})
        } else {
            const user = request.session.user;
            const expiryDate = new Date(dbRes.rows[0].expire);
            const currentDate = new Date();
            if (expiryDate.getTime() > currentDate.getTime()) {
                if (user === 'admin') {
                    Session.getAdminData(request.session.email)
                    .then(dbRes => {
                        return response.status(200).json(dbRes.rows[0])
                    });
                } else if (user === 'guest') {
                    return response.status(403).json({errorMessage: "You do not have access to view this area. Please click 'back'."})
                }
            } else {
                return response.status(440).json({errorMessage: "Your session has expired. Please login again."})
            }
        }
    })
    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
})

router.delete("/session", (request, response) => {
    const sid = request.sessionID;
    Session.checkSessionMatches(sid)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.json({errorMessage: "You are currently not logged in."})
        } else {
            const user = request.session.user;
            const expiryDate = new Date(dbRes.rows[0].expire);
            const currentDate = new Date();
            if (expiryDate.getTime() > currentDate.getTime()) {
                if (user === 'guest') {
                    return response.status(400).json({ errorMessage: "User currently logged in as Guest. Please attempt logout via guest portal."})
                } else if (user === 'admin') {
                    request.session.destroy();
                    return response.json({ infoMessage: "Admin successfully logged out." });
                }
            } else {
                return response.status(440).json({errorMessage: "Your session has expired."})
            }
        }
    })
    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
})

router.post("/login", (request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    Admin.getAllAdminData(email)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.status(400).json({ errorMessage: 'The username and/or password you have entered is incorrect' })
        }
        const admin = dbRes.rows[0]
        const hashedPassword = admin.password;
        if (isValidPassword(password, hashedPassword)) {
            request.session.email = request.body.email;
            request.session.user = 'admin';
            return response.status(200).json({ infoMessage: 'Successfully logged in' });
        } else {
        return response.status(400).json({ errorMessage: 'The username and/or password you have entered is incorrect.' })
        }
    })
    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
});

module.exports = router;