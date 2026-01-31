const transporter = require('../config/email');

const sendEmail = async ({ to, subject, text, html }) => {
    const mailOptions = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to,
        subject,
        text,
        html
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
