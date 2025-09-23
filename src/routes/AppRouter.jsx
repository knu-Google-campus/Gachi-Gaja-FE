import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landingpage from "../pages/LandingPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;