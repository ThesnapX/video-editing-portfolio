import React, { useEffect } from "react";
import Hero from "../components/Home/Hero";
import FeaturedWork from "../components/Home/FeaturedWork";
import AboutMe from "../components/Home/AboutMe";
import ServicesGrid from "../components/Home/ServicesGrid";
import TestimonialsPreview from "../components/Home/TestimonialsPreview";
import CTA from "../components/Home/CTA";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    // Smooth scroll animation for sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, []);

  return (
    <main>
      <Hero />
      <FeaturedWork />
      <AboutMe />
      <ServicesGrid />
      <TestimonialsPreview />
      <CTA />
    </main>
  );
};

export default Home;
