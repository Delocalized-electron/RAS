import React from "react";
import { GoArrowRight } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { validateEmail } from "../utils/validation";
import { useEffect, useState } from "react";
import axios from "axios";
import RAS_logo from "../assets/ras_logo.svg";

const Register = () => {
  const [emailValid, setEmailValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Register";
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value.toLowerCase();
    const password = e.target[2].value;
    if (!validateEmail(email)) {
      setEmailValid(false);
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        {
          fullName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(await response);
      if (response.data.success) {
        navigate("/");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code outside the 2xx range
        console.error("Backend error:", error.response.data);
        const errorMessage =
          error.response.data.message || "An error occurred.";
        setErrorMessage(errorMessage); // Display the backend error message
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        setErrorMessage("No response from server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-montserrat overflow-y-hidden">
      <div className="flex items-center justify-between p-4">
        <img src={RAS_logo} alt="RAS" className="h-16" />
        <Link
          className="flex items-center gap-1 flex-row underline"
          to="/login"
        >
          Login <GoArrowRight />
        </Link>
      </div>

      {/* Login Form */}
      <form
        className="flex-grow p-6 rounded-t-2xl md:w-[25rem] w-full flex flex-col justify-between"
        onSubmit={handleRegister}
      >
        <div className="flex flex-col gap-6">
          <InputField type="text" placeholder="Ubed Khatri" label="Full Name" />
          <InputField
            type="text"
            placeholder="Razzaqautogarage@gmail.com"
            label="Email"
          />
          {!emailValid && (
            <p className="text-red-500 text-sm">Please enter a valid email</p>
          )}
          <InputField
            type="password"
            placeholder="*********"
            label="Password"
          />
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>
        <button
          className="py-4 bg-[#0D4EA0] text-white rounded-full hover:bg-gray-700"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
