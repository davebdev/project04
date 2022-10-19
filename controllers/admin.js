const express = require('express');
const router = express.Router();

router.post("/authenticate", (req, res) => {
    res.json({
        "authenticate" : "ok"
    })
});

module.exports = router;