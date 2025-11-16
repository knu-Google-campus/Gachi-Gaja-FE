import { Analytics } from "@vercel/analytics/react";
import AppRoutes from "./router/router.jsx"
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
    <AppRoutes />
    <Analytics />
    <ToastContainer />
    </>
  )
}