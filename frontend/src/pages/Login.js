import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { validateEmail } from "../utils/validation";

const Login = () => {
  const [emailValid, setEmailValid] = useState(true);

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (!validateEmail(email)) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
      console.log(email + " " + password);
    }
  };

  return (
    <div className="flex flex-col min-h-screen  relative">
      {/* Welcome Section */}
      <div className="flex font-medium font-montserrat text-2xl text-white flex-col items-center justify-center absolute top-[30%] left-0 right-0">
        <p>Welcome</p>
        <p>to</p>
        <p className="text-4xl">My Garage</p>
      </div>

      {/* Login Form */}
      <form
        className="fixed
         bottom-0 p-6 rounded-t-2xl md:w-[25rem] w-full flex flex-col gap-6 bg-white shadow-lg"
        onSubmit={handleLogin}
      >
        <InputField type="text" placeholder="johndoe@gmail.com" label="Email" />
        {!emailValid && (
          <p className="text-red-500 text-sm">Please enter a valid email</p>
        )}
        <InputField type="password" placeholder="*********" label="Password" />
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
