import React, { useState } from "react";
import axios from "axios";

const AddWork = () => {
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    category: "all",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const categories = [
    { value: "all", label: "All" },
    { value: "commercial", label: "Commercial" },
    { value: "music-video", label: "Music Video" },
    { value: "corporate", label: "Corporate" },
    { value: "social-media", label: "Social Media" },
    { value: "trailer", label: "Trailer" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("adminToken");

    try {
      await axios.post("/api/work", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ type: "success", text: "Work added successfully!" });
      setFormData({ title: "", videoUrl: "", category: "all" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6">Add New Video Work</h2>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-500/20 text-green-500"
              : "bg-red-500/20 text-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition"
            placeholder="Enter video title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            YouTube URL *
          </label>
          <input
            type="url"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition"
            placeholder="https://youtube.com/watch?v=..."
          />
          <p className="text-sm text-gray-400 mt-1">
            Thumbnail will be automatically generated
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition"
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
          disabled={loading}
          className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Work"}
        </button>
      </form>
    </div>
  );
};

export default AddWork;
