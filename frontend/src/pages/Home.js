import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login");
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

export default Home;
