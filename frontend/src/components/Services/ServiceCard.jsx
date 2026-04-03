import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ service, onContact, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
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
    <div ref={cardRef} className="group">
      <div className="glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 h-full flex flex-col">
        <Link to={`/services/${service._id}`}>
          <div className="relative overflow-hidden h-56">
            <img
              src={service.thumbnail}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </Link>

        <div className="p-6 flex-grow flex flex-col">
          <Link to={`/services/${service._id}`}>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
              {service.title}
            </h3>
          </Link>
          <p className="text-gray-400 mb-6 leading-relaxed flex-grow line-clamp-3">
            {service.description}
          </p>

          <div className="flex gap-3 mt-auto">
            <Link
              to={`/services/${service._id}`}
              className="flex-1 py-3 glass text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 text-center flex items-center justify-center gap-2 group"
            >
              Learn More
              <FiArrowRight className="group-hover:translate-x-1 transition" />
            </Link>
            <button
              onClick={onContact}
              className="flex-1 py-3 gradient-bg text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
