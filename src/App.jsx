import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./commonComponents/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import './App.css';

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<h1>signup</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}