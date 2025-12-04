import React from "react"
import { Routes, Route } from "react-router-dom"

// 랜딩 페이지
import LandingPage from "../pages/LandingPage.jsx"

// Rooms 루트 목록 페이지
import RoomsPage from "@/pages/rooms/page.jsx"
// 생성 페이지
import CreateRoomPage from "@/pages/rooms/create/page.jsx"
// 동적 상세 페이지
import RoomDetailPage from "@/pages/rooms/[id]/page.jsx"
// 개별 수정 페이지
import EditRoomPage from "@/pages/rooms/[id]/edit/page.jsx"
// 확정 페이지
import ConfirmedPlanPage from "@/pages/rooms/[id]/confirmed/page.jsx"
// 확정 후 수정 페이지
import EditConfirmedPlanPage from "@/pages/rooms/[id]/confirmed/edit/page.jsx"
// 일정(플랜) 페이지
import PlansPage from "@/pages/rooms/[id]/plans/page.jsx"
import InviteAcceptPage from "@/pages/invite/[id]/page.jsx"

export default function AppRoutes() {
  return (
    <Routes>
      {/* 루트 */}
      <Route path="/" element={<LandingPage />} />
      {/* 초대 수락 */}
      <Route path="/invite/:id" element={<InviteAcceptPage />} />

      {/* /rooms 그룹 */}
      <Route path="/rooms">
        <Route index element={<RoomsPage />} />
        <Route path="create" element={<CreateRoomPage />} />
        <Route path=":id" element={<RoomDetailPage />} />
        <Route path=":id/edit" element={<EditRoomPage />} />
        <Route path=":id/confirmed" element={<ConfirmedPlanPage />} />
        <Route path=":id/confirmed/edit" element={<EditConfirmedPlanPage />} />
        <Route path=":id/plans" element={<PlansPage />} />
      </Route>
    </Routes>
  )
}