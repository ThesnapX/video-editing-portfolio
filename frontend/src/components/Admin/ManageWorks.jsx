import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiEdit2, FiTrash2, FiPlay } from "react-icons/fi";
import AddEditModal from "./AddEditModal";
import ConfirmModal from "./ConfirmModal";

const ManageWorks = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingWork, setEditingWork] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    category: "all",
  });

  const categories = [
    { value: "all", label: "All" },
    { value: "commercial", label: "Commercial" },
    { value: "music-video", label: "Music Video" },
    { value: "corporate", label: "Corporate" },
    { value: "social-media", label: "Social Media" },
    { value: "trailer", label: "Trailer" },
  ];

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const res = await axios.get("/api/work");
      setWorks(res.data);
    } catch (err) {
      console.error("Error fetching works:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingWork(null);
    setFormData({ title: "", videoUrl: "", category: "all" });
    setModalOpen(true);
  };

  const handleEditClick = (work) => {
    setEditingWork(work);
    setFormData({
      title: work.title,
      videoUrl: work.videoUrl,
      category: work.category,
    });
    setModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`/api/work/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchWorks();
      setConfirmOpen(false);
    } catch (err) {
      console.error("Error deleting work:", err);
      alert("Failed to delete work. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    try {
      if (editingWork) {
        await axios.put(`/api/work/${editingWork._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/api/work", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      await fetchWorks();
      setModalOpen(false);
    } catch (err) {
      console.error("Error saving work:", err);
      alert("Failed to save work. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-400">Loading works...</div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Works</h2>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-primary/80 transition"
        >
          <FiPlus /> Add Work
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work) => (
          <div
            key={work._id}
            className="glass rounded-xl overflow-hidden hover:neon-border transition-all duration-300"
          >
            <div className="relative aspect-video">
              <img
                src={work.thumbnail}
                alt={work.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <FiPlay className="text-white text-4xl" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{work.title}</h3>
              <p className="text-sm text-gray-400 mb-3">
                Category: {work.category}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(work)}
                  className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 transition flex items-center justify-center gap-2"
                >
                  <FiEdit2 /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(work._id)}
                  className="flex-1 px-3 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition flex items-center justify-center gap-2"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {works.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No works added yet. Click "Add Work" to get started.
        </div>
      )}

      <AddEditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingWork ? "Edit Work" : "Add New Work"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Enter video title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              YouTube URL *
            </label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) =>
                setFormData({ ...formData, videoUrl: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition"
          >
            {editingWork ? "Update" : "Add"} Work
          </button>
        </form>
      </AddEditModal>

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Work"
        message="Are you sure you want to delete this work? This action cannot be undone."
      />
    </div>
  );
};

export default ManageWorks;
