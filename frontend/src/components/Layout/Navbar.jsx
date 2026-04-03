import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/work", label: "Work" },
    { path: "/testimonials", label: "Testimonials" },
    { path: "/contact", label: "Contact" },
  ];

  // ✅ Optimized scroll detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // ✅ Navbar styling
  const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    transition: "background-color 0.3s ease, backdrop-filter 0.3s ease",
    backgroundColor: scrolled ? "rgba(9, 9, 11, 0.6)" : "transparent",
    backdropFilter: scrolled ? "blur(12px)" : "none",
  };

  return (
    <nav style={navbarStyle} className="relative">
      {/* ✅ Bottom Border (perfect placement, no hacks) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          opacity: scrolled ? 1 : 0,
        }}
      />

      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* ✅ Logo */}
          <Link to="/" className="text-xl md:text-2xl font-bold z-10 group">
            <span className="gradient-text transition-all duration-300">
              HARRY
            </span>
            <span className="text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500">
              CREATIONS
            </span>
          </Link>

          {/* ✅ Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm lg:text-base font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* ✅ Desktop CTA */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="px-4 py-2 lg:px-5 lg:py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/80 transition-all duration-200"
            >
              Start Project
            </Link>
          </div>

          {/* ✅ Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-white z-20"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#09090b] transition-all duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ top: "64px" }}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="flex flex-col p-6 space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-3 text-lg transition-colors rounded-lg ${
                location.pathname === link.path
                  ? "text-primary bg-primary/10"
                  : "text-gray-300 hover:bg-white/5"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/contact"
            className="px-4 py-3 mt-4 text-center bg-primary text-white rounded-lg font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Start Project
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
