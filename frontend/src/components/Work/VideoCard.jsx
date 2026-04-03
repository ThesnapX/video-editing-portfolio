import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FiPlay } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const VideoCard = ({ work, onClick, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
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
    <div ref={cardRef} onClick={onClick} className="group cursor-pointer">
      <div className="glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={work.thumbnail}
            alt={work.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="transform scale-90 group-hover:scale-100 transition duration-500">
              <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center hover:scale-110 transition">
                <FiPlay className="text-white text-2xl ml-1" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
            {work.title}
          </h3>
          {work.client && (
            <p className="text-gray-400 text-sm mt-1">Client: {work.client}</p>
          )}
          {work.categories && work.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {work.categories.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="text-xs px-2 py-1 bg-primary/20 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
