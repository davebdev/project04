const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to: 'tysondonnelly@gmail.com', // Change to your recipient
    from: 'davidpaulbuckley@gmail.com', // Change to your verified sender
    subject: 'This is a test of the Wedding Manager app',
    text: 'Can you let me know if this comes through?',
    html: '<p>Can you let me know if this <strong>comes through?</strong><br>Thanks beautiful! x</p>',
  }

router.post("/send", (req, res) => {
sgMail
  .send(msg)
  .then(() => {
    res.json({
        "email" : "sent"
    })
  })
  .catch((error) => {
    console.error(error);
    console.error(error.response.body);
  });
});

module.exports = router;
