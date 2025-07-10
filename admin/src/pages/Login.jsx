import React, { useContext, useState } from "react"; // Import React, useContext, useState
import { AdminContext } from "../context/AdminContext"; // Import AdminContext for admin state
import axios from "axios"; // Import axios for HTTP requests
import { toast } from "react-toastify"; // Import toast for notifications
import { DoctorContext } from "../context/DoctorContext"; // Import DoctorContext for doctor state
import { assets } from "../assets/assets";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Login component: Handles login for Admin and Doctor
const Login = () => {
  // state: Tracks whether Admin or Doctor login, setState: setter for state
  const [state, setState] = useState("Admin");
  // email: User email, setEmail: setter for email
  const [email, setEmail] = useState("");
  // password: User password, setPassword: setter for password
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Destructure setAToken and backendUrl from AdminContext
  const { setAToken, backendUrl } = useContext(AdminContext);
  // Destructure setDToken from DoctorContext
  const { setDToken } = useContext(DoctorContext);

  // onSubmitHandler: Handles form submission for login
  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      if (state === "Admin") {
        // Admin login request
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token); // Store admin token in localStorage
          setAToken(data.token); // Set admin token in context
        } else {
          toast.error(data.message); // Show error toast
        }
      } else {
        // Doctor login request
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token); // Store doctor token in localStorage
          setDToken(data.token); // Set doctor token in context
          console.log(data.token); // Log token
        } else {
          toast.error(data.message); // Show error toast
        }
      }
    } catch (error) {
      console.log(error); // Log error
      toast.error("Something went wrong"); // Show error toast
    }
  };

  // Render the login form
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      {/* Login form container */}
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        {/* Form title */}
        <p className="text-2xl font-semibold m-auto">
          <span className="text-[#5f6FFF]"> {state} </span> Login
        </p>
        {/* Email input */}
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded border border-zinc-300 hover:border-zinc-900">
          <img src={assets.mail_icon} alt="" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-transparent outline-none"
            type="email"
            placeholder="Email id"
            required
          />
        </div>
        {/* Password input */}
        <div className="flex items-center gap-3 w-full px-5 py-2.5 rounded border border-zinc-300 hover:border-zinc-900">
          <img src={assets.lock_icon} alt="lock" />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className=" outline-none flex-1"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-xl text-zinc-500 hover:text-zinc-800 focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {/* Login button */}
        <button className="bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {/* Toggle between Admin and Doctor login */}
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-[#5f6FFF] underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-[#5f6FFF] underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login; // Export the Login component
