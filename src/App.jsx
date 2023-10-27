
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Auth/Login/Login';
import Register from './Auth/Register/Register';
import VerifyOTP from './Auth/VerifyOTP/VerifyOTP';
import ForgetPassword from './Auth/ForgetPassword/ForgetPassword';
import VerifyForgetPassword from './Auth/VerifyForgetOTP/VerifyForgetOTP';
import ResetPassword from './Auth/RestPassword/ResetPassword.';
function App() {

  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/verify-otp" element={<VerifyOTP />}/>
        <Route path="/forget-password" element={<ForgetPassword />}/>
        <Route path="/verify-forget-password-otp" element={<VerifyForgetPassword />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
