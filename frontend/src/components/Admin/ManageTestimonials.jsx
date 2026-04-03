import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import AddEditModal from "./AddEditModal";
import ConfirmModal from "./ConfirmModal";

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    message: "",
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("/api/testimonials");
      setTestimonials(res.data);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setEditingTestimonial(null);
    setFormData({ firstName: "", lastName: "", profession: "", message: "" });
    setModalOpen(true);
  };

  const handleEditClick = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      firstName: testimonial.firstName,
      lastName: testimonial.lastName,
      profession: testimonial.profession,
      message: testimonial.message,
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
      await axios.delete(`/api/testimonials/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchTestimonials();
      setConfirmOpen(false);
    } catch (err) {
      console.error("Error deleting testimonial:", err);
      alert("Failed to delete testimonial. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    try {
      if (editingTestimonial) {
        await axios.put(
          `/api/testimonials/${editingTestimonial._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      } else {
        await axios.post("/api/testimonials", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      await fetchTestimonials();
      setModalOpen(false);
    } catch (err) {
      console.error("Error saving testimonial:", err);
      alert("Failed to save testimonial. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-400">
        Loading testimonials...
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Testimonials</h2>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-primary/80 transition"
        >
          <FiPlus /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className="glass rounded-xl p-6 hover:neon-border transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl font-bold">
                {testimonial.firstName[0]}
                {testimonial.lastName[0]}
              </div>
              <div className="ml-3">
                <h3 className="font-bold">
                  {testimonial.firstName} {testimonial.lastName}
                </h3>
                <p className="text-sm text-gray-400">
                  {testimonial.profession}
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 line-clamp-3">
              "{testimonial.message}"
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditClick(testimonial)}
                className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-500 rounded-lg hover:bg-blue-500/30 transition flex items-center justify-center gap-2"
              >
                <FiEdit2 /> Edit
              </button>
              <button
                onClick={() => handleDeleteClick(testimonial._id)}
                className="flex-1 px-3 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition flex items-center justify-center gap-2"
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No testimonials added yet. Click "Add Testimonial" to get started.
        </div>
      )}

      <AddEditModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Profession *
            </label>
            <input
              type="text"
              value={formData.profession}
              onChange={(e) =>
                setFormData({ ...formData, profession: e.target.value })
              }
              required
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
              placeholder="e.g., YouTuber, CEO, Musician"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Testimonial Message *
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              rows="4"
              className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary"
              placeholder="What did the client say?"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition"
          >
            {editingTestimonial ? "Update" : "Add"} Testimonial
          </button>
        </form>
      </AddEditModal>

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
      />
    </div>
  );
};

export default ManageTestimonials;
