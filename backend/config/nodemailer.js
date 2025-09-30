import nodemailer from 'nodemailer';

const isProd = String(process.env.NODE_ENV).toLowerCase() === 'production';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // STARTTLS on 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  logger: !isProd,   // dev: log, prod: no verbose logs
  debug: !isProd,
  tls: {
    rejectUnauthorized: isProd // prod: verify certs, dev: allow self-signed
  },
  connectionTimeout: 10000,
});

transporter.verify((err, success) => {
  if (err) console.error('SMTP verification failed:', err?.message || err);
  else console.log('SMTP transporter verified:', success);
});

export default transporter;