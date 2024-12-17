const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002;
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/send-outfit', async (req, res) => {
    const { email, outfitImage, outfitDetails } = req.body;

    if (!email || !outfitImage || !outfitDetails) {
        return res.status(400).send('Missing required fields: email, outfit image, or outfit details');
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Check out this Outfit!',
            text: `Here are the details of the outfit you created: ${outfitDetails}`,
            attachments: [
                {
                    filename: 'outfit.png',
                    content: outfitImage.split(',')[1],
                    encoding: 'base64'
                }
            ]
        };

        const info = await transporter.sendMail(mailOptions);
        res.send('Outfit shared successfully');
    } catch (error) {
        res.status(500).send(`Error sending outfit: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
