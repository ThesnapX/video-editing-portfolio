import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import gsap from "gsap";

const AddEditModal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".modal-container",
        { scale: 0.9, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out" },
      );
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="modal-container relative max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass rounded-2xl overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <FiX size={24} />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AddEditModal;
