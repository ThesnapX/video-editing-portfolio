import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import ReactPlayer from "react-player";
import gsap from "gsap";

const VideoModal = ({ isOpen, onClose, video }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      gsap.fromTo(
        ".video-modal-content",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out" },
      );
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="video-modal-content relative w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-primary text-2xl"
        >
          <FiX />
        </button>

        <div className="aspect-video rounded-xl overflow-hidden">
          <ReactPlayer
            url={video.videoUrl}
            width="100%"
            height="100%"
            controls
            playing
            config={{
              youtube: {
                playerVars: { modestbranding: 1, rel: 0 },
              },
            }}
          />
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-2xl font-bold">{video.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
