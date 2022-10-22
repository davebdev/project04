const express = require('express');
const router = express.Router();
const { isValidPassword, generateHash } = require('../util/hash');
const Admin = require('../models/admin');

router.post("/", (request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    console.log(email);
    console.log(password);
    Admin.getAllAdminData(email)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.status(400).json({ message: 'The username and/or password you have entered is incorrect' })
        }
        const admin = dbRes.rows[0]
        console.log(admin);
        const hashedPassword = admin.password;
        if (isValidPassword(password, hashedPassword)) {
            request.session.email = request.body.email;
            return response.json({ authenticated: 'success' });
        } else {
        return response.status(400).json({ message: 'The username and/or password you have entered is incorrect.' })
        }
    })
    .catch(() => response.sendStatus(500));
});

router.get("/authenticate", (request, response) => {
    const sid = request.sessionID;
    Admin.checkSessionMatches(sid)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.json({ loggedIn: false })
        } else {
            const expiryDate = new Date(dbRes.rows[0].expire);
            const currentDate = new Date();
            if (expiryDate.getTime() > currentDate.getTime()) {
                Admin.getAdminData(request.session.email)
                .then(dbRes => {
                    console.log(dbRes.rows[0]);
                    return response.json(dbRes.rows[0])
                });
            } else {
                return response.json({ loggedIn: false })
            }
        }
    })
})

router.delete("/session", (request, response) => {
    const sid = request.sessionID;
    Admin.checkSessionMatches(sid)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.json({ loggedOut: false });
        } else {
            console.log(request.session);
            request.session.destroy();
            return response.json({ loggedOut: true });
        }
    })
    .catch(() => response.sendStatus(500))
})

module.exports = router;