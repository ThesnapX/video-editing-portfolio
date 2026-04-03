import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/Services/ServiceCard";
import ContactModal from "../components/Services/ContactModal";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HelmetSEO from "../components/SEO/HelmetSEO";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/services")
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => console.error("Error fetching services:", err))
      .finally(() => setLoading(false));

    gsap.fromTo(
      ".services-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
    );
  }, []);

  const handleContact = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <HelmetSEO
        title="Services"
        description="Professional video editing services including commercial editing, music video production, corporate videos, and social media content. Get a quote today!"
        keywords="video editing services, commercial editing, music video editing, corporate video production"
      />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service._id}
                service={service}
                onContact={() => handleContact(service)}
                index={index}
              />
            ))}
          </div>

          {services.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No services available yet. Check back soon!
              </p>
            </div>
          )}
        </div>

        <ContactModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          service={selectedService}
        />
      </main>
    </>
  );
};

export default Services;
