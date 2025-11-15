import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./globals.css";
import App from "./App.jsx";
// import "./api/axiosInstance";

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')
  await worker.start()
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
