import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';

function App() {
    return (
        <>
            <div>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/email-verify" element={<EmailVerify />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
