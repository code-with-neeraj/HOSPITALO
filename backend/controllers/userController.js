import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import transporter from '../config/nodemailer.js'
import { PASSWORD_RESET_TEMPLATE, CONFIRMATION_TEMPLATE_USER, CANCELLATION_TEMPLATE_USER } from '../config/emailTemplates.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

//API to register user
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body

        if (!name || !password || !email) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter a valid email" })
        }

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        // Sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Welcome to Hospitalo',
            text: `Welcome to Hospitalo website. Your account has been created with email id: ${email}`
        }

        await transporter.sendMail(mailOptions);

        res.json({ success: true, token })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
// API  for user login
const loginUser = async (req, res) => {


    try {

        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!email || !password) {
            return res.json({ success: false, message: 'Email and password are required' })
        }

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: 'Incorrect password' });
        }

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            return res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}


const logout = async (req, res) => {

    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });
        return res.json({ success: true, message: 'Logged out' });


    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}



// Send Password Reset OTP
const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Email is required" });
    }

    try {

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000

        await user.save()

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            // text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`,
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }

        await transporter.sendMail(mailOption);

        return res.json({ success: true, message: "OTP sent to your email" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// ✅ Verify Reset OTP
export const verifyResetOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.json({ success: false, message: "Email and OTP are required" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (!user.resetOtp || user.resetOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP expired" });
        }

        return res.json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};



// 🔒 Reset Password After OTP
const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Email, OTP, and new password are required" });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (!user.resetOtp || user.resetOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP expired" });
        }

        // Update password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({ success: true, message: "Password reset successful" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};



// API to get user profile data
const getProfile = async (req, res) => {

    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to update user profile
const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {

            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book appointment
const bookAppointment = async (req, res) => {

    try {

        const { userId, docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor not available' })
        }

        let slots_booked = docData.slots_booked

        //checking for slot availablity
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available' })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        // Send appointment confirmation email
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: userData.email,
            subject: "Appointment Confirmed",
            html: CONFIRMATION_TEMPLATE_USER
                .replace("{{name}}", userData.name)
                .replace("{{doctorName}}", docData.name)
                .replace("{{slotDate}}", slotDate)
                .replace("{{slotTime}}", slotTime)
        });

        res.json({ success: true, message: 'Appointment Booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get user appointments for frontend my-appointments page
const listAppintment = async (req, res) => {

    try {

        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to cancel appointment with refund logic
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);
        const userData = await userModel.findById(userId).select('-password');

        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        if (appointmentData.userId.toString() !== userId) {
            return res.json({ success: false, message: "Unauthorized action" });
        }

        if (appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment already cancelled" });
        }

        const doctor = await doctorModel.findById(appointmentData.docId);
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        const docData = doctor; // optional alias for clarity
        const { slotDate, slotTime } = appointmentData;

        // If doctor has NOT accepted yet → Refund is allowed
        if (!appointmentData.accepted && appointmentData.payment) {
            try {
                await razorpayInstance.payments.refund(appointmentData.paymentId);
                appointmentData.refundStatus = "initiated";
                appointmentData.cancelled = true;
                await appointmentData.save();

                // Release doctor slot
                if (doctor?.slots_booked[slotDate]) {
                    doctor.slots_booked[slotDate] = doctor.slots_booked[slotDate].filter((e) => e !== slotTime);
                    await doctorModel.findByIdAndUpdate(appointmentData.docId, {
                        slots_booked: doctor.slots_booked,
                    });
                }

                // Send cancellation email (with refund)
                await transporter.sendMail({
                    from: process.env.SENDER_EMAIL,
                    to: userData.email,
                    subject: "Appointment Cancelled ❌",
                    html: CANCELLATION_TEMPLATE_USER
                        .replace("{{name}}", userData.name)
                        .replace("{{doctorName}}", docData.name)
                        .replace("{{slotDate}}", slotDate)
                        .replace("{{slotTime}}", slotTime)
                        .replace(
                            "{{refundNote}}",
                            `<p>Your payment has been refunded and will reflect in your account within 2 working days.</p>`
                        ),
                });

                return res.json({
                    success: true,
                    message: "Appointment cancelled. Refund initiated.",
                });
            } catch (refundError) {
                console.log("Refund error:", refundError);
                return res.json({ success: false, message: "Refund failed. Please contact support." });
            }
        }

        // Doctor already accepted → no refund
        appointmentData.cancelled = true;
        await appointmentData.save();

        // Release doctor slot
        if (doctor?.slots_booked[slotDate]) {
            doctor.slots_booked[slotDate] = doctor.slots_booked[slotDate].filter((e) => e !== slotTime);
            await doctorModel.findByIdAndUpdate(appointmentData.docId, {
                slots_booked: doctor.slots_booked,
            });
        }

        // Send cancellation email (no refund)
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: userData.email,
            subject: "Appointment Cancelled ❌",
            html: CANCELLATION_TEMPLATE_USER
                .replace("{{name}}", userData.name)
                .replace("{{doctorName}}", docData.name)
                .replace("{{slotDate}}", slotDate)
                .replace("{{slotTime}}", slotTime)
                .replace(
                    "{{refundNote}}",
                    `<p>Since the doctor had already accepted the appointment, no refund is applicable.</p>`
                ),
        });

        return res.json({
            success: true,
            message: "Appointment cancelled. No refund as doctor had already accepted.",
        });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};


// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {

    try {

        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment Cancelled or not found" })
        }

        // creating options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        // creation of an order
        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to verify payment of razorpay
const verifyRazorpay = async (req, res) => {

    try {

        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: "Payment Successful" })
        } else {
            res.json({ success: false, message: "Payment Failed" })

        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


export { registerUser, loginUser, logout, sendResetOtp, resetPassword, getProfile, updateProfile, bookAppointment, listAppintment, cancelAppointment, paymentRazorpay, verifyRazorpay }