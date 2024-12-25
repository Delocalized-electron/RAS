import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useNavigate } from "react-router-dom";

const Temp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    console.log("Navigating to:", "/login");
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <h1>Welcome to My Garage</h1>
      <button
        onClick={handleLogout}
        className="py-2 px-4 bg-red-500 text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Temp;
