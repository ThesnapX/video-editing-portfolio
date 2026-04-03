import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const ServicesGrid = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("/api/services");
      setServices(res.data.slice(0, 3));
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }

    gsap.utils.toArray(".service-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  };

  if (loading) {
    return (
      <section className="py-32 bg-[#050505]">
        <div className="container mx-auto px-6 text-center">
          <div className="text-primary text-xl">Loading services...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Professional editing services tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service._id} className="service-card group">
              <div className="glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 h-full">
                <div className="h-56 overflow-hidden">
                  <img
                    src={service.thumbnail}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                  <Link
                    to={`/services/${service._id}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    Learn More <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No services available yet.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 glass text-white rounded-xl font-semibold hover:bg-white/5 transition-all duration-300"
          >
            View All Services
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
