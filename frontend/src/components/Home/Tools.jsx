import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FiFilm, FiCamera, FiImage, FiTool } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const Tools = () => {
  const tools = [
    {
      name: "Premiere Pro",
      icon: <FiFilm className="text-4xl" />,
      description: "Video Editing",
    },
    {
      name: "After Effects",
      icon: <FiCamera className="text-4xl" />,
      description: "Motion Graphics",
    },
    {
      name: "Photoshop",
      icon: <FiImage className="text-4xl" />,
      description: "Photo Editing",
    },
    {
      name: "Figma",
      icon: <FiTool className="text-4xl" />,
      description: "UI/UX Design",
    },
  ];

  useEffect(() => {
    gsap.utils.toArray(".tool-card").forEach((card, i) => {
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
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tools I <span className="gradient-text">Master</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Industry-standard software for professional results
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="tool-card glass rounded-2xl p-8 text-center group card-hover"
            >
              <div className="flex justify-center mb-4">
                <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-1">{tool.name}</h3>
              <p className="text-sm text-gray-400">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
