import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/Services/ServiceCard";
import ContactModal from "../components/Services/ContactModal";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);

      const API_URL = import.meta.env.VITE_API_URL || "/api";
      const response = await axios.get(`${API_URL}/services`);

      console.log("Services API response:", response.data);

      // Ensure we're setting an array
      if (response.data && Array.isArray(response.data)) {
        setServices(response.data);
      } else if (response.data && typeof response.data === "object") {
        // If response is an object with data property
        setServices(response.data.data || []);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
      setError(err.message || "Failed to load services");
      setServices([]);
    } finally {
      setLoading(false);
    }

    gsap.fromTo(
      ".services-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
    );
  };

  const handleContact = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading services...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">
            Error loading services
          </div>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 gradient-bg text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-20">
      {/* Header */}
      <div className="services-header relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            My <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Professional video editing and design services tailored to your
            needs
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-6 py-20">
        {services.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No services available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service._id || index}
                service={service}
                onContact={() => handleContact(service)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        service={selectedService}
      />
    </main>
  );
};

export default Services;
