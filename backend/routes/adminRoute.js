import express from "express";
import { addDoctor, adminDashboard, allDoctors, appointmentAdmin, appointmentCancel, loginAdmin } from "../controllers/adminControler.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailablity } from "../controllers/doctorControler.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailablity)
adminRouter.get('/appointments',authAdmin,appointmentAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)


export default adminRouter