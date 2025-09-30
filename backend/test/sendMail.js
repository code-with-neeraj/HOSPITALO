import transporter from '../config/nodemailer.js';

(async () => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,          // must be verified sender
      to: process.env.SENDER_EMAIL,            // send to yourself to test
      replyTo: 'test-reply@example.com',       // optional
      subject: 'SMTP test',
      text: 'SMTP test body'
    });
    console.log('test send success:', info);
  } catch (err) {
    console.error('test send failed:', err);
  }
})();