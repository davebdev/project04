const express = require('express');
const router = express.Router();
const { isValidPassword } = require('../util/hash');
const Admin = require('../models/admin');

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
            return response.json({ authenticated: 'success' });
        } else {
        return response.status(400).json({ errorMessage: 'The username and/or password you have entered is incorrect.' })
        }
    })
    .catch(() => response.sendStatus(500));
});

module.exports = router;