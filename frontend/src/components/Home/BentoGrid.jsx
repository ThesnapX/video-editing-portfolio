import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  FiFilm,
  FiCamera,
  FiStar,
  FiUsers,
  FiTool,
  FiAward,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const BentoGrid = () => {
  const items = [
    {
      icon: <FiFilm className="text-3xl" />,
      title: "Cinematic Storytelling",
      description:
        "Creating emotional narratives through expert editing techniques",
      span: "col-span-1",
    },
    {
      icon: <FiTool className="text-3xl" />,
      title: "Premiere Pro Expert",
      description: "Advanced color grading, effects, and seamless transitions",
      span: "col-span-1",
    },
    {
      icon: <FiCamera className="text-3xl" />,
      title: "After Effects Mastery",
      description: "Stunning motion graphics and visual effects",
      span: "col-span-1",
    },
    {
      icon: <FiStar className="text-3xl" />,
      title: "5+ Years Experience",
      description: "Proven track record of delivering exceptional results",
      span: "col-span-1",
    },
    {
      icon: <FiUsers className="text-3xl" />,
      title: "100+ Happy Clients",
      description: "Trusted by creators and brands worldwide",
      span: "col-span-1 lg:col-span-2",
    },
    {
      icon: <FiAward className="text-3xl" />,
      title: "Award-Winning",
      description: "Recognized for excellence in video production",
      span: "col-span-1",
    },
  ];

  useEffect(() => {
    gsap.utils.toArray(".bento-item").forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, []);

  return (
    <section className="py-24 bg-darker/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Creative <span className="text-primary">Essentials</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            What makes my editing style unique and professional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className={`bento-item ${item.span} glass p-8 rounded-2xl hover:neon-border transition-all duration-300 transform hover:-translate-y-2 group`}
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
