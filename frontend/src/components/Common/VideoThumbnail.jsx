import React, { useState } from "react";
import VideoModal from "../Work/VideoModal";
import { FiPlay } from "react-icons/fi";

const VideoThumbnail = ({ work, className = "", showTitle = true }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div
        className={`group relative overflow-hidden rounded-xl cursor-pointer ${className}`}
        onClick={handleClick}
      >
        <img
          src={work.thumbnail}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          {showTitle && (
            <div>
              <h3 className="text-xl font-bold mb-2">{work.title}</h3>
              <span className="text-primary text-sm">Click to play →</span>
            </div>
          )}
        </div>
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center transform transition-transform group-hover:scale-110">
            <FiPlay className="text-white text-2xl ml-1" />
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        video={work}
      />
    </>
  );
};

export default VideoThumbnail;
