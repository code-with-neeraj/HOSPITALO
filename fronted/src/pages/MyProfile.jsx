// Import React and useContext, useState hooks
import React, { useContext, useState } from "react";
// Import AppContext to access global state and functions
import { AppContext } from "../context/AppContext";
// Import axios for HTTP requests
import axios from "axios";
// Import toast for showing notifications
import { toast } from "react-toastify";
// Import assets for images/icons
import { assets } from "../assets/assets";

// Define the MyProfile functional component
const MyProfile = () => {
  // State to track if the profile is in edit mode
  const [isEdit, setIsEdit] = useState(false);

  // State to store the selected image file (for profile picture)
  const [image, setImage] = useState(false);

  // Destructure token, backendUrl, userData, setUserData, and loadUserProfileData from AppContext
  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);

  // Function to update user profile data using API
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData(); // Create a new FormData object for file upload

      formData.append("name", userData.name); // Append name to form data
      formData.append("phone", userData.phone); // Append phone to form data
      formData.append("address", JSON.stringify(userData.address)); // Append address as JSON string
      formData.append("gender", userData.gender); // Append gender to form data
      formData.append("dob", userData.dob); // Append date of birth to form data

      image && formData.append("image", image); // If an image is selected, append it to form data

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      ); // Send POST request to update profile

      if (data.success) {
        toast.success(data.message); // Show success message
        await loadUserProfileData(); // Reload user profile data
        setIsEdit(false); // Exit edit mode
        setImage(false); // Reset image state
      } else {
        toast.error(data.message); // Show error message
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message); // Show error message
    }
  };

  return userData ? (
    <div className="max-w-lg flex flex-col gap-2 text-sm pt-5">
      {isEdit ? (
        // If isEdit is true, show input for editing profile image
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img
              className="w-36 rounded opacity-75"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt=""
            />
            <img
              className="w-10 absolute bottom-12 right-12"
              src={image ? "" : assets.upload_icon}
              alt=""
            />
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      ) : (
        // If isEdit is false, show profile image
        <img className="w-36 rounded" src={userData.image} alt="" />
      )}
      {isEdit ? (
        // If isEdit is true, show input for editing name
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60"
          type="text"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
          value={userData.name}
        />
      ) : (
        // If isEdit is false, show name as plain text
        <p className="font-medium text-3xl text-[#262626] mt-4">
          {userData.name}
        </p>
      )}
      <hr className="bg-[#ADADAD] h-[1px] border-none" />{" "}
      {/* Horizontal line separator */}
      <div>
        <p className="text-gray-600 underline mt-3">CONTACT INFORMATION</p>{" "}
        {/* Section heading */}
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
          <p className="font-medium">Email id:</p> {/* Email label */}
          <p className="text-blue-500">{userData.email}</p> {/* Email value */}
          <p className="font-medium">Phone:</p> {/* Phone label */}
          {isEdit ? (
            // If isEdit is true, show input for editing phone
            <input
              className="bg-gray-50 max-w-52"
              type="text"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              value={userData.phone}
            />
          ) : (
            // If isEdit is false, show phone as plain text
            <p className="text-blue-500">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p> {/* Address label */}
          {isEdit ? (
            // If isEdit is true, show inputs for editing address lines
            <p>
              <input
                className="bg-gray-50"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
              />{" "}
              {/* Address line 1 input */}
              <br />
              <input
                className="bg-gray-50"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
              />{" "}
              {/* Address line 2 input */}
            </p>
          ) : (
            // If isEdit is false, show address as plain text
            <p className="text-gray-500">
              {userData.address.line1} <br /> {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-[#797979] underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600">
          <p className="font-medium">Gender:</p>

          {isEdit ? (
            <select
              className="max-w-20 bg-gray-50"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-500">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>

          {isEdit ? (
            <input
              className="max-w-28 bg-gray-50"
              type="date"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userData.dob}
            />
          ) : (
            <p className="text-gray-500">{userData.dob}</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        {isEdit ? (
          // If isEdit is true, show "Save information" button
          <button
            onClick={updateUserProfileData}
            className="border border-primary px-8 py-2 rounded-full hover:bg-[#5f6FFF] hover:text-white transition-all"
          >
            Save information
          </button>
        ) : (
          // If isEdit is false, show "Edit" button
          <button
            onClick={() => setIsEdit(true)}
            className="border border-primary px-8 py-2 rounded-full hover:bg-[#5f6FFF] hover:text-white transition-all"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  ) : null;
};

export default MyProfile;
