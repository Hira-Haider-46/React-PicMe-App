import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSignUpSuccess } from "./store/slices/authSlice";
import { getApiWithAuth } from './apis/index';
import { ME } from './apis/apiUrls';
import Layout from "./commonComponents/Layout";
import ContinueAsPage from "./pages/ContinueAsPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Verification from "./pages/Verification";
import ForgotPassword from "./pages/ForgotPassword";
import CreateNewPass from "./pages/CreateNewPass";
import PassChange from "./pages/PassChange";
import ChooseLocation from "./pages/CustomerSide/ChooseLocation";
import Location from "./pages/CustomerSide/Location";
import PublicRoutes from "./commonComponents/PublicRoutes";
import CustomerPrivateRoutes from "./commonComponents/CustomerPrivateRoutes";
import PhotographerProfile from "./pages/CustomerSide/PhotographerProfile";
import PaymentDetails from "./pages/CustomerSide/PaymentDetails";
import PhotographerRoute from "./commonComponents/PhotographerRoute";
import PhotographerLayout from "./commonComponents/PhotographerLayout";
import CreateProfile from "./pages/PhotographerSide/CreateProfile";
import ProfilePage from "./pages/PhotographerSide/ProfilePage";
import HomePage from "./pages/PhotographerSide/HomePage";
import UploadWork from "./pages/PhotographerSide/UploadWork";
import UploadPhotos from "./pages/PhotographerSide/UploadPhotos";
import UploadVideos from "./pages/PhotographerSide/UploadVideos";
import CreatePackage from "./pages/PhotographerSide/CreatePackage";
import UploadPackage from "./pages/PhotographerSide/UploadPackage";
import CustomizeProfile from "./pages/CustomizeProfile";
import './App.css';

export default function App() {

  const dispatch = useDispatch();
  const [profileCreated, setProfileCreated] = useState(null);

  const fetchUser = async () => {
    const res = await getApiWithAuth(`${ME}`);
    if (res.success) {
      console.log('user---app.jsx', res.data.user);
      dispatch(loginSignUpSuccess({
        user: res.data.user,
        token: res.data.token,
        type: res.data.user.type
      }));
      setProfileCreated(res.data.user.profile_created)
    } else {
      console.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
            <Route path="customize-profile" element={<CustomizeProfile />} />
          </Route>
        </Route>
 
        <Route element={<PhotographerLayout />}>
          <Route element={<PhotographerRoute />}>
            {!profileCreated ? <>
              <Route path="create-profile" element={<CreateProfile />} />
              <Route path="profile-page" element={<ProfilePage />} />
            </> : <>
              <Route path="home-page" element={<HomePage />} />
              <Route path="upload-work" element={<UploadWork />} />
              <Route path="upload-photos" element={<UploadPhotos />} />
              <Route path="upload-videos" element={<UploadVideos />} />
              <Route path="create-package" element={<CreatePackage />} />
              <Route path="upload-package" element={<UploadPackage />} />
              <Route path="customize-profile" element={<CustomizeProfile />} />
            </>
            }
          </Route>
        </Route>

        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>

    </BrowserRouter>
  );
}