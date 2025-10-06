import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landingpage from "../pages/LandingPage";
import Loginpage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import MainLayout from "../components/layout/MainLayout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route element={<MainLayout />}>
          {/* 메인 레이아웃 사용할 페이지들 여기에 추가 */}
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;