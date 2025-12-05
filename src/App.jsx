import { Analytics } from "@vercel/analytics/react";
import AppRoutes from "./router/router.jsx"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
    <AppRoutes />
    <Analytics />
    <ToastContainer position="top-center" autoClose={2000} hideProgressBar theme="light" />
    </>
  )
}