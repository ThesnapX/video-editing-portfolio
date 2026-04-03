import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import AdminLogin from "./components/Admin/Login";
import AdminLayout from "./components/Admin/AdminLayout";
import ServiceDetail from "./pages/ServiceDetail";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-darker to-dark">
        <Routes>
          <Route path="/harry-admin-dashboard" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/services/:id" element={<ServiceDetail />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
