import GlobalStyle from './styles/GlobalStyle';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './routes/AppRouter';
function App() {

  return (
    <>
      <GlobalStyle />
      <AppRouter />
      <ToastContainer />
    </>
  )
}

export default App
