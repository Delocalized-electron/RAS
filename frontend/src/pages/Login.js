import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { validateEmail } from "../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";

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
        navigate("/");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      alert(error);
      console.log(error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-montserrat bg-[#8671ff] overflow-y-hidden fixed inset-0">
      <Link
        className=" right-5 top-2 underline text-white absolute"
        to="/register"
      >
        Sign up
        <span className=""> </span>
      </Link>
      {/* Welcome Section */}
      <div className="flex font-medium font-montserrat text-2xl text-white flex-col items-center justify-center absolute top-[25%] left-0 right-0">
        <p>Welcome</p>
        <p>to</p>
        <p className="text-4xl">My Garage</p>
      </div>

      {/* Login Form */}
      <form
        className="fixed md:left-[40%]
         bottom-0 p-6 rounded-t-2xl md:w-[25rem] w-full flex flex-col gap-5 bg-white shadow-lg"
        onSubmit={handleLogin}
      >
        <InputField
          type="text"
          placeholder="Razzaqautogarage@gmail.com"
          label="Email"
        />
        {!emailValid && (
          <p className="text-red-500 text-sm">Please enter a valid email</p>
        )}
        <InputField type="password" placeholder="*********" label="Password" />
        <Link className="text-sm underline" to="/forgot-password">
          Forgot Password?
        </Link>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <button
          className="py-4 bg-[#3212E8] text-white rounded-full hover:bg-gray-700"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
