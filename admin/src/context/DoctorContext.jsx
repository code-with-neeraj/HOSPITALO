import { useState } from "react";
import { createContext } from "react"
import axios from "axios";
import {toast} from 'react-toastify'


export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'');
    const [appointment, setAppointment] = useState([]);

    const getAppointment = async () => {
        

        try {

            const {data} = await axios.get(backendUrl + '/api/doctor/appointments',{headers:{dToken}})
            if (data.success) {
                setAppointment(data.appointments)
                console.log(data.appointments);

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }
        
    const completeAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
            if (data.success) {
                toast.success(data.message)
                getAppointment()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
            if (data.success) {
                toast.success(data.message)
                getAppointment()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        dToken,
        setDToken,
        backendUrl,
        appointment,
        setAppointment,
        getAppointment,
        completeAppointment,
        cancelAppointment
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider