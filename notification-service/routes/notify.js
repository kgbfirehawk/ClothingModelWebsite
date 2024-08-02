const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, eventType, eventDetails } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'your-email@gmail.com', pass: 'your-email-password' }
  });
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'user-email@gmail.com',
    subject: `Notification: ${eventType}`,
    text: eventDetails
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending notification');
    }
    res.send('Notification sent successfully');
  });
});

module.exports = router;
