import React, { useState } from "react";
import axios from "axios";
import { FiTrash2, FiUpload } from "react-icons/fi";

const AddService = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null,
  });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Image size should be less than 5MB" });
      return;
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setMessage({
        type: "error",
        text: "Only JPG, PNG, and WEBP images are allowed",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setFormData({
      ...formData,
      thumbnail: file,
    });
    setMessage("");
  };

  const handleDeleteImage = () => {
    setPreview("");
    setFormData({
      ...formData,
      thumbnail: null,
    });
    // Clear the file input
    const fileInput = document.getElementById("thumbnail-input");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.title.trim()) {
      setMessage({ type: "error", text: "Service title is required" });
      return;
    }

    if (!formData.description.trim()) {
      setMessage({ type: "error", text: "Service description is required" });
      return;
    }

    if (!formData.thumbnail) {
      setMessage({ type: "error", text: "Service thumbnail is required" });
      return;
    }

    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("adminToken");
    const data = new FormData();
    data.append("title", formData.title.trim());
    data.append("description", formData.description.trim());
    data.append("thumbnail", formData.thumbnail);

    try {
      console.log("Sending request to /api/services");
      console.log("Form data:", {
        title: formData.title,
        description: formData.description,
        thumbnail: formData.thumbnail.name,
      });

      const response = await axios.post("/api/services", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);
      setMessage({ type: "success", text: "Service added successfully!" });

      // Reset form
      setFormData({ title: "", description: "", thumbnail: null });
      setPreview("");
      const fileInput = document.getElementById("thumbnail-input");
      if (fileInput) {
        fileInput.value = "";
      }

      // Clear success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error adding service:", err);

      let errorMessage = "Something went wrong. Please try again.";

      if (err.response) {
        // Server responded with error
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);

        if (err.response.status === 400) {
          errorMessage =
            err.response.data.message ||
            "Bad request. Please check your inputs.";
        } else if (err.response.status === 401) {
          errorMessage = "Session expired. Please login again.";
          setTimeout(() => {
            localStorage.removeItem("adminToken");
            window.location.href = "/harry-admin-dashboard";
          }, 2000);
        } else if (err.response.status === 500) {
          errorMessage = "Server error. Please check if backend is running.";
        } else {
          errorMessage = err.response.data.message || errorMessage;
        }
      } else if (err.request) {
        // Request was made but no response
        errorMessage =
          "Cannot connect to server. Please check if backend is running on port 5000.";
      } else {
        // Something else happened
        errorMessage = err.message || errorMessage;
      }

      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6">Add New Service</h2>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-500/20 text-green-500 border border-green-500/30"
              : "bg-red-500/20 text-red-500 border border-red-500/30"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Service Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition"
            placeholder="e.g., Commercial Video Editing"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition"
            placeholder="Describe the service in detail..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Thumbnail Image (16:9 ratio) *
          </label>

          {/* Image Preview */}
          {preview && (
            <div className="relative mb-4 rounded-lg overflow-hidden border border-gray-700">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-64 object-cover"
              />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 rounded-lg text-white transition-all duration-200"
                title="Delete image"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          )}

          {/* Upload Button */}
          <div className="flex items-center gap-4">
            <label
              className={`flex-1 cursor-pointer ${preview ? "opacity-50" : ""}`}
            >
              <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700/50 transition">
                <FiUpload />
                <span>{preview ? "Change Image" : "Choose Image"}</span>
              </div>
              <input
                id="thumbnail-input"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {preview && (
              <button
                type="button"
                onClick={handleDeleteImage}
                className="px-4 py-3 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition"
              >
                <FiTrash2 className="inline mr-2" />
                Delete
              </button>
            )}
          </div>

          <p className="text-sm text-gray-400 mt-2">
            Recommended size: 1920x1080 pixels (16:9 ratio). Max 5MB.
            <br />
            Supported formats: JPG, PNG, WEBP
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding Service..." : "Add Service"}
        </button>
      </form>
    </div>
  );
};

export default AddService;
