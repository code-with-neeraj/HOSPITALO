import React, { useContext } from "react"; // Import React and useContext hook
import { assets } from "../../assets/assets"; // Import assets for images/icons
import { useState } from "react"; // Import useState for state management
import { AdminContext } from "../../context/AdminContext"; // Import AdminContext for admin state
import { toast } from "react-toastify"; // Import toast for notifications
import axios from "axios"; // Import axios for HTTP requests

// AddDoctor component: Form to add a new doctor
const AddDoctor = () => {
  // docImg: Doctor image file, setDocImg: setter for docImg
  const [docImg, setDocImg] = useState(false);
  // name: Doctor name, setName: setter for name
  const [name, setName] = useState("");
  // email: Doctor email, setEmail: setter for email
  const [email, setEmail] = useState("");
  // password: Doctor password, setPassword: setter for password
  const [password, setPassword] = useState("");
  // experience: Doctor experience, setExperience: setter for experience
  const [experience, setExperience] = useState("1 Year");
  // fees: Doctor consultation fees, setFees: setter for fees
  const [fees, setFees] = useState("");
  // about: About doctor, setAbout: setter for about
  const [about, setAbout] = useState("");
  // speciality: Doctor speciality, setSpeciality: setter for speciality
  const [speciality, setSpeciality] = useState("General physician");
  // degree: Doctor degree, setDegree: setter for degree
  const [degree, setDegree] = useState("");
  // address1: Address line 1, setAddress1: setter for address1
  const [address1, setAddress1] = useState("");
  // address2: Address line 2, setAddress2: setter for address2
  const [address2, setAddress2] = useState("");

  // Destructure backendUrl and aToken from AdminContext
  const { backendUrl, aToken } = useContext(AdminContext);

  // onSubmitHandler: Handles form submission for adding a doctor
  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      // Check if image is selected
      if (!docImg) {
        return toast.error("Image Not Selected");
      }

      // Create FormData object for sending form data
      const formData = new FormData();

      // Append all form fields to formData
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // Log form data for debugging
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      // Send POST request to add doctor
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      // Handle response
      if (data.success) {
        toast.success(data.message); // Show success toast
        setDocImg(false); // Reset image
        setName(""); // Reset name
        setPassword(""); // Reset password
        setEmail(""); // Reset email
        setAddress1(""); // Reset address1
        setAddress2(""); // Reset address2
        setDegree(""); // Reset degree
        setAbout(""); // Reset about
        setFees(""); // Reset fees
      } else {
        toast.error(data.message); // Show error toast
      }
    } catch (error) {
      toast.error(error.message); // Show error toast
      console.log(error); // Log error
    }
  };

  // Render the add doctor form
  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      {/* Form title */}
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      {/* Form container */}
      <div className="bg-white px-8 py-8 border border-gray-300 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        {/* Doctor image upload section */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Form fields section */}
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          {/* Left column fields */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            {/* Doctor name input */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border border-gray-400  rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            {/* Doctor email input */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border border-gray-400  rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            {/* Doctor password input */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border border-gray-400  rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            {/* Doctor experience select */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border border-gray-400  rounded px-3 py-2"
                name="experience"
                id="experience"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            {/* Doctor fees input */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border border-gray-400  rounded px-3 py-2"
                type="number"
                placeholder="fees"
                required
              />
            </div>
          </div>

          {/* Right column fields */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            {/* Doctor speciality select */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border border-gray-400  rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            {/* Doctor education input */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border border-gray-400  rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>

            {/* Doctor address inputs */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border border-gray-400  rounded px-3 py-2"
                type="text"
                placeholder="address 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border border-gray-400  rounded px-3 py-2"
                type="text"
                placeholder="address 2"
                required
              />
            </div>
          </div>
        </div>

        {/* About doctor textarea */}
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border border-gray-400 rounded"
            placeholder="write about doctor"
            rows={5}
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-[#5f6FFF] hover:opacity-75 cursor-pointer px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor; // Export the AddDoctor component
