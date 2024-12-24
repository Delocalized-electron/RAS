import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../pages/Loading";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/Register";

const Home = lazy(() => import("../pages/Home"));
const AddItems = lazy(() => import("../pages/AddItems"));
const Stocks = lazy(() => import("../pages/Stocks"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addItems"
          element={
            <ProtectedRoute>
              <AddItems />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stocks"
          element={
            <ProtectedRoute>
              <Stocks />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
