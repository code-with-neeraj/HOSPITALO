import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";
import razorpay from 'razorpay';
import transporter from "../config/nodemailer.js";
import userModel from "../models/userModel.js";
import { CANCELLATION_TEMPLATE_DOCTOR, CONFIRMATION_TEMPLATE_DOCTOR } from "../config/emailTemplates.js";

// Razorpay Instance
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ✅ Change availability
const changeAvailablity = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: 'Availability Changed' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Get doctor list (for frontend)
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Doctor Login
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });
        if (!doctor) return res.json({ success: false, message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Get all appointments for a doctor
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Mark appointment as completed
const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        const userData = await userModel.findById(appointmentData.userId);

        if (appointmentData && appointmentData.docId.toString() === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });

            // Send email to user
            await transporter.sendMail({
                from: process.env.SENDER_EMAIL,
                to: userData.email,
                subject: "Appointment Confirmed 🏁",
                html: CONFIRMATION_TEMPLATE_DOCTOR
                    .replace("{{name}}", userData.name)
                    .replace("{{doctorName}}", appointmentData.docData.name)
                    .replace("{{slotDate}}", appointmentData.slotDate)
                    .replace("{{slotTime}}", appointmentData.slotTime)
            });

            return res.json({ success: true, message: 'Appointment completed' });
        } else {
            return res.json({ success: false, message: 'Mark Failed' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Cancel appointment by doctor
const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        const userData = await userModel.findById(appointmentData.userId);

        if (!appointmentData || appointmentData.docId.toString() !== docId) {
            return res.json({ success: false, message: 'Cancellation Failed' });
        }

        // Cancel appointment
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Release doctor slot
        const doctorData = await doctorModel.findById(docId);
        const { slotDate, slotTime } = appointmentData;
        let slots_booked = doctorData.slots_booked;

        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
            await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        }

        // Send email to user
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: userData.email,
            subject: "Appointment Cancelled ❌",
            html: CANCELLATION_TEMPLATE_DOCTOR
                .replace("{{name}}", userData.name)
                .replace("{{doctorName}}", appointmentData.docData.name)
                .replace("{{slotDate}}", appointmentData.slotDate)
                .replace("{{slotTime}}", appointmentData.slotTime)
        });

        // Refund if payment exists
        if (appointmentData.payment && appointmentData.razorpay_payment_id) {
            const refund = await razorpayInstance.payments.refund(appointmentData.razorpay_payment_id, {
                amount: appointmentData.amount * 100
            });

            return res.json({
                success: true,
                message: 'Appointment cancelled. Refund will be processed within 2 working days.',
                refundDetails: refund
            });
        }

        res.json({ success: true, message: 'Appointment cancelled successfully.' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Doctor Dashboard Summary
const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body;
        const appointments = await appointmentModel.find({ docId });

        let earnings = 0;
        let patients = [];

        appointments.forEach(item => {
            if (item.isCompleted || item.payment) earnings += item.amount;
            if (!patients.includes(item.userId)) patients.push(item.userId);
        });

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Get doctor profile
const doctorProfile = async (req, res) => {
    try {
        const { docId } = req.body;
        const profileData = await doctorModel.findById(docId).select('-password');
        if (!profileData) {
            return res.json({ success: false, message: 'Doctor not found' });
        }
        res.json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// ✅ Update doctor profile
const updateDoctorProfile = async (req, res) => {
    try {
        const { docId, fees, address, available } = req.body;
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
        res.json({ success: true, message: 'Profile updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    changeAvailablity,
    doctorList,
    loginDoctor,
    appointmentsDoctor,
    appointmentComplete,
    appointmentCancel,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
};
