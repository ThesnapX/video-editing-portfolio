import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import axios from "axios";
import VideoModal from "../Work/VideoModal";
import { FiPlay, FiArrowRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork = () => {
  const [works, setWorks] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/api/work")
      .then((res) => {
        setWorks(res.data.slice(0, 3));
      })
      .catch((err) => console.error("Error fetching works:", err));

    gsap.utils.toArray(".featured-card").forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, []);

  const handleVideoClick = (work) => {
    setSelectedVideo(work);
    setModalOpen(true);
  };

  return (
    <>
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Featured <span className="gradient-text">Work</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Selected projects showcasing my editing expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work, index) => (
              <div
                key={work._id}
                className="featured-card group cursor-pointer"
                onClick={() => handleVideoClick(work)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-900">
                  <img
                    src={work.thumbnail}
                    alt={work.title}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition duration-500">
                      <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center mx-auto mb-4 hover:scale-110 transition">
                        <FiPlay className="text-white text-3xl ml-1" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {work.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 text-lg"
            >
              View All Projects
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        video={selectedVideo}
      />
    </>
  );
};

export default FeaturedWork;
