import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork = () => {
  const [works, setWorks] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Fetch works from backend
    axios
      .get("/api/work")
      .then((res) => {
        setWorks(res.data.slice(0, 3)); // Get only 3 for featured
      })
      .catch((err) => console.error("Error fetching works:", err));

    // Parallax effect
    gsap.utils.toArray(".work-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100, rotationX: 20 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-darker/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Work</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore some of my finest video editing projects that showcase
            creativity and technical excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {works.map((work, index) => (
            <div
              key={work._id}
              className="work-card group relative overflow-hidden rounded-xl cursor-pointer"
            >
              <img
                src={work.thumbnail}
                alt={work.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">{work.title}</h3>
                  <Link
                    to="/work"
                    className="text-primary hover:text-primary/80 transition"
                  >
                    View Project →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/work"
            className="inline-block px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All Work
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
