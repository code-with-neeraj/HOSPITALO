import express from "express";
import { addDoctor, adminDashboard, allDoctors, allPatients, appointmentAdmin, appointmentCancel, deleteAppointment, deleteDoctor, loginAdmin } from "../controllers/adminControler.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailablity } from "../controllers/doctorControler.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.get('/all-patients',authAdmin,allPatients)
adminRouter.post('/change-availability',authAdmin,changeAvailablity)
adminRouter.get('/appointments',authAdmin,appointmentAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
adminRouter.delete('/doctor/:id', authAdmin, deleteDoctor)
adminRouter.delete('/delete-appointment/:id', authAdmin, deleteAppointment)

export default adminRouter