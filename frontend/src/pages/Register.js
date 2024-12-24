import React from "react";
import { GoArrowRight } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { validateEmail } from "../utils/validation";
import { useEffect, useState } from "react";
import axios from "axios";
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
      alert(error);
      console.log(error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-montserrat bg-[#8671ff] overflow-y-hidden fixed inset-0">
      <Link
        className="flex items-center gap-1 flex-row right-5 top-2 underline text-white absolute"
        to="/register"
      >
        Login <GoArrowRight />
      </Link>
      <div className="flex font-medium font-montserrat text-2xl text-white flex-col items-center justify-center absolute top-[25%] left-0 right-0">
        <p>Create an account</p>
      </div>

      {/* Login Form */}
      <form
        className="fixed md:left-[40%]
         bottom-0 p-6 rounded-t-2xl md:w-[25rem] w-full flex flex-col gap-5 bg-white shadow-lg"
        onSubmit={handleRegister}
      >
        <InputField type="text" placeholder="Ubed Khatri" label="Full Name" />
        <InputField
          type="text"
          placeholder="Razzaqautogarage@gmail.com"
          label="Email"
        />
        {!emailValid && (
          <p className="text-red-500 text-sm">Please enter a valid email</p>
        )}
        <InputField type="password" placeholder="*********" label="Password" />

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <button
          className="py-4 bg-[#3212E8] text-white rounded-full hover:bg-gray-700"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
