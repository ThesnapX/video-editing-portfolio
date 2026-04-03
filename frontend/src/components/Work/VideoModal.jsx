import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
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

      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const extractVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?#]+)/,
    );
    return match ? match[1] : null;
  };

  if (!isOpen || !video) return null;

  const videoId = extractVideoId(video.videoUrl);

  // YouTube embed URL with NO branding, NO recommendations, minimal UI
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&color=white&theme=dark&controls=1&fs=1&playsinline=1&disablekb=0&cc_load_policy=0`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="video-modal-content relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-primary transition-colors text-2xl z-10"
        >
          <FiX />
        </button>

        {/* Video Container */}
        <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
          <div className="relative aspect-video">
            <iframe
              src={embedUrl}
              title={video.title}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        </div>

        {/* Only keyboard hint - no duplicate title */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm">Press ESC to close</p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
