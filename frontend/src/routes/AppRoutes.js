import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../pages/Loading";

const Home = lazy(() => import("../pages/Home"));
const AddItems = lazy(() => import("../pages/AddItems"));
const Stocks = lazy(() => import("../pages/Stocks"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addItems" element={<AddItems />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="*" element={<NotFound />} /> {/* 404 Page */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
