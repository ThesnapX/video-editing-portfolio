import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Ready to Create Something{" "}
          <span className="text-primary">Amazing</span>?
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Let's bring your vision to life with professional video editing that
          stands out.
        </p>
        <Link
          to="/contact"
          className="inline-block px-12 py-5 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/80 transition-all duration-300 transform hover:scale-105 glow"
        >
          Start Your Project
        </Link>
      </div>
    </section>
  );
};

export default CTA;
