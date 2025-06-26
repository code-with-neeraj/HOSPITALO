# Prescripto Backend

This is the backend for the Prescripto healthcare appointment and management system. It is built with **Node.js**, **Express.js**, **MongoDB**, and uses **dotenv** for environment configuration.

---

## Features

- User registration and login with JWT authentication
- Doctor registration (admin), login, and profile management
- Appointment booking, cancellation, and payment (Razorpay integration)
- Admin dashboard for managing doctors and appointments
- RESTful API structure with input validation and error handling
- File upload support (profile images) via Multer and Cloudinary

---

## Project Structure

```
backend/
│   .env
│   package.json
│   server.js
│
├── config/
│   cloudinary.js
│   mongodb.js
│
├── controllers/
│   adminControler.js
│   doctorControler.js
│   userController.js
│
├── middlewares/
│   authAdmin.js
│   authDoctor.js
│   authUser.js
│   multer.js
│
├── models/
│   appointmentModel.js
│   doctorModel.js
│   userModel.js
│
└── routes/
    adminRoute.js
    doctorRoute.js
    userRoute.js
```

---

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the `backend/` directory with the following keys:
   ```
   MONGODB_URI=mongodb://localhost:27017
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET_KEY=your_cloudinary_secret
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=adminpassword
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   CURRENCY=INR
   PORT=4000
   ```

3. **Start the server:**
   ```sh
   npm run server
   ```
   The server will run on the port specified in `.env` (default: 4000).

---

## API Endpoints

### User APIs (`/api/user`)
- `POST /register` — Register a new user
- `POST /login` — User login
- `GET /get-profile` — Get user profile (auth required)
- `POST /update-profile` — Update user profile (auth, file upload)
- `POST /book-appointment` — Book an appointment (auth)
- `GET /appointments` — List user appointments (auth)
- `POST /cancel-appointment` — Cancel an appointment (auth)
- `POST /payment-razorpay` — Initiate Razorpay payment (auth)
- `POST /verifyRazorpay` — Verify Razorpay payment (auth)

### Doctor APIs (`/api/doctor`)
- `GET /list` — List all doctors
- `POST /login` — Doctor login
- `GET /appointments` — Doctor's appointments (auth)
- `POST /complete-appointment` — Mark appointment as complete (auth)
- `POST /cancel-appointment` — Cancel appointment (auth)
- `GET /dashboard` — Doctor dashboard stats (auth)
- `GET /profile` — Get doctor profile (auth)
- `POST /update-profile` — Update doctor profile (auth)

### Admin APIs (`/api/admin`)
- `POST /login` — Admin login
- `POST /add-doctor` — Add a new doctor (auth, file upload)
- `POST /all-doctors` — List all doctors (auth)
- `POST /change-availability` — Change doctor availability (auth)
- `GET /appointments` — List all appointments (auth)
- `POST /cancel-appointment` — Cancel appointment (auth)
- `GET /dashboard` — Admin dashboard stats (auth)

---

## Middlewares

- **authUser**: JWT authentication for users ([middlewares/authUser.js](middlewares/authUser.js))
- **authDoctor**: JWT authentication for doctors ([middlewares/authDoctor.js](middlewares/authDoctor.js))
- **authAdmin**: JWT authentication for admin ([middlewares/authAdmin.js](middlewares/authAdmin.js))
- **multer**: File upload handling ([middlewares/multer.js](middlewares/multer.js))

---

## Database Models

- **User**: [models/userModel.js](models/userModel.js)
- **Doctor**: [models/doctorModel.js](models/doctorModel.js)
- **Appointment**: [models/appointmentModel.js](models/appointmentModel.js)

---

## Notes

- All protected routes require the appropriate JWT token in the request headers.
- File uploads (profile images) are handled via Multer and stored on Cloudinary.
- Payment integration uses Razorpay for appointment payments.

---

## Visual Guide

### Tech Stack

| Technology   | Icon                                                                 |
|--------------|----------------------------------------------------------------------|
| Node.js      | ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge) |
| Express.js   | ![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge) |
| MongoDB      | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge) |
| Razorpay     | ![Razorpay](https://img.shields.io/badge/Razorpay-02042B?logo=razorpay&logoColor=white&style=for-the-badge) |
| Cloudinary   | ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white&style=for-the-badge) |
| Multer       | ![Multer](https://img.shields.io/badge/Multer-FFCA28?logo=upload&logoColor=black&style=for-the-badge) |
| JWT          | ![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white&style=for-the-badge) |

---

## Example API Requests

### User Registration

<details>
<summary>Request</summary>

```http
POST /api/user/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "yourpassword"
}
```
</details>

<details>
<summary>Response</summary>

```json
{
    "success": true,
    "token": "jwt_token_here",
    "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```
</details>

---

### Book Appointment

<details>
<summary>Request</summary>

```http
POST /api/user/book-appointment
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
    "doctorId": "doctor_id",
    "date": "2024-06-10",
    "time": "10:00"
}
```
</details>

<details>
<summary>Response</summary>

```json
{
    "success": true,
    "appointment": {
        "id": "appointment_id",
        "doctorId": "doctor_id",
        "userId": "user_id",
        "date": "2024-06-10",
        "time": "10:00"
    }
}
```
</details>

---

### Admin Add Doctor

<details>
<summary>Request</summary>

```http
POST /api/admin/add-doctor
Authorization: Bearer <admin_jwt_token>
Content-Type: multipart/form-data

{
    "name": "Dr. Smith",
    "email": "drsmith@example.com",
    "specialization": "Cardiology",
    "profileImage": "<file>"
}
```
</details>

<details>
<summary>Response</summary>

```json
{
    "success": true,
    "doctor": {
        "id": "doctor_id",
        "name": "Dr. Smith",
        "email": "drsmith@example.com",
        "specialization": "Cardiology",
        "profileImage": "cloudinary_url"
    }
}
```
</details>