const nodemailer = require('nodemailer');
const {  MAIL_EMAIL, MAIL_PASSWORD } = require('../config/config');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: MAIL_EMAIL,
        pass: MAIL_PASSWORD,
    },
});

module.exports = transporter;