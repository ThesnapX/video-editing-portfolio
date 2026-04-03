import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiEdit2, FiTrash2, FiPlay, FiX } from "react-icons/fi";
import AddEditModal from "./AddEditModal";
import ConfirmModal from "./ConfirmModal";

const ManageWorks = () => {
  const [works, setWorks] = useState([]);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingWork, setEditingWork] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    categories: [],
    relatedServices: [],
    description: "",
    duration: "",
    client: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [worksRes, servicesRes, categoriesRes] = await Promise.all([
        axios.get("/api/work"),
        axios.get("/api/services"),
        axios.get("/api/categories"),
      ]);
      setWorks(worksRes.data);
      setServices(servicesRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingWork(null);
    setFormData({
      title: "",
      videoUrl: "",
      categories: [],
      relatedServices: [],
      description: "",
      duration: "",
      client: "",
    });
    setModalOpen(true);
  };

  const handleEditClick = (work) => {
    setEditingWork(work);
    setFormData({
      title: work.title,
      videoUrl: work.videoUrl,
      categories: work.categories || [],
      relatedServices: work.relatedServices?.map((s) => s._id) || [],
      description: work.description || "",
      duration: work.duration || "",
      client: work.client || "",
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
      await fetchData();
      setConfirmOpen(false);
    } catch (err) {
      console.error("Error deleting work:", err);
      alert("Failed to delete work. Please try again.");
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !formData.categories.includes(newCategory)) {
      setFormData({
        ...formData,
        categories: [...formData.categories, newCategory],
      });
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (category) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter((c) => c !== category),
    });
  };

  const handleServiceToggle = (serviceId) => {
    setFormData({
      ...formData,
      relatedServices: formData.relatedServices.includes(serviceId)
        ? formData.relatedServices.filter((id) => id !== serviceId)
        : [...formData.relatedServices, serviceId],
    });
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
      await fetchData();
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
              <div className="flex flex-wrap gap-1 mb-3">
                {work.categories?.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs px-2 py-1 bg-primary/20 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
              {work.client && (
                <p className="text-sm text-gray-400 mb-2">
                  Client: {work.client}
                </p>
              )}
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
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-y-auto px-2"
        >
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
            <label className="block text-sm font-medium mb-2">
              Categories (Multiple)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddCategory())
                }
                className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
                placeholder="Enter new category"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80"
              >
                Add
              </button>
            </div>

            {/* Existing Categories */}
            <div className="mb-2">
              <p className="text-sm text-gray-400 mb-2">
                Or select from existing:
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    type="button"
                    onClick={() => {
                      if (!formData.categories.includes(cat.name)) {
                        setFormData({
                          ...formData,
                          categories: [...formData.categories, cat.name],
                        });
                      }
                    }}
                    className="text-xs px-3 py-1 bg-gray-700 hover:bg-primary/50 rounded-full transition"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Categories */}
            {formData.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.categories.map((cat) => (
                  <span
                    key={cat}
                    className="flex items-center gap-2 text-xs px-3 py-1 bg-primary/30 rounded-full"
                  >
                    {cat}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(cat)}
                      className="hover:text-red-400"
                    >
                      <FiX size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Related Services (Multiple)
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {services.map((service) => (
                <label
                  key={service._id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded-lg cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.relatedServices.includes(service._id)}
                    onChange={() => handleServiceToggle(service._id)}
                    className="w-4 h-4 text-primary rounded"
                  />
                  <img
                    src={service.thumbnail}
                    alt={service.title}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span className="flex-1">{service.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Client Name
            </label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) =>
                setFormData({ ...formData, client: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Client name (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
              placeholder="e.g., 2:30 mins"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows="3"
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Project description (optional)"
            />
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
