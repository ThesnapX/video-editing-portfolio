import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import axios from "axios";
import gsap from "gsap";

const ContactModal = ({ isOpen, onClose, service }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    channelName: "",
    channelLink: "",
    message: "",
    serviceName: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen && service) {
      setFormData((prev) => ({ ...prev, serviceName: service.title }));
      gsap.fromTo(
        ".modal-content",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out" },
      );
    }
  }, [isOpen, service]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post("/api/leads", formData);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({
          name: "",
          mobileNumber: "",
          channelName: "",
          channelLink: "",
          message: "",
          serviceName: service?.title || "",
        });
      }, 2000);
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="modal-content glass rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 glass border-b border-gray-800 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            Contact for <span className="text-primary">{service?.title}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            <FiX />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-gray-400">We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                name="mobileNumber"
                required
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Channel Name (Optional)
              </label>
              <input
                type="text"
                name="channelName"
                value={formData.channelName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Channel Link (Optional)
              </label>
              <input
                type="url"
                name="channelLink"
                value={formData.channelLink}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Message *
              </label>
              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Service</label>
              <input
                type="text"
                value={formData.serviceName}
                disabled
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
