import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import AddEditModal from "./AddEditModal";
import ConfirmModal from "./ConfirmModal";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("/api/services");
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingService(null);
    setFormData({ title: "", description: "", thumbnail: null });
    setPreview("");
    setModalOpen(true);
  };

  const handleEditClick = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      thumbnail: null,
    });
    setPreview(service.thumbnail);
    setModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`/api/services/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchServices();
      setConfirmOpen(false);
    } catch (err) {
      console.error("Error deleting service:", err);
      alert("Failed to delete service. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, thumbnail: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.thumbnail) {
      data.append("thumbnail", formData.thumbnail);
    }

    try {
      if (editingService) {
        await axios.put(`/api/services/${editingService._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/api/services", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      await fetchServices();
      setModalOpen(false);
    } catch (err) {
      console.error("Error saving service:", err);
      alert("Failed to save service. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-400">Loading services...</div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Services</h2>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-primary/80 transition"
        >
          <FiPlus /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="glass rounded-xl overflow-hidden hover:neon-border transition-all duration-300"
          >
            <div className="aspect-video">
              <img
                src={service.thumbnail}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                {service.description}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(service)}
                  className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 transition flex items-center justify-center gap-2"
                >
                  <FiEdit2 /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(service._id)}
                  className="flex-1 px-3 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition flex items-center justify-center gap-2"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No services added yet. Click "Add Service" to get started.
        </div>
      )}

      <AddEditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingService ? "Edit Service" : "Add New Service"}
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
              placeholder="Enter service title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows="4"
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
              placeholder="Describe the service..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Thumbnail Image
            </label>
            {preview && (
              <div className="mb-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-48 object-cover rounded-lg"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
            />
            <p className="text-xs text-gray-400 mt-1">
              Leave empty to keep current image when editing
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition"
          >
            {editingService ? "Update" : "Add"} Service
          </button>
        </form>
      </AddEditModal>

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
      />
    </div>
  );
};

export default ManageServices;
