import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Loading from "../pages/Loading";
import Login from "../pages/Login";

const Home = lazy(() => import("../pages/Home"));
const AddItems = lazy(() => import("../pages/AddItems"));
const Stocks = lazy(() => import("../pages/Stocks"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addItems" element={<AddItems />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="*" element={<NotFound />} /> {/* 404 Page */}
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
