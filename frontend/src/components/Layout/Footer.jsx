import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaYoutube, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-darker py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-primary">EDIT</span>FLOW
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
              <li>Email: hello@editflow.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Location: Los Angeles, CA</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
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
                <FaTwitter />
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

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 EDITFLOW. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
