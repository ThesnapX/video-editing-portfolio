import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/Work/VideoCard";
import VideoModal from "../components/Work/VideoModal";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", label: "All Work" },
    { id: "commercial", label: "Commercial" },
    { id: "music-video", label: "Music Video" },
    { id: "corporate", label: "Corporate" },
    { id: "social-media", label: "Social Media" },
    { id: "trailer", label: "Trailer" },
  ];

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const res = await axios.get("/api/work");
      setWorks(res.data);
      setFilteredWorks(res.data);
    } catch (err) {
      console.error("Error fetching works:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredWorks(works);
    } else {
      setFilteredWorks(
        works.filter((work) => work.category === activeCategory),
      );
    }
  }, [activeCategory, works]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="pt-20">
      <div className="work-banner bg-gradient-to-r from-primary/10 to-transparent py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Video <span className="text-primary">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my latest video editing projects across different genres
          </p>
        </div>
      </div>

      <div className="sticky top-20 z-20 glass py-4 border-b border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-primary text-white glow"
                    : "bg-gray-800/50 text-gray-300 hover:bg-primary/20"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorks.map((work, index) => (
            <VideoCard
              key={work._id}
              work={work}
              onClick={() => handleVideoClick(work)}
              index={index}
            />
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No videos found in this category.
            </p>
          </div>
        )}
      </div>

      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        video={selectedVideo}
      />
    </main>
  );
};

export default Work;
