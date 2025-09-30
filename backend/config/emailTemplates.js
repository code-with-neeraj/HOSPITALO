export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Email Verify</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #22D172;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 50% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Verify your email
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          You are just one step away to verify your account for this email: <span style="color: #4C83EE;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use below OTP to verify your account.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button" >{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          This OTP is valid for 24 hours.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', sans-serif;
      background-color: #f4f6f8;
      color: #333;
    }
    .container {
      max-width: 520px;
      margin: 50px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 12px rgba(0,0,0,0.08);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      color: white;
      text-align: center;
      padding: 30px 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 30px 20px;
    }
    .content h2 {
      margin-top: 0;
      color: #1e293b;
      font-size: 20px;
    }
    .content p {
      font-size: 15px;
      line-height: 1.6;
    }
    .otp-box {
      margin: 20px auto;
      background: #22d3ee;
      color: white;
      font-weight: bold;
      font-size: 18px;
      padding: 14px 0;
      border-radius: 8px;
      text-align: center;
      width: 100%;
      letter-spacing: 2px;
    }
    .footer {
      padding: 20px;
      text-align: center;
      font-size: 13px;
      color: #777;
    }
    @media only screen and (max-width: 600px) {
      .container {
        margin: 20px;
      }
      .content h2 {
        font-size: 18px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>
    <div class="content">
      <h2>Hello,</h2>
      <p>We received a request to reset the password for your account associated with:</p>
      <p><strong>{{email}}</strong></p>
      <p>Use the OTP below to reset your password:</p>
      <div class="otp-box">{{otp}}</div>
      <p>This OTP is valid for the next <strong>15 minutes</strong>. If you did not request a password reset, please ignore this message.</p>
    </div>
    <div class="footer">
      &copy; 2025 Hospitalo. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const CONFIRMATION_TEMPLATE_USER = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Appointment Confirmed</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f8fa;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 500px;
      margin: 0 auto;
      background: rgba(128, 128, 128, 0.17);
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .header {
      background: linear-gradient(135deg, #0ea5e9, #38bdf8);
      color: white;
      padding: 20px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 30px;
      color: #333;
    }
    .content h2 {
      color: #1e293b;
    }
    .info {
      margin: 20px 0;
      font-size: 16px;
      line-height: 1.6;
    }
    .info p {
      margin: 8px 0;
    }
    .icon {
      margin-right: 8px;
    }
    .footer {
      text-align: center;
      font-size: 13px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Hospitalo</h1>
    </div>
    <div class="content">
      <h2>Appointment Confirmed </h2>
      <p>Dear {{name}},</p>
      <p>We are pleased to inform you that your appointment has been successfully booked. Here are the details:</p>

      <div class="info">
        <p><span class="icon">👨‍⚕️</span><strong>{{doctorName}}</strong></p>
        <p><span class="icon">📅</span>{{slotDate}}</p>
        <p><span class="icon">⏰</span>{{slotTime}}</p>
      </div>

      <p>If you have any questions or wish to reschedule, feel free to contact us.</p>
      <p>Best regards,<br/><strong>Hospitalo</strong></p>
    </div>
    <div class="footer">
      <p>This is a confirmation email from <br> Hospitalo.</p>
      <p> &copy; 2025 Hospitalo. All rights reserved.</p>
    </div>
  </div>
</body>
</html>

`

export const CANCELLATION_TEMPLATE_USER = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Appointment Cancelled</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f8fa;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 500px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .header {
      background: linear-gradient(135deg, #0ea5e9, #38bdf8);
      color: white;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 30px 25px;
      color: #333333;
    }
    .content h2 {
      color: #e11d48;
      margin-bottom: 10px;
    }
    .content p {
      font-size: 15px;
      line-height: 1.6;
      margin: 10px 0;
    }
    .info {
      margin: 20px 0;
      padding: 15px;
      background: #f1f5f9;
      border-radius: 8px;
    }
    .info p {
      margin: 8px 0;
      font-size: 15px;
    }
    .icon {
      margin-right: 6px;
    }
    .footer {
      text-align: center;
      font-size: 13px;
      color: #777;
      padding: 15px;
      background-color: #f9fafb;
      border-top: 1px solid #e2e8f0;
    }

    @media only screen and (max-width: 600px) {
      .email-container {
        margin: 10px;
        border-radius: 0;
      }
      .content {
        padding: 20px 15px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Hospitalo</h1>
    </div>
    <div class="content">
      <h2>Appointment Cancelled</h2>
      <p>Dear {{name}},</p>
      <p>We regret to inform you that your appointment has been cancelled. Here are the details:</p>

      <div class="info">
        <p><span class="icon">👨‍⚕️</span><strong>{{doctorName}}</strong></p>
        <p><span class="icon">📅</span><strong>{{slotDate}}</strong></p>
        <p><span class="icon">⏰</span><strong>{{slotTime}}</strong></p>
      </div>

      <p>If you have any questions or wish to reschedule, feel free to contact us.</p>
      <p>Best regards,<br/><strong>Hospitalo Team</strong></p>
    </div>
    <div class="footer">
      <p> This is a cancellation email from Hospitalo.</p>
      <p> &copy; 2025 Hospitalo. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;


export const CONFIRMATION_TEMPLATE_DOCTOR = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Appointment Confirmed By Doctor</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f8fa;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 500px;
      margin: 0 auto;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .header {
      background: linear-gradient(135deg, #0ea5e9, #38bdf8);
      color: white;
      padding: 20px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 30px;
      color: #333;
    }
    .content h2 {
      color: #1e293b;
    }
    .info {
      margin: 20px 0;
      font-size: 16px;
      line-height: 1.6;
    }
    .info p {
      margin: 8px 0;
    }
    .icon {
      margin-right: 8px;
    }
    .footer {
      text-align: center;
      font-size: 13px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Hospitalo</h1>
    </div>
    <div class="content">
      <h2>Appointment Completed</h2>
      <p>Dear {{name}},</p>
      <p>We are pleased to inform you that your appointment has been completed by doctor. Here are the details:</p>

      <div class="info">
        <p><span class="icon">👨‍⚕️</span><strong>{{doctorName}}</strong></p>
        <p><span class="icon">📅</span>{{slotDate}}</p>
        <p><span class="icon">⏰</span>{{slotTime}}</p>
      </div>

      <p>If you have any questions or wish to reschedule, feel free to contact us.</p>
      <p>Best regards,<br/><strong>Hospitalo Team</strong></p>
    </div>
    <div class="footer">
      <p>This is a confirmation email from <br> Hospitalo.</p>
      <p> &copy; 2025 Hospitalo. All rights reserved.</p>
    </div>
  </div>
</body>
</html>

`;

export const CANCELLATION_TEMPLATE_DOCTOR = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Appointment Cancelled by Doctor</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f8fa;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 500px;
      margin: 0 auto;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .header {
      background: linear-gradient(135deg, #0ea5e9, #38bdf8);
      color: white;
      padding: 20px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 30px;
      color: #333;
    }
    .content h2 {
      color: #1e293b;
    }
    .info {
      margin: 20px 0;
      font-size: 16px;
      line-height: 1.6;
    }
    .info p {
      margin: 8px 0;
    }
    .icon {
      margin-right: 8px;
    }
    .footer {
      text-align: center;
      font-size: 13px;
      color: #777;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Hospitalo</h1>
    </div>
    <div class="content">
      <h2>Appointment Cancelled</h2>
      <p>Dear {{name}},</p>
      <p>We regret to inform you that your appointment has been cancelled by the doctor. Here are the details:</p>

      <div class="info">
        <p><span class="icon">👨‍⚕️</span><strong>{{doctorName}}</strong></p>
        <p><span class="icon">📅</span>{{slotDate}}</p>
        <p><span class="icon">⏰</span>{{slotTime}}</p>
      </div>
      
      <p>If you have any questions or wish to reschedule, feel free to contact us.</p>
      <p>Best regards,<br/><strong>Hospitalo Team</strong></p>
    </div>
    <div class="footer">
      <p>This is a cancellation notification from <br> Hospitalo.</p>
      <p> &copy; 2025 Hospitalo. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;


export const PAYMENT_RECEIPT_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Payment Receipt</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f4f4f4;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: white;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }
    h2 {
      color: #4CAF50;
    }
    ul {
      line-height: 1.6;
    }
    .footer {
      margin-top: 30px;
      font-size: 13px;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🧾 Payment Receipt</h2>
    <p>Hi <strong>{{userName}}</strong>,</p>
    <p>Your payment has been successfully processed for your appointment.</p>

    <h3>Appointment Summary:</h3>
    <ul>
      <li><strong>Doctor:</strong>{{doctorName}} ({{speciality}})</li>
      <li><strong>Date:</strong> {{slotDate}}</li>
      <li><strong>Time:</strong> {{slotTime}}</li>
      <li><strong>Amount Paid:</strong> ₹{{amount}}</li>
      <li><strong>Payment ID:</strong> {{paymentId}}</li>
    </ul>

    <p>We look forward to seeing you soon! 🙌</p>

    <div class="footer">
      Thank you for choosing <strong>Hospitalo</strong>.
    </div>
  </div>
</body>
</html>
`;

export const FEEDBACK_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Feedback Received</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f8fa;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 500px;
      margin: 0 auto;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .header {
      background: linear-gradient(135deg, #0ea5e9, #38bdf8);
      color: white;
      padding: 20px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 30px;
      color: #333;
    }
    .content h2 {
      color: #1e293b;
    }
    .info {
      margin: 20px 0;
      font-size: 16px;
      line-height: 1.6;
    }
    .info p {
      margin: 8px 0;
    }
    .icon {
      margin-right: 8px;
    }
    .footer {
      text-align: center;
      font-size: 13px;
      color: #777;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Hospitalo</h1>
    </div>
    <div class="content">
      <h2>New Feedback Received</h2>
      <p>Dear Admin,</p>
      <p>You have received new feedback from a user. Here are the details:</p>

      <div class="info">
        <p><span class="icon">👤</span><strong>Name:</strong> {{name}}</p>
        <p><span class="icon">📧</span><strong>Email:</strong> {{email}}</p>
        <p><span class="icon">📝</span><strong>Feedback:</strong> {{message}}</p>
        <p><span class="icon">📅</span><strong>Date:</strong> {{date}}</p>
      </div>

      <p>Best regards,<br/><strong>Hospitalo Team</strong></p>
    </div>
    <div class="footer">
      <p>This is a feedback notification from <br> Hospitalo.</p>
      <p> &copy; 2025 Hospitalo. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
