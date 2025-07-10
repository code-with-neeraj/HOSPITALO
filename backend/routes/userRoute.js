import express from 'express'
import { bookAppointment, cancelAppointment, getProfile, listAppintment, loginUser, logout, paymentRazorpay, registerUser, resetPassword, sendResetOtp,  updateProfile,  verifyRazorpay } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'


const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/logout',logout)


userRouter.post('/send-reset-otp', sendResetOtp);
userRouter.post('/reset-password', resetPassword);

userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image') ,authUser, updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppintment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)





export default userRouter