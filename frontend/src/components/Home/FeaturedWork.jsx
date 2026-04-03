import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import axios from "axios";
import VideoModal from "../Work/VideoModal";
import VideoThumbnail from "../Common/VideoThumbnail";

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork = () => {
  const [works, setWorks] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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

  const handleVideoClick = (work) => {
    setSelectedVideo(work);
    setModalOpen(true);
  };

  return (
    <>
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
                onClick={() => handleVideoClick(work)}
              >
                <VideoThumbnail
                  key={work._id}
                  work={work}
                  className="work-card"
                  showTitle={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{work.title}</h3>
                    <span className="text-primary text-sm">
                      Click to play →
                    </span>
                  </div>
                </div>
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
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

      {/* Video Modal */}
      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        video={selectedVideo}
      />
    </>
  );
};

export default FeaturedWork;
