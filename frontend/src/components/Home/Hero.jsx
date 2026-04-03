import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import axios from "axios";
import VideoModal from "../Work/VideoModal";
import { FiPlay } from "react-icons/fi";

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const glowRef = useRef(null);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch a featured video for hero section
    axios
      .get("/api/work")
      .then((res) => {
        if (res.data.length > 0) {
          setFeaturedVideo(res.data[0]);
        }
      })
      .catch((err) => console.error("Error fetching featured video:", err));

    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-title",
      { y: 100, opacity: 0, rotationX: -90 },
      { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: "back.out(1.2)" },
    )
      .fromTo(
        ".hero-subtitle",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5",
      )
      .fromTo(
        ".hero-cta",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.2)" },
        "-=0.3",
      )
      .fromTo(
        ".glow-effect",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        },
        "-=0.3",
      );

    // Mouse move parallax effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(glowRef.current, {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handlePlayVideo = () => {
    if (featuredVideo) {
      setModalOpen(true);
    }
  };

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Glow Effect */}
        <div
          ref={glowRef}
          className="glow-effect absolute w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px]"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="text-white">Crafting Visual</span>
            <br />
            <span className="text-primary glow-text">Masterpieces</span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Professional video editing that brings your stories to life.
            Cinematic quality, creative storytelling, and unparalleled attention
            to detail.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/work"
              className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/80 transition-all duration-300 transform hover:scale-105 glow"
            >
              View Portfolio
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transition-all duration-300"
            >
              Get in Touch
            </Link>
            {featuredVideo && (
              <button
                onClick={handlePlayVideo}
                className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FiPlay /> Watch Showreel
              </button>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-2 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        video={featuredVideo}
      />
    </>
  );
};

export default Hero;
