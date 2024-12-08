import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Auth = lazy(() => import("../pages/auth"))
const Home = lazy(() => import("../pages/Home"));
const AddItems = lazy(() => import("../pages/AddItems"));
const Stocks = lazy(() => import("../pages/Stocks"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addItems" element={<AddItems />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="*" element={<NotFound />} /> {/* 404 Page */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
