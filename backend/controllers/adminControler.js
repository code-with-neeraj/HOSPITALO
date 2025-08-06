import validator from "validator"
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"


// API for adding doctor
const addDoctor = async (req, res) => {

    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file


        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong format
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        if (!imageFile) {
            return res.json({ success: false, message: "Image file is required" });
        }

        // upload image to cloudinary

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url



        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: "Doctor Added" })



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

// API For admin Login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// API to get all patients list for admin panel
const allPatients = async (req, res) => {
    try {
        const patients = await userModel.find({}).select('-password');
        res.json({ success: true, patients });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to delete a doctor
const deleteDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;

        // Check if doctor exists
        const doctor = await doctorModel.findById(doctorId);
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        // Delete doctor's image from Cloudinary if exists
        if (doctor.image) {
            const publicId = doctor.image.split('/').pop().split('.')[0]; // Extract public ID from URL
            await cloudinary.uploader.destroy(publicId);
        }

        // Find and cancel all related appointments
        const appointments = await appointmentModel.find({ docId: doctorId });
        for (const appointment of appointments) {
            await appointmentModel.findByIdAndUpdate(appointment._id, { cancelled: true });
        }

        // Delete the doctor
        await doctorModel.findByIdAndDelete(doctorId);

        res.json({ success: true, message: "Doctor and related appointments handled successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}




//API to get all appointments list
const appointmentAdmin = async (req, res) => {

    try {

        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for appointment cancellation
const appointmentCancel = async (req, res) => {

    try {

        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

      
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        // releasing doctor slot

        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled' })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API  to get dashboard data for admin panel
const adminDashboard = async (req, res)=> {

    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})

        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }


}

// API to delete an appointment
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if appointment exists
    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Release doctor slot
    const { docId, slotDate, slotTime } = appointment;
    const doctor = await doctorModel.findById(docId);
    if (doctor) {
      let slots_booked = doctor.slots_booked;
      slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }

    // Delete the appointment
    await appointmentModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Appointment deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin, allDoctors, allPatients, appointmentAdmin, appointmentCancel, adminDashboard , deleteDoctor, deleteAppointment };