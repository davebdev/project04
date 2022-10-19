const express = require('express');
const router = express.Router();

router.post("/authenticate", (req, res) => {
    console.log('Authenticated');
});

module.exports = router;