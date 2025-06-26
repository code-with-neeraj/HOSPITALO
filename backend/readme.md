# 🏥 Hospitalo Backend

Welcome to the **Hospitalo Backend**!  
This backend powers the Hospitalo healthcare platform, providing secure APIs for user, doctor, and admin operations.

---

## 🛠️ Tech Stack

| Technology   | Icon                                                                 |
|--------------|----------------------------------------------------------------------|
| Node.js      | ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge) |
| Express.js   | ![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge) |
| MongoDB      | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge) |
| JWT          | ![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white&style=for-the-badge) |
| Razorpay     | ![Razorpay](https://img.shields.io/badge/Razorpay-02042B?logo=razorpay&logoColor=white&style=for-the-badge) |
| Cloudinary   | ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white&style=for-the-badge) |
| Multer       | ![Multer](https://img.shields.io/badge/Multer-FFCA28?logo=upload&logoColor=black&style=for-the-badge) |

---

## 🚀 Features

- 👤 **User Auth**: Registration, login, profile management
- 👨‍⚕️ **Doctor Management**: Add, list, update, and manage doctors
- 📅 **Appointments**: Book, cancel, and complete appointments
- 💳 **Payments**: Razorpay integration for secure payments
- 🛡️ **Admin Panel**: Manage doctors, appointments, and analytics
- ☁️ **Image Upload**: Profile images via Multer & Cloudinary

---

## 📁 Project Structure

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

## 📡 API Endpoints & Examples

### 👤 User APIs (`/api/user`)

- **POST /register** — Register a new user  
  **Request:**  
  ```json
  { "name": "John Doe", "email": "john@example.com", "password": "yourpassword" }
  ```
  **Response:**  
  ```json
  { "success": true, "token": "jwt_token_here", "user": { "id": "user_id", "name": "John Doe", "email": "john@example.com" } }
  ```

- **POST /login** — User login  
  **Request:**  
  ```json
  { "email": "john@example.com", "password": "yourpassword" }
  ```
  **Response:**  
  ```json
  { "success": true, "token": "jwt_token_here" }
  ```

- **GET /get-profile** — Get user profile (auth required)  
  **Headers:** `{ token: <jwt_token> }`  
  **Response:**  
  ```json
  { "success": true, "userData": { ... } }
  ```

- **POST /book-appointment** — Book an appointment (auth)  
  **Request:**  
  ```json
  { "doctorId": "doctor_id", "date": "2024-06-10", "time": "10:00" }
  ```
  **Response:**  
  ```json
  { "success": true, "appointment": { "id": "appointment_id", "doctorId": "doctor_id", "userId": "user_id", "date": "2024-06-10", "time": "10:00" } }
  ```

---

### 👨‍⚕️ Doctor APIs (`/api/doctor`)

- **GET /list** — List all doctors  
  **Response:**  
  ```json
  { "success": true, "doctors": [ { "id": "doctor_id", "name": "Dr. Smith", ... } ] }
  ```

- **POST /login** — Doctor login  
  **Request:**  
  ```json
  { "email": "drsmith@example.com", "password": "yourpassword" }
  ```
  **Response:**  
  ```json
  { "success": true, "token": "doctor_jwt_token" }
  ```

- **GET /appointments** — Doctor's appointments (auth)  
  **Headers:** `{ dToken: <doctor_jwt_token> }`  
  **Response:**  
  ```json
  { "success": true, "appointments": [ ... ] }
  ```

- **POST /complete-appointment** — Mark appointment as complete (auth)  
  **Request:**  
  ```json
  { "appointmentId": "appointment_id" }
  ```
  **Response:**  
  ```json
  { "success": true, "message": "Appointment completed" }
  ```

---

### 🛡️ Admin APIs (`/api/admin`)

- **POST /login** — Admin login  
  **Request:**  
  ```json
  { "email": "admin@example.com", "password": "adminpassword" }
  ```
  **Response:**  
  ```json
  { "success": true, "token": "admin_jwt_token" }
  ```

- **POST /add-doctor** — Add a new doctor (auth, file upload)  
  **Request:**  
  `Content-Type: multipart/form-data`  
  ```
  name: "Dr. Smith"
  email: "drsmith@example.com"
  password: "yourpassword"
  speciality: "Cardiology"
  degree: "MBBS"
  experience: "5 Years"
  about: "Experienced Cardiologist"
  fees: 100
  address: '{"line1":"123 Main St","line2":"City"}'
  image: <file>
  ```
  **Response:**  
  ```json
  { "success": true, "message": "Doctor Added" }
  ```

- **POST /all-doctors** — List all doctors (auth)  
  **Headers:** `{ aToken: <admin_jwt_token> }`  
  **Response:**  
  ```json
  { "success": true, "doctors": [ ... ] }
  ```

- **GET /appointments** — List all appointments (auth)  
  **Headers:** `{ aToken: <admin_jwt_token> }`  
  **Response:**  
  ```json
  { "success": true, "appointments": [ ... ] }
  ```

---

## 🛡️ Middlewares

- **authUser**: JWT authentication for users
- **authDoctor**: JWT authentication for doctors
- **authAdmin**: JWT authentication for admin
- **multer**: File upload handling

---

## 🗄️ Database Models

- **User**: User information and credentials
- **Doctor**: Doctor profiles and availability
- **Appointment**: Appointment details and status

---

## 📬 Contact

For support or feedback, contact:  
📧 neerajkr145518@gmail.com  
📞 +7277959834

---

> _Empowering healthcare