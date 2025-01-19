import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { validateEmail } from "../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoArrowRight } from "react-icons/go";
import { authActions } from "../store/auth";
import axios from "axios";
import RAS_logo from "../assets/ras_logo.svg";

const Login = () => {
  const [emailValid, setEmailValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value.toLowerCase();
    const password = e.target[1].value;
    if (!validateEmail(email)) {
      setEmailValid(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true, // This ensures cookies are sent and received
        }
      );
      console.log(await response);
      if (response.data.success) {
        dispatch(authActions.login());
        navigate("/temp");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // Backend responded with an error
        alert(error.response.data.message);
        console.error("Backend error:", error.response.data);
        setErrorMessage(error.response.data.message || "An error occurred.");
      } else if (error.request) {
        // No response received
        console.error("No response received:", error.request);
        setErrorMessage("No response from server. Please try again.");
      } else {
        // Something else went wrong
        console.error("Error:", error.message);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-montserrat overflow-y-hidden fixed inset-0">
      <div className="flex items-center justify-between p-4">
        <img src={RAS_logo} alt="RAS" className=" h-16" />
        <Link
          className="flex items-center gap-1 flex-row underline  "
          to="/register"
        >
          Sign up <GoArrowRight />
        </Link>
      </div>
      {/* Welcome Section
      <div className="flex font-medium font-montserrat text-2xl text-white flex-col items-center justify-center absolute top-[25%] left-0 right-0">
        <p>Welcome</p>
        <p>to</p>
        <p className="text-4xl">My Garage</p>
      </div> */}
      {/* Login Form */}
      <form
        className="md:left-[40%]
          p-6 rounded-t-2xl md:w-[25rem] w-full h-full flex flex-col justify-between"
        onSubmit={handleLogin}
      >
        <div className="flex flex-col gap-6">
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
          <Link className="text-sm underline" to="/forgot-password">
            Forgot Password?
          </Link>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>
        <button
          className="py-4 bottom-0 bg-[#0D4EA0] text-white rounded-full hover:bg-gray-700"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
