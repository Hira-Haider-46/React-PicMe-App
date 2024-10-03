import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./commonComponents/Layout";
import ContinueAsPage from "./pages/ContinueAsPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Verification from "./pages/Verification";
import ForgotPassword from "./pages/ForgotPassword";
import CreateNewPass from "./pages/CreateNewPass";
import PassChange from "./pages/PassChange";
import ChooseLocation from "./pages/ChooseLocation";
import Location from "./pages/Location";
import PublicRoutes from "./commonComponents/PublicRoutes";
import PrivateRoutes from "./commonComponents/PrivateRoutes";
import PhotographerProfile from "./pages/PhotographerProfile";
import PaymentDetails from "./pages/PaymentDetails";
import './App.css';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<PublicRoutes />}>
            <Route index element={<ContinueAsPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="verification" element={<Verification />} />
            <Route path="new-password" element={<CreateNewPass />} />
            <Route path="password-change" element={<PassChange />} />
          </Route></Route>
        <Route element={<Layout />}>
          <Route element={<PrivateRoutes />}>
            <Route path="choose-location" element={<ChooseLocation />} />
            <Route path="location" element={<Location />} />
            <Route path="photographer-profile" element={<PhotographerProfile />} />
            <Route path="checkout" element={<PaymentDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}