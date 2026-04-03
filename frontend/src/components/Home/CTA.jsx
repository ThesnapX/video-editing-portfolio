import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Ready to Start Your
          <br />
          <span className="gradient-text">Next Project?</span>
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Let's collaborate and create something amazing together.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-10 py-5 gradient-bg text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 text-lg"
        >
          Get in Touch
          <FiArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default CTA;
