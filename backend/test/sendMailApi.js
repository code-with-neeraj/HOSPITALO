import 'dotenv/config';
import sendWithBrevo from '../utils/sendWithBrevo.js';

(async () => {
  try {
    const resp = await sendWithBrevo({
      to: process.env.SENDER_EMAIL,
      subject: 'API test',
      text: 'API test body',
      html: '<p>API test body</p>'
    });
    console.log('API send success:', resp);
  } catch (err) {
    console.error('API send failed:', err?.response?.data || err?.message);
  }
})();