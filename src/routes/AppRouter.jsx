import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landingpage from "../pages/LandingPage";
import Loginpage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import MainLayout from "../components/layout/MainLayout";
import TravelRoomsPage from "../pages/TravelRoomsPage";
import CreateTripPage from "../pages/CreateTripPage";
import TripRoomPage from "../pages/TripRoomPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route element={<MainLayout />}>
          {/* 메인 레이아웃 사용할 페이지들 여기에 추가 */}
          <Route path="/travel-rooms" element={<TravelRoomsPage />} />
          <Route path="/create-trip" element={<CreateTripPage />} />
          <Route path="/trip-room/:id" element={<TripRoomPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;