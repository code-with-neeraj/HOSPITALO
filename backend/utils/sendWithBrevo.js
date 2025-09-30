import axios from 'axios';

const sendWithBrevo = async ({ to, subject, text, html, senderName }) => {
  if (!process.env.BREVO_API_KEY) throw new Error('Missing BREVO_API_KEY env');
  const payload = {
    sender: { email: process.env.SENDER_EMAIL, name: senderName || 'HOSPITALO' },
    to: [{ email: to }],
    subject,
    textContent: text,
    htmlContent: html
  };

  const resp = await axios.post('https://api.brevo.com/v3/smtp/email', payload, {
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json'
    },
    timeout: 15000
  });

  return resp.data;
};

export default sendWithBrevo;