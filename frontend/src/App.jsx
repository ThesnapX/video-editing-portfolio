import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Work from "./pages/Work";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import ServiceDetail from "./pages/ServiceDetail";
import AdminLogin from "./components/Admin/Login";
import AdminLayout from "./components/Admin/AdminLayout";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-400 mb-6">
              Please refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 gradient-bg text-white rounded-lg"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-[#09090b]">
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
                    <Route path="/services/:id" element={<ServiceDetail />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
