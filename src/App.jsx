import GlobalStyle from './styles/GlobalStyle';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './routes/AppRouter';
import { Analytics } from '@vercel/analytics/react';

function App() {

  return (
    <>
      <GlobalStyle />
      <Analytics />
      <AppRouter />
      <ToastContainer />
    </>
  )
}

export default App
