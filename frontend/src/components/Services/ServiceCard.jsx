import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ service, onContact, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group glass rounded-2xl overflow-hidden hover:neon-border transition-all duration-300 transform hover:-translate-y-2"
    >
      <Link to={`/services/${service._id}`}>
        <div className="relative overflow-hidden aspect-video">
          <img
            src={service.thumbnail}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/services/${service._id}`}>
          <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
            {service.title}
          </h3>
        </Link>
        <p className="text-gray-400 mb-6 line-clamp-3">{service.description}</p>
        <div className="flex gap-3">
          <Link
            to={`/services/${service._id}`}
            className="flex-1 py-3 bg-primary/10 text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300 text-center"
          >
            Learn More →
          </Link>
          <button
            onClick={onContact}
            className="flex-1 py-3 bg-gray-800/50 text-white rounded-full font-semibold hover:bg-primary/20 transition-all duration-300"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
