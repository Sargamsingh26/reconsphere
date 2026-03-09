import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GreetingPopup from "./components/GreetingPopup";
import HomePage from "./pages/HomePage";
import DownloadPage from "./pages/DownloadPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navbar />
      <GreetingPopup  />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <Footer />
    </>
  );
}
