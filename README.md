# 🏥 Hospitalo Project Documentation

> 🚀 Hospitalo is a modern, full-stack hospital management platform designed to streamline healthcare operations. It offers secure authentication, real-time appointment booking, analytics dashboards, online payments, and a beautiful, responsive UI for Admins, Doctors, and Patients.

Welcome to the **Hospitalo** platform!  
This documentation covers the Admin Panel, Backend API, and Frontend Panel, with colorful icons and clear headings for each section.

---

- Live link For User:- https://hospitalo-yjlj.onrender.com/
- Live link For Admin:- https://hospitalo-admin.onrender.com/doctor-appointments

---

## 🛠️ Tech Stack

| Technology   | Icon                                                                 |
|--------------|----------------------------------------------------------------------|
| Node.js      | ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge) |
| Express.js   | ![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge) |
| MongoDB      | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge) |
| React        | ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&style=for-the-badge) |
| Vite         | ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=FFD62E&style=for-the-badge) |
| TailwindCSS  | ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge) |
| Axios        | ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white&style=for-the-badge) |
| JWT          | ![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white&style=for-the-badge) |
| Razorpay     | ![Razorpay](https://img.shields.io/badge/Razorpay-02042B?logo=razorpay&logoColor=white&style=for-the-badge) |
| Cloudinary   | ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white&style=for-the-badge) |

---

## 🚀 Features Overview

- 👨‍⚕️ **Doctor Management**: Add, edit, and manage doctor profiles, specialities, and availability.  
- 📅 **Appointment Oversight**: View, approve, or cancel patient appointments with real-time updates.  
- 📊 **Analytics Dashboard**: Visualize key metrics: total doctors, appointments, and patients.  
- 🔒 **Secure Login**: Separate authentication for Admins and Doctors.  
- ☁️ **Image Upload**: Upload doctor profile images securely.  
- 🩺 **Browse Doctors**: Patients can find and filter doctors by speciality and availability.  
- 💳 **Online Payments**: Securely pay for appointments using integrated payment gateways.  
- 🔔 **Notifications**: Real-time updates for confirmations, reminders, and more.  
- ✉️ **Feedback / Contact Support**: Users can send feedback or contact support from the frontend (footer). Supports both authenticated (sends userId) and anonymous feedback (name + email).  
- 👤 **Profile Management**: Update personal details and manage health information.

---

## 📁 Folder Structure

```
admin/      # Admin Panel (React)
backend/    # Backend API (Node.js, Express.js)
fronted/    # Frontend Panel (React)
```

---

## 📡 API Endpoints (Backend)

### 👤 User APIs (`/api/user`)
- `POST /register` — Register a new user  
  **Request:**  
  ```json
  { "name": "John Doe", "email": "john@example.com", "password": "yourpassword" }
  ```
  **Response:**  
  ```json
  { "success": true, "token": "jwt_token_here", "user": { "id": "user_id", "name": "John Doe", "email": "john@example.com" } }
  ```

- `POST /login` — User login  
  **Request:**  
  ```json
  { "email": "john@example.com", "password": "yourpassword" }
  ```
  **Response:**  
  ```json
  { "success": true, "token": "jwt_token_here" }
  ```

- `GET /get-profile` — Get user profile (auth required)  
  **Headers:** `{ token: <jwt_token> }`  
  **Response:**  
  ```json
  { "success": true, "userData": { ... } }
  ```

- `POST /book-appointment` — Book an appointment (auth)  
  **Request:**  
  ```json
  { "doctorId": "doctor_id", "date": "2024-06-10", "time": "10:00" }
  ```
  **Response:**  
  ```json
  { "success": true, "appointment": { ... } }
  ```

- `POST /send-feedback` — Send feedback / contact support  
  **Route:** `/api/user/send-feedback` (see router: backend/routes/userRoute.js)  
  **Description:** Allows users to submit feedback. Works for:
  - Authenticated users: include header `token` and provide `userId` or backend reads from token. Feedback is saved to user document (if user exists) and emailed to support.
  - Anonymous users: provide `name`, `email`, and `message`.
  **Headers:** Optional for anonymous; provide `token` when logged in.  
  **Request (authenticated):**
  ```json
  { "userId": "user_id", "message": "Found a bug in booking flow." }
  ```
  **Request (anonymous):**
  ```json
  { "name": "Rahul Sharma", "email": "rahul@example.com", "message": "UI is slow on mobile." }
  ```
  **Response (success):**
  ```json
  { "success": true, "message": "Feedback submitted successfully" }
  ```
  **Notes:**
  - Backend will attempt to send email to SUPPORT_EMAIL (or SENDER_EMAIL) and optionally send an acknowledgement email to the sender if an email address is provided.
  - In production, long SMTP calls can cause timeouts. The backend can be configured to respond immediately and send email in background or use transactional email APIs (SendGrid/Mailgun) for reliability.

---

### 👨‍⚕️ Doctor APIs (`/api/doctor`)
- `POST /login` — Doctor login  
- `GET /appointments` — Doctor's appointments (auth)  
- `POST /complete-appointment` — Mark appointment as complete (auth)  
- `POST /cancel-appointment` — Cancel appointment (auth)  
- `GET /dashboard` — Doctor dashboard stats (auth)  
- `GET /profile` — Get doctor profile (auth)  
- `POST /update-profile` — Update doctor profile (auth)

---

### 🛡️ Admin APIs (`/api/admin`)
- `POST /login` — Admin login  
  **Request:**  
  ```json
  { "email": "admin@example.com", "password": "adminpassword" }
  ```
  **Response:**  
  ```json
  { "success": true, "token": "admin_jwt_token" }
  ```

- `POST /add-doctor` — Add a new doctor (auth, file upload)  
- `POST /all-doctors` — List all doctors (auth)  
- `POST /change-availability` — Change doctor availability (auth)  
- `GET /appointments` — List all appointments (auth)  
- `POST /cancel-appointment` — Cancel appointment (auth)  
- `GET /dashboard` — Admin dashboard stats (auth)

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

> _Empowering healthcare_
