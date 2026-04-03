import React, { useEffect, useState } from "react";
import api from "../config/api";
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
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(["all"]);

  useEffect(() => {
    fetchWorks();
    gsap.fromTo(
      ".work-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
    );
  }, []);

  const fetchWorks = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching works from API...");
      const response = await api.get("/work");

      console.log("Works response:", response.data);

      let worksData = [];
      if (response.data && Array.isArray(response.data)) {
        worksData = response.data;
      } else if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        worksData = response.data.data;
      } else if (response.data && typeof response.data === "object") {
        worksData =
          Object.values(response.data).find((val) => Array.isArray(val)) || [];
      }

      setWorks(worksData);
      setFilteredWorks(worksData);

      // Extract unique categories
      const uniqueCategories = [
        "all",
        ...new Set(worksData.flatMap((work) => work.categories || [])),
      ];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Error fetching works:", err);
      setError(err.message || "Failed to load works");
      setWorks([]);
      setFilteredWorks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredWorks(works);
    } else {
      setFilteredWorks(
        works.filter(
          (work) => work.categories && work.categories.includes(activeCategory),
        ),
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
        <div className="text-primary text-xl">Loading work...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error loading work</div>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 gradient-bg text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-20">
      {/* Header */}
      <div className="work-header relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Video <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore my latest video editing projects across different genres
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-20 z-20 glass border-b border-white/10 py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                  activeCategory === category
                    ? "gradient-bg text-white shadow-lg"
                    : "glass text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Works Grid */}
      <div className="container mx-auto px-6 py-20">
        {filteredWorks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No videos found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorks.map((work, index) => (
              <VideoCard
                key={work._id || index}
                work={work}
                onClick={() => handleVideoClick(work)}
                index={index}
              />
            ))}
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
