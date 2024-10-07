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
import CustomerPrivateRoutes from "./commonComponents/CustomerPrivateRoutes";
import PhotographerProfile from "./pages/PhotographerProfile";
import PaymentDetails from "./pages/PaymentDetails";
import PhotographerLayout from "./commonComponents/PhotographerLayout";
import CreateProfile from "./pages/CreateProfile";
import PhotographerRoute from "./commonComponents/PhotographerRoute";
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
          </Route>
        </Route>

        <Route element={<Layout />}>
          <Route element={<CustomerPrivateRoutes />}>
            <Route path="choose-location" element={<ChooseLocation />} />
            <Route path="location" element={<Location />} />
            <Route path="photographer-profile" element={<PhotographerProfile />} />
            <Route path="checkout/:id" element={<PaymentDetails />} />
          </Route>
        </Route>

        <Route element={<PhotographerLayout />}>
          <Route element={<PhotographerRoute />}>
            <Route path="create-profile" element={<CreateProfile />} />
          </Route>
        </Route>

      </Routes>

    </BrowserRouter>
  );
}