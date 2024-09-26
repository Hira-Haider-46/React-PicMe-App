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
import ProfileLayout from "./commonComponents/ProfileLayout";
import Photos from "./pages/Photos";
import Videos from "./pages/Videos";
import './App.css';

export default function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {!token ? (
            <Route element={<PublicRoutes />}>
              <Route index element={<ContinueAsPage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="verification" element={<Verification />} />
              <Route path="new-password" element={<CreateNewPass />} />
              <Route path="password-change" element={<PassChange />} />
            </Route>
          ) : (
            <Route element={<PrivateRoutes />}>
              <Route index element={<ChooseLocation />} />
              <Route path="location" element={<Location />} />
              <Route path="photographer-profile" element={<ProfileLayout />}>
                <Route index element={<Photos />} />
                <Route path="photos" element={<Photos />} />
                <Route path="videos" element={<Videos />} />
                <Route path="reviews" element={<h1>Reviews Page</h1>} />
                <Route path="category" element={<h1>Category Page</h1>} />
              </Route>
            </Route>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}