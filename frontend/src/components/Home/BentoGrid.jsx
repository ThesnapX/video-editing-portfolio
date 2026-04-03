import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  FiEdit3,
  FiVideo,
  FiImage,
  FiUsers,
  FiTrendingUp,
  FiAward,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const BentoGrid = () => {
  const items = [
    {
      icon: <FiVideo className="text-3xl" />,
      title: "Video Editing",
      description:
        "Professional editing with seamless transitions and storytelling",
      span: "col-span-1",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FiEdit3 className="text-3xl" />,
      title: "Motion Graphics",
      description: "Dynamic animations and visual effects (Learning phase)",
      span: "col-span-1",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FiImage className="text-3xl" />,
      title: "Poster Design",
      description: "Eye-catching posters and promotional materials",
      span: "col-span-1",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FiTrendingUp className="text-3xl" />,
      title: "YouTube SEO",
      description: "Optimize your videos for maximum reach and engagement",
      span: "col-span-1 lg:col-span-2",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <FiUsers className="text-3xl" />,
      title: "Client-First Approach",
      description: "Understanding your vision and bringing it to life",
      span: "col-span-1",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <FiAward className="text-3xl" />,
      title: "Quality Guarantee",
      description: "100% satisfaction guaranteed with unlimited revisions",
      span: "col-span-1",
      color: "from-yellow-500 to-orange-500",
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
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What I <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive video editing and design services to elevate your
            content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className={`bento-item ${item.span} glass rounded-2xl p-8 hover:neon-border transition-all duration-500 group card-hover relative overflow-hidden`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              ></div>
              <div
                className={`text-primary mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
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
