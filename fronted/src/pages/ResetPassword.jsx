import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {

  const {backendUrl} = useContext(AppContext)

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);


  const inputRefs = React.useRef([])

  const handleInput = (e, index) => {
      if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus()
      }
  }

  const handleKeyDown = (e, index)=> {
      if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
        inputRefs.current[index - 1].focus()
      }
  }

   const handlePaste = (e)=>{
      const paste = e.clipboardData.getData('text')
      const pasteArray = paste.split('');
      pasteArray.forEach((char, index)=> {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char
        }
      })
    }

  const onSubmitEmail = async (e)=>{
      e.preventDefault();
      try {
        const {data} = await axios.post(backendUrl + '/api/user/send-reset-otp', {email})
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.success && setIsEmailSent(true)
      } catch (error) {
        toast.error(error.message)
      }
  }

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

   const onSubmitNewPassword = async (e) => {
    e.preventDefault();

      try {
        const { data } = await axios.post(backendUrl + "/api/user/reset-password",{ email, otp, newPassword });

        data.success ? toast.success(data.message) : toast.error(data.message);
        data.success && navigate("/login");
      } catch (error) {
        toast.error(error.message);
      }
    };


  return (
    <div className='flex items-center justify-center min-h-[65vh] px-3 sm:px-0 '>
      
      {/* enter email id */}

      {!isEmailSent && 

        <form onSubmit={onSubmitEmail} className='p-8 rounded-lg shadow-lg w-96 text-sm border text-zinc-600'>
              <h1 className=' text-2xl font-semibold text-center mb-4'>Reset password</h1>
                <p className='text-center mb-6'>Enter your registered email address</p>
                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded border'>
                  <img src={assets.mail_icon} alt="" className='w-3 h-3'/>
                  <input type="email" placeholder='Email id' className='bg-transparent outline-none text-zinc-600 text-lg' value={email} onChange={e => setEmail(e.target.value)} required/>
                </div> 
                <button  className='bg-[#5f6FFF] hover:opacity-85 cursor-pointer text-white w-full py-2 rounded-md text-base'>Submit</button> 
        </form>
      }

         {/* otp input form */}

      {!isOtpSubmitted && isEmailSent &&

         <form onSubmit={onSubmitOTP}  className='p-8 rounded-lg shadow-lg w-96 text-sm border text-zinc-600'>
              <h1 className='text-2xl font-semibold text-center mb-4'>Reset password</h1>
              <p className='text-center mb-6 '>Enter the 6-digit code sent to your email id.</p>
              <div className='flex justify-between mb-8' onPaste={handlePaste}>
                {Array(6).fill(0).map((_, index)=> (
                  <input type="text" maxLength='1' key={index} required className='w-12 h-12 bg-gray-100 text-black text-center text-xl rounded-md font-semibold' ref={e => inputRefs.current[index] = e} onInput={(e) => handleInput(e, index)} onKeyDown={(e)=> handleKeyDown(e, index)}/>
                ))}
              </div>
              <button className='bg-[#5f6FFF] hover:opacity-85 cursor-pointer text-white w-full py-2 rounded-md text-base'>Submit</button>
        </form>
      }

      {/* enter new password */}

      {isOtpSubmitted && isEmailSent && 

            <form
      onSubmit={onSubmitNewPassword}
      className='p-8 rounded-lg shadow-lg w-96 text-sm border text-zinc-600'
    >
      <h1 className='text-2xl font-semibold text-center mb-4'>New password</h1>
      <p className='text-center mb-6'>Enter the new password below</p>

      <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded border relative'>
        <img src={assets.lock_icon} alt="" className='w-3 h-3' />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder='New password'
          className='bg-transparent outline-none text-zinc-600 flex-1 text-lg'
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(prev => !prev)}
          className="absolute right-4 text-zinc-500 hover:text-zinc-800"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <button className='bg-[#5f6FFF] hover:opacity-85 cursor-pointer text-white w-full py-2 rounded-md text-base'>
        Submit
      </button>
    </form>


      }
      

    </div>
  )
}

export default ResetPassword
