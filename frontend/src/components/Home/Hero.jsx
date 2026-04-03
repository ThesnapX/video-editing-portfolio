import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { FiArrowRight, FiPlay } from "react-icons/fi";

const Hero = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-badge",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
    )
      .fromTo(
        ".hero-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.3",
      )
      .fromTo(
        ".hero-description",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4",
      )
      .fromTo(
        ".hero-buttons",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3",
      )
      .fromTo(
        ".hero-stats",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        "-=0.2",
      );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-300">
              Professional Video Editor
            </span>
          </div>

          {/* Title */}
          <h1 className="hero-title text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Create Stunning
            <br />
            <span className="gradient-text">Visual Stories</span>
          </h1>

          {/* Description */}
          <p className="hero-description text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional video editing that brings your ideas to life. Cinematic
            quality, creative storytelling, and attention to detail.
          </p>

          {/* Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-5 justify-center mb-20">
            <Link
              to="/work"
              className="group px-8 py-4 gradient-bg text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-lg"
            >
              View Portfolio
              <FiArrowRight className="group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 glass border border-white/10 text-white rounded-xl font-semibold hover:bg-white/5 transition-all duration-300 text-lg"
            >
              Get in Touch
            </Link>
          </div>

          {/* Stats - Only real data */}
          <div className="hero-stats grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">1+</div>
              <div className="text-gray-500 mt-1">Year Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">35+</div>
              <div className="text-gray-500 mt-1">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">100+</div>
              <div className="text-gray-500 mt-1">Projects Done</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
