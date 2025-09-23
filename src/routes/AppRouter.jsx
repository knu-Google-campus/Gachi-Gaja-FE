import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landingpage from "../pages/LandingPage";
import Loginpage from "../pages/LoginPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Loginpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;