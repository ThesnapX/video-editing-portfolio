import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#050505] py-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="gradient-text">HARRY</span>
                <span className="text-white"> CREATIONS</span>
              </h3>
              <p className="text-gray-400">
                Transforming ideas into visual masterpieces through cinematic
                storytelling.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-primary transition"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-primary transition"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/work"
                    className="text-gray-400 hover:text-primary transition"
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    to="/testimonials"
                    className="text-gray-400 hover:text-primary transition"
                  >
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: harshpatankar21@gmail.com</li>
                <li>Phone: +91 86521 19766</li>
                <li>Available worldwide</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary text-2xl transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary text-2xl transition"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary text-2xl transition"
                >
                  <FaYoutube />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary text-2xl transition"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="border-t border-white/10 py-2 text-center text-gray-400">
        <p>&copy; 2024 Harry Creations. All rights reserved.</p>
      </div>
    </>
  );
};

export default Footer;
