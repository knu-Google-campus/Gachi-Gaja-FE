import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./globals.css";
import App from "./App.jsx";
// import "./api/axiosInstance";

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/browser')
  console.info('[MSW] Starting mock service worker...')
  await worker.start({
    serviceWorker: { url: '/mockServiceWorker.js' },
    onUnhandledRequest: 'bypass'
  })
  console.info('[MSW] Worker started. Requests to /api/* will be intercepted.')
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
