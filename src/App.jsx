import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./commonComponents/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Verification from "./pages/Verification";
import ForgotPassword from "./pages/ForgotPassword";
import CreateNewPass from "./pages/CreateNewPass";
import PassChange from "./pages/PassChange";
import ChooseLocation from "./pages/ChooseLocation";
import Location from "./pages/Location";
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verification" element={<Verification />} />
          <Route path="new-password" element={<CreateNewPass />} />
          <Route path="password-change" element={<PassChange />} />
          <Route path="choose-location" element={<ChooseLocation />} />
          <Route path="location" element={<Location/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}