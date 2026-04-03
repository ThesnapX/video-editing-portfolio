import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPaperPlane,
} from "react-icons/fa";
import gsap from "gsap";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    gsap.fromTo(
      ".contact-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
    );

    gsap.fromTo(
      ".contact-info",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.3 },
    );

    gsap.fromTo(
      ".contact-form",
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.6, delay: 0.3 },
    );
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      setError("Please fill in all required fields");
      setSubmitting(false);
      return;
    }

    try {
      // Here you can integrate with your backend API
      // await axios.post('/api/contact', formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-20">
      {/* Header */}
      <div className="contact-header relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to start your next project? Let's create something amazing
            together.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="contact-info space-y-8">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm always excited to collaborate on new projects. Whether you
                have a specific vision or need guidance, I'm here to help bring
                your ideas to life.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center group-hover:scale-110 transition">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:harshpatankar21@gmail.com"
                      className="text-gray-400 hover:text-primary transition"
                    >
                      harshpatankar21@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center group-hover:scale-110 transition">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <a
                      href="tel:+918652119766"
                      className="text-gray-400 hover:text-primary transition"
                    >
                      +91 86521 19766
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center group-hover:scale-110 transition">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Location</h4>
                    <p className="text-gray-400">
                      Available worldwide (Remote)
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="font-semibold mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 transition-all duration-300"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 transition-all duration-300"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 transition-all duration-300"
                  >
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

              {submitted && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-center">
                  Thank you! Your message has been sent. I'll get back to you
                  soon.
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name *"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition text-white placeholder-gray-500"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name *"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition text-white placeholder-gray-500"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number (Optional)"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition text-white placeholder-gray-500"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project *"
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary transition text-white placeholder-gray-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 gradient-bg text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
