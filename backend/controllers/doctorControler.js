
import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from "../models/appointmentModel.js";
import sendWithBrevo from '../utils/sendWithBrevo.js'
import userModel from "../models/userModel.js";
import { CANCELLATION_TEMPLATE_DOCTOR, CONFIRMATION_TEMPLATE_DOCTOR } from "../config/emailTemplates.js";



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

            try {
                await sendWithBrevo({
                    to: userData.email,
                    subject: "Appointment Confirmed 🏁",
                    html: CONFIRMATION_TEMPLATE_DOCTOR
                        .replace("{{name}}", userData.name)
                        .replace("{{doctorName}}", appointmentData.docData.name)
                        .replace("{{slotDate}}", appointmentData.slotDate)
                        .replace("{{slotTime}}", appointmentData.slotTime),
                    senderName: 'HOSPITALO'
                });
            } catch (mailErr) {
                console.error('Brevo API send error:', mailErr?.response?.data || mailErr.message);
                 return res.json({ success: false, message: 'Failed to send email', error: mailErr?.message });
            }

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
        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        if (appointmentData.docId.toString() !== docId) {
            return res.json({ success: false, message: "Unauthorized access" });
        }

        // Cancel appointment
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Free up the slot (optional)
        const doctorData = await doctorModel.findById(docId);
        const userData = await userModel.findById(appointmentData.userId);

        let slots_booked = doctorData.slots_booked;
        const { slotDate, slotTime } = appointmentData;

        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
            if (slots_booked[slotDate].length === 0) delete slots_booked[slotDate];
        }

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        // Send cancellation email to user
        try {
            await sendWithBrevo({
                to: userData.email,
                subject: "Appointment Cancelled ❌",
                html: CANCELLATION_TEMPLATE_DOCTOR
                    .replace("{{name}}", userData.name)
                    .replace("{{doctorName}}", doctorData.name)
                    .replace("{{slotDate}}", slotDate)
                    .replace("{{slotTime}}", slotTime),
                senderName: 'HOSPITALO'
            });
        } catch (mailErr) {
            console.error('Brevo API send error:', mailErr?.response?.data || mailErr.message);
            return res.json({ success: false, message: 'Failed to send email', error: mailErr?.message });
        }

        return res.json({ success: true, message: 'Appointment cancelled.' });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
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
        const { docId, fees, address, available, email } = req.body;
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available, email });
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
