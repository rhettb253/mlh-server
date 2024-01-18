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
  service: 'gmail',
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
        from: `Mallory Layne Weitz <${process.env.EMAIL}>`,
        to: formData.clientWantsTo === 'buy' ? 
            `${formData.buyer.fullName} <${formData.buyer.emailAddress}>` : 
            `${formData.seller.fullName} <${formData.seller.emailAddress}>`, // Use the email submitted in the form
        bcc: `Mallory Layne Weitz <${process.env.EMAIL}>`,
        subject: 'MLH Confirmation',
        // for text only capable emails 
        text: `Hi ${formData.clientWantsTo === 'buy' ? formData.buyer.fullName : formData.seller.fullName}!
        Thank you for contacting me through my client request form on mallorylaynehomes.com.
        You stated that you are looking to ${formData.clientWantsTo === 'buy' ? `buy a ${interestedInBuying(formData)}.` : `sell your ${sellingTheir(formData)}.`}
        ${formData.clientWantsTo === 'buy' ? `Willing to spend: ${formData.buyer.isWillingToSpend}
        Bedrooms: ${formData.buyer.bedrooms}
        Bathrooms: ${formData.buyer.bathrooms}
        Desired areas: ${formData.buyer.desiredAreaToLive}
        ${formData.buyer.timeframe === 'Yes' ? `Timeframe: ${formData.buyer.timeframeInfo}` : 'Timeframe: No'}
        ${formData.buyer.extraInformation && `Extra info: ${formData.buyer.extraInformation}`}
        I will contact you via this email address over the next few days. Looking forward to it 😀,
        Sincerely,
            Mallory Layne Weitz`
        : `Home address: ${formData.seller.addressOfHome}
        Inferred value: ${formData.seller.believesHomeValueIs}
        Bedrooms: ${formData.seller.bedrooms}
        Bathrooms: ${formData.seller.bathrooms}
        Square footage: ${formData.seller.sqft}
        Lot size: ${formData.seller.lot}
        ${formData.seller.timeframe === 'Yes' ? `Timeframe: ${formData.seller.timeframeInfo}` : 'Timeframe: No'}
        ${formData.seller.extraInformation && `Extra info: ${formData.seller.extraInformation}`}
        I will contact you via this email address over the next few days. Looking forward to it 😀,
        Sincerely,
            Mallory Layne Weitz`}`,
        // for most emails
        html: `
        <img src="cid:headshot" alt="Description" style="float: right; width: 150px; height: auto; border-radius: 25%;"/>
        <h4>Hi ${formData.clientWantsTo === 'buy' ? formData.buyer.fullName : formData.seller.fullName}!</h4>
        <p>Thank you for contacting me through my client request form on mallorylaynehomes.com. <br/>
        You stated that you are looking to ${formData.clientWantsTo === 'buy' ? `buy a ${interestedInBuying(formData)}.` : `sell your ${sellingTheir(formData)}.`} <br/>
        ${formData.clientWantsTo === 'buy' ? `Willing to spend: ${formData.buyer.isWillingToSpend} <br/>
        Bedrooms: ${formData.buyer.bedrooms} <br/>
        Bathrooms: ${formData.buyer.bathrooms} <br/>
        Desired areas: ${formData.buyer.desiredAreaToLive} <br/>
        ${formData.buyer.timeframe === 'Yes' ? `Timeframe: ${formData.buyer.timeframeInfo}` : 'Timeframe: No'} <br/>
        ${formData.buyer.extraInformation && `Extra info: ${formData.buyer.extraInformation}`} <br/>
        I will contact you via this email address over the next few days. Looking forward to it 😀, <br/>
        Sincerely, </p>
        <p style="margin-left: 20px;">Mallory Layne Weitz - <span style="font-weight: bold;">Real Estate Broker</span></p>`
        : `Home address: ${formData.seller.addressOfHome} <br/>
        Inferred value: ${formData.seller.believesHomeValueIs} <br/>
        Bedrooms: ${formData.seller.bedrooms} <br/>
        Bathrooms: ${formData.seller.bathrooms} <br/>
        Square footage: ${formData.seller.sqft} <br/>
        Lot size: ${formData.seller.lot} <br/>
        ${formData.seller.timeframe === 'Yes' ? `Timeframe: ${formData.seller.timeframeInfo}` : 'Timeframe: No'} <br/>
        ${formData.seller.extraInformation && `Extra info: ${formData.seller.extraInformation}`} <br/>
        I will contact you via this email address over the next few days. Looking forward to it 😀, <br/>
        Sincerely,</p>
        <p style="margin-left: 20px;">Mallory Layne Weitz - <span style="font-weight: bold;">Real Estate Broker</span>`}</p>`,
        attachments: [{
            filename: 'realitorimg.jpeg',
            path: './realitorimg.jpeg',
            cid: 'headshot'
        }]
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