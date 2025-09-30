import nodemailer from 'nodemailer'

const isProd = String(process.env.NODE_ENV).toLowerCase() === 'production';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  logger: !isProd,   // only log in dev
  debug: !isProd,    // only debug in dev
  tls: {
    rejectUnauthorized: isProd // true in prod, false in dev for debugging
  },
  connectionTimeout: 10000,
});

// verify transporter on startup
transporter.verify((err, success) => {
  if (err) console.error('SMTP verification failed:', err?.message || err);
  else console.log('SMTP transporter verified:', success);
});

export default transporter