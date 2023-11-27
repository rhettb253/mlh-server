'use strict';
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// // Create a Nodemailer transporter with SMTP settings
// const transporter = nodemailer.createTransport({
//   service: 'hotmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASSWORD
//   }
// });

// // Email content
// const mailOptions = {
//   from: `Rhett Beardemphl <${process.env.EMAIL}>`,
//   to: 'Mallory Layne <mlw918@gmail.com>', // Use the email submitted in the form
//   subject: 'Rhett Practice Confirmation Email',
//   text: 'This is a confirmation email for your form submission.'
//   // You can add HTML content or attachments if needed
// };

// // Send the email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log('Error sending email: ', error);
//     res.status(500).send('Error sending email');
//   } else {
//     console.log('Email sent: ' + info.response);
//     res.status(200).send('Email sent');
//   }
// });

const app = express();

// Allow all origins (for development purposes)
app.use(cors());
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Defaulkt route
app.get('/', (req, res) => {
    res.send('default route working');
})

// Endpoint to handle form submissions
app.post('/submitForm', (req, res) => {
  const formData = req.body;
  console.log(formData);
  res.send(formData);
})

// Start the server
function start(port) {
    app.listen(port, console.log(`Server is running on port ${port}`))
}

module.exports = { start }