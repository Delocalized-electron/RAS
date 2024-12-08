import React from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [signIn, toggle] = React.useState(true);
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    console.log("User signed up");
    navigate("/home");
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    console.log("User signed in");
    navigate("/home");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative w-[800px] max-w-full min-h-[550px] bg-white rounded-lg shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-1/2 h-full transition-all ease-in-out ${
            !signIn ? "translate-x-full opacity-100 z-[5]" : "opacity-0 z-[1]"
          }`}
        >
          <form
            className="flex flex-col items-center justify-center h-full text-center p-[50px] bg-white"
            onSubmit={handleSignUp}
          >
            <h1 className="font-bold m-0">Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              className="bg-[#eee] border-none px-4 py-3 my-2 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-[#eee] border-none px-4 py-3 my-2 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-[#eee] border-none px-4 py-3 my-2 w-full"
            />
            <button className="rounded-full border border-[#1e90ff] bg-[#2a5298] text-white text-sm font-bold px-[45px] py-[12px] uppercase tracking-wider transition-transform duration-80 active:scale-95">
              Sign Up
            </button>
          </form>
        </div>

        <div
          className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-600 ease-in-out ${
            signIn ? "" : "translate-x-full"
          }`}
        >
          <form
            className="flex flex-col items-center justify-center h-full text-center p-[50px] bg-white"
            onSubmit={handleSignIn}
          >
            <h1 className="font-bold m-0">Sign in</h1>
            <input
              type="email"
              placeholder="Email"
              className="bg-[#eee] border-none px-4 py-3 my-2 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-[#eee] border-none px-4 py-3 my-2 w-full"
            />
            <a href="#" className="text-[#333] text-sm my-[15px]">
              Forgot your password?
            </a>
            <button className="rounded-full border border-[#1e90ff] bg-[#2a5298] text-white text-sm font-bold px-[45px] py-[12px] uppercase tracking-wider transition-transform duration-80 active:scale-95">
              Sign In
            </button>
          </form>
        </div>

        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform ease-in-out z-[100] ${
            !signIn ? "-translate-x-full" : ""
          }`}
        >
          <div
            className={`absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-[#1e3c72] to-[#2a5298] bg-no-repeat bg-cover text-white transition-transform duration-600 ease-in-out ${
              !signIn ? "translate-x-[50%]" : ""
            }`}
          >
            <div
              className={`absolute top-0 w-1/2 h-full flex flex-col items-center justify-center text-center px-[40px] transition-transform duration-600 ease-in-out ${
                !signIn ? "translate-x-0" : "-translate-x-[20%]"
              }`}
            >
              <h1 className="font-bold">Welcome Back!</h1>
              <p className="text-sm font-light leading-5 tracking-wide mt-[20px] mb-[30px]">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="rounded-full border border-white bg-transparent text-white text-sm font-bold px-[45px] py-[12px] uppercase tracking-wider"
                onClick={() => toggle(true)}
              >
                Sign In
              </button>
            </div>

            <div
              className={`absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center text-center px-[40px] transition-transform duration-600 ease-in-out ${
                !signIn ? "translate-x-[20%]" : "translate-x-0"
              }`}
            >
              <h1 className="font-bold">Hello, Friend!</h1>
              <p className="text-sm font-light leading-5 tracking-wide mt-[20px] mb-[30px]">
                Enter Your personal details and start your journey with us
              </p>
              <button
                className="rounded-full border border-white bg-transparent text-white text-sm font-bold px-[45px] py-[12px] uppercase tracking-wider"
                onClick={() => toggle(false)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
