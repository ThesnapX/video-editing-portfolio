import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FiClock, FiDollarSign, FiCheck, FiPlay } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchService();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchService = async () => {
    try {
      const res = await axios.get(`/api/services/${id}`);
      setService(res.data);

      // Animations
      gsap.fromTo(
        ".service-hero",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 },
      );

      gsap.fromTo(
        ".service-content",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 0.3 },
      );
    } catch (err) {
      console.error("Error fetching service:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-xl">Service not found</div>
      </div>
    );
  }

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <div className="service-hero relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={service.thumbnail}
            alt={service.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/80 to-dark"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8">{service.description}</p>
            <div className="flex gap-4">
              <Link
                to="/contact"
                className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/80 transition glow"
              >
                Get a Quote
              </Link>
              <Link
                to="/work"
                className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transition"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="service-content container mx-auto px-6 py-20">
        {/* Service Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass p-6 rounded-xl text-center">
            <FiClock className="text-primary text-3xl mx-auto mb-3" />
            <h3 className="font-bold mb-2">Turnaround Time</h3>
            <p className="text-gray-400">{service.turnaround}</p>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <FiDollarSign className="text-primary text-3xl mx-auto mb-3" />
            <h3 className="font-bold mb-2">Pricing</h3>
            <p className="text-gray-400">{service.pricing}</p>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <FiCheck className="text-primary text-3xl mx-auto mb-3" />
            <h3 className="font-bold mb-2">Quality Guarantee</h3>
            <p className="text-gray-400">100% Satisfaction guaranteed</p>
          </div>
        </div>

        {/* Long Description */}
        {service.longDescription && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">About This Service</h2>
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {service.longDescription}
            </div>
          </div>
        )}

        {/* Process Section */}
        {service.process && service.process.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Process</h2>
            <div className="space-y-6">
              {service.process.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.step}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects */}
        {service.relatedWorks && service.relatedWorks.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.relatedWorks.map((work) => (
                <Link
                  key={work._id}
                  to={`/work/${work._id}`}
                  className="group glass rounded-xl overflow-hidden hover:neon-border transition-all duration-300"
                >
                  <div className="relative aspect-video">
                    <img
                      src={work.thumbnail}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiPlay className="text-white text-4xl" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{work.title}</h3>
                    {work.client && (
                      <p className="text-sm text-gray-400">
                        Client: {work.client}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ServiceDetail;
