function sentEmail(name, emailUser, numberSecret) {
    const sendGridMail = require('@sendgrid/mail');
    sendGridMail.setApiKey(process.env.API_SENDGRID);
    const message = {
        to: emailUser,
        from: process.env.EMAIL,
        subject: 'Verify 6 digit numbers',
        html: `<p>Dear ${name},</p>
        <h1>This is your verification code ${numberSecret}</h1>`,
    };
    sendGridMail.send(message);
}

module.exports = sentEmail