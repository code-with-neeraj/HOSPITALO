# 💙 Hospitalo Frontend Panel

Welcome to the **Hospitalo Frontend Panel**!  
This is the user-facing web application for booking doctor appointments, managing profiles, and accessing healthcare services with ease.

---

## 🚀 Features

- 🩺 **Browse Doctors**  
  Find and filter doctors by speciality, availability, and more.

- 📅 **Book Appointments**  
  Schedule appointments with your preferred doctor in just a few clicks.

- 👤 **Profile Management**  
  Update your personal details, upload a profile picture, and manage your health information.

- 💳 **Online Payments**  
  Securely pay for your appointments using integrated payment gateways.

- 🔔 **Notifications**  
  Get real-time updates for appointment confirmations, reminders, and more.

- ✉️ **Feedback / Contact Support**  
  Users can send feedback or contact support directly from the footer. Supports both authenticated (sends userId) and anonymous feedback (name + email).

- 🌐 **Responsive Design**  
  Enjoy a seamless experience on desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

| Technology   | Icon                                                                 |
|--------------|----------------------------------------------------------------------|
| React        | ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&style=for-the-badge) |
| Vite         | ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=FFD62E&style=for-the-badge) |
| TailwindCSS  | ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge) |
| Axios        | ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white&style=for-the-badge) |
| React Router | ![React Router](https://img.shields.io/badge/React%20Router-CA4245?logo=react-router&logoColor=white&style=for-the-badge) |

---

## 📁 Folder Structure

```
fronted/
│   .env
│   package.json
│   tailwind.config.js
│   vite.config.js
│   index.html
│
├── public/
│   └── assets...
│
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── assets/
    ├── components/
    ├── context/
    └── pages/
```

---

## 📝 How to Use

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```

3. **Sign up or log in**  
   Create your account or log in to access all features.

---

## 📨 Feedback / Contact Support (Footer)

- Location: Footer component includes a "Send Feedback" button which opens a small form.
- Behavior:
  - If user is logged in: the frontend sends the stored `token` header and request includes `userId`.
  - If anonymous: the form accepts `name` and `email` along with the `message`.

- Endpoint (frontend uses VITE_BACKEND_URL):
  ```
  POST ${VITE_BACKEND_URL}/api/user/send-feedback
  ```

- Request body examples:

  - Authenticated user:
    ```json
    {
      "userId": "64a1b2c3d4e5f67890ab1234",
      "message": "Found a bug in booking flow."
    }
    ```

  - Anonymous:
    ```json
    {
      "name": "Rahul kumar",
      "email": "rahul@example.com",
      "message": "UI is slow on mobile."
    }
    ```

- Headers:
  - Content-Type: application/json
  - When logged in: `token: <JWT_TOKEN>` (AppContext sends this automatically)

- Notes for production:
  - The backend may send emails using SMTP. Production hosts sometimes block outbound SMTP or cause delays — the backend should respond immediately while sending email in background to avoid frontend timeouts.
  - If you see timeouts in production, verify backend env vars: SENDER_EMAIL, SENDER_PASSWORD (or use transactional email API like SendGrid), and ensure VITE_BACKEND_URL points to your live API.

- Troubleshooting:
  - If feedback form hangs in production:
    - Check browser Network tab for request URL and response status.
    - Verify VITE_BACKEND_URL is set correctly in the deployed frontend.
    - Inspect backend logs for SMTP ETIMEDOUT errors.
    - Consider switching the backend to background-send or use an email API.

---

## 🎨 UI Highlights

- **Modern, responsive design** with TailwindCSS
- **Colorful icons** for intuitive navigation
- **Sidebar and navbar** for easy access to all features
- **Real-time feedback** and notifications

---

## 📬 Contact

For support or feedback, contact:  
📧 neerajkr145518@gmail.com  
📞 +7277959834

---

> _Empowering your healthcare_
