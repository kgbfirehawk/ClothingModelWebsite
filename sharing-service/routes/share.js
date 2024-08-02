const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, outfitId, recipientEmail } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'your-email@gmail.com', pass: 'your-email-password' }
  });
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: recipientEmail,
    subject: 'Check out this outfit!',
    text: `User ${userId} shared an outfit with you. Check it out!`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email');
    }
    res.send('Outfit shared successfully');
  });
});

module.exports = router;
