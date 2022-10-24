const express = require('express');
const router = express.Router();
const Session = require('../models/session');
const Guest = require('../models/guest');

router.get("/authenticate", (request, response) => {
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
                if (user === 'admin') {
                    return response.status(400).json({ errorMessage: "User currently logged in as Admin. User must be a guest on the list"})
                } else if (user === 'guest') {
                    Session.getGuestData(request.session.email)
                    .then(dbRes => {
                        return response.status(200).json(dbRes.rows[0])
                    })
                    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
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
            return response.status(401).json({errorMessage: "You are currently not logged in."})
        } else {
            const user = request.session.user;
            const expiryDate = new Date(dbRes.rows[0].expire);
            const currentDate = new Date();
            if (expiryDate.getTime() > currentDate.getTime()) {
                if (user === 'admin') {
                    return response.status(400).json({ errorMessage: "User currently logged in as Admin. Please attempt logout via admin portal."})
                } else if (user === 'guest') {
                    request.session.destroy();
                    return response.json({ infoMessage: "Guest successfully logged out." });
                }
            } else {
                return response.status(440).json({errorMessage: "Your session has expired."})
            }
        }
    })
    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
})

router.get("/all", (request, response) => {
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
                    Guest.getAllGuestInfo()
                    .then(dbRes => {
                        return response.status(200).json(dbRes.rows);
                    })
                    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
                }
            } else {
                return response.status(440).json({errorMessage: "Your session has expired. Please login again."})
            }
        }
    })
    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
});

router.get("/", (request, response) => {
    const sid = request.sessionID;
    Session.checkSessionMatches(sid)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.status(401).json({errorMessage: "You are currently not logged in. Please login to view this page."})
        } else {
            const user = request.session.user;
            if (request.session.user === 'guest') {
                const guestEmail = request.session.email;
            }
            const expiryDate = new Date(dbRes.rows[0].expire);
            const currentDate = new Date();
            if (expiryDate.getTime() > currentDate.getTime()) {
                if (user === 'admin') {
                    return response.status(400).json({ errorMessage: "User currently logged in as Admin. User must be a guest on the list."})
                } else if (user === 'guest') {
                    Guest.getGuestInfo(guestEmail)
                    .then(dbRes => {
                        return response.status(200).json(dbRes.rows);
                    })
                    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
                }
            } else {
                return response.status(440).json({errorMessage: "Your session has expired. Please login again."})
            }
        }
    })
    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
})

router.post("/login", (request, response) => {
    const email = request.body.email;
    Guest.getGuestInfo(email)
    .then(dbRes => {
        if (dbRes.rowCount === 0) {
            return response.status(400).json({ errorMessage: 'That email address wasn\'t found on our list. Please try another email or contact us directly to RSVP.' })
        } else {
            request.session.email = email;
            request.session.user = 'guest';
            return response.json({ infoMessage: 'Successfully logged in' });
        }
    })
    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
})

router.post("/", (request, response) => {
    const sid = request.sessionID;
    const invite_id = request.body.invite_id;
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
                    Guest.createNewGuestRow(invite_id)
                    .then(dbRes => {
                        return response.status(201).json(dbRes.rows);
                    })
                    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
                }
            } else {
                return response.status(440).json({errorMessage: "Your session has expired. Please login again."})
            }
        }
    })
    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
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
            return response.status(401).json({errorMessage: "You are currently not logged in. Please login to view this page."})
        } else {
            const user = request.session.user;
            const expiryDate = new Date(dbRes.rows[0].expire);
            const currentDate = new Date();
            if (expiryDate.getTime() > currentDate.getTime()) {
                if (user === 'guest') {
                    return response.status(400).json({ errorMessage: "User currently logged in as Guest. User must be an admin to view this page."})
                } else if (user === 'admin') {
                    Guest.updateGuestRow(row)
                    .then(dbRes => {
                        return response.status(201).json({ infoMessage: "Update successful" });
                    })
                    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
                }
            } else {
                return response.status(440).json({errorMessage: "Your session has expired. Please login again."})
            }
        }
    })
    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
})

router.delete("/:id", (request, response) => {
    const sid = request.sessionID;
    const rowId = request.params.id;

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
                    Guest.deleteGuestRow(rowId)
                    .then(dbRes => {
                        return response.status(201).json({ infoMessage: "Delete successful" });
                    })
                    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
                }
            } else {
                return response.status(440).json({errorMessage: "Your session has expired. Please login again."})
            }
        }
    })
    .catch(() => response.status(500).json({ errorMessage: 'An error has occurred with our server. Please try again later or get in touch with us to resolve.' }));
})

module.exports = router;