import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./globals.css";
import App from "./App.jsx";
// import "./api/axiosInstance";

// MSW 사용 여부를 환경 변수로 제어
const useMock = import.meta.env.VITE_USE_MSW === 'true'
if (import.meta.env.DEV && useMock) {
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
