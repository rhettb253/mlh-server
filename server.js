'use strict';
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const interestedInBuying = require('./modules/interestedInBuying');
const sellingTheir = require('./modules/sellingTheir');

// Create a Nodemailer transporter with SMTP settings
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const app = express();

// Allow all origins (for development purposes)
app.use(cors());
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Default route
app.get('/', (req, res) => {
    res.send('default route working');
})

// Endpoint to handle form submissions
app.post('/submitForm', (req, res) => {
    const formData = req.body;
    console.log(formData);

    // Email content
    const mailOptions = {
        from: `Rhett Beardemphl <${process.env.EMAIL}>`,
        to: formData.clientWantsTo === 'buy' ? 
            `${formData.buyer.fullName} <${formData.buyer.emailAddress}>` : 
            `${formData.seller.fullName} <${formData.seller.emailAddress}>`, // Use the email submitted in the form
        subject: 'MLH Confirmation',
        text: `Hi ${formData.clientWantsTo === 'buy' ? formData.buyer.fullName : formData.seller.fullName}!
        Thank you for contacting me through my client request form on mallorylaynehomes.com. You stated that you are looking to ${formData.clientWantsTo === 'buy' ? `buy a ${interestedInBuying(formData)}.` : `sell your ${sellingTheir(formData)}.`}`
        // You can add HTML content or attachments if needed
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.log('Error sending email: ', error);
        res.status(500).send('Error sending confirmation email');
        } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Confirmation email sent');
        }
    });
})

// Start the server
function start(port) {
    app.listen(port, console.log(`Server is running on port ${port}`))
}

module.exports = { start }