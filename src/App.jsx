import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./commonComponents/Layout";
import Home from "./pages/Home";
import './App.css';

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<h1>login</h1>} />
            <Route path="/signup" element={<h1>signup</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}