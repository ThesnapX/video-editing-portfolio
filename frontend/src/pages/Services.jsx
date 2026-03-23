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

  useEffect(() => {
    axios
      .get("/api/services")
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => console.error("Error fetching services:", err));

    // Animation for banner
    gsap.fromTo(
      ".services-banner",
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".services-banner",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  const handleContact = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <main className="pt-20">
      <div className="services-banner bg-gradient-to-r from-primary/10 to-transparent py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            My <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional video editing services tailored to your needs
          </p>
        </div>
      </div>

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
