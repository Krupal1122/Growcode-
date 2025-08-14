// src/components/projects/ProjectDetailsForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Added Link import
import axios from "axios";
import Swal from "sweetalert2";

const MAX_IMAGE_SIZE_MB = 100; // Maximum image size in MB

const ProjectDetailsForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: location.state?.project?.title || "",
    platform: location.state?.project?.platform || "",
    category: location.state?.project?.category || "",
    liveView: location.state?.project?.liveView || "",
    timelines: location.state?.project?.timelines || "",
    services: location.state?.project?.services || "",
  });
  const [selectedImage, setSelectedImage] = useState(location.state?.project?.image || null);
  const [imageUrl, setImageUrl] = useState(location.state?.project?.image || null);
  const [isEditing, setIsEditing] = useState(!!location.state?.project);
  const [isUploading, setIsUploading] = useState(false);
  const projectId = location.state?.project?.id;

  useEffect(() => {
    if (location.state?.project) {
      setFormData({
        title: location.state.project.title || "",
        platform: location.state.project.platform || "",
        category: location.state.project.category || "",
        liveView: location.state.project.liveView || "",
        timelines: location.state.project.timelines || "",
        services: location.state.project.services || "",
      });
      setSelectedImage(location.state.project.image || null);
      setImageUrl(location.state.project.image || null);
      setIsEditing(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        Swal.fire({
          title: "File Too Large!",
          text: `Image size must be less than ${MAX_IMAGE_SIZE_MB}MB.`,
          icon: "warning",
          confirmButtonColor: "#3085d6",
          customClass: {
            popup: "rounded-xl shadow-lg",
            confirmButton: "px-4 py-2 rounded-full",
          },
        });
        return;
      }

      setIsUploading(true);
      setSelectedImage(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("http://localhost:5000/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setImageUrl(response.data.url);
      } catch (error) {
        console.error("Error uploading image:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to upload image. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
          customClass: {
            popup: "rounded-xl shadow-lg",
            confirmButton: "px-4 py-2 rounded-full",
          },
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = [];
    if (!formData.title.trim()) errors.push("Please enter a non-empty project title.");
    if (!imageUrl) errors.push("Please upload an image.");
    if (!formData.platform.trim()) errors.push("Please enter a platform.");
    if (!formData.category.trim()) errors.push("Please enter a category.");
    if (!formData.liveView.trim()) errors.push("Please enter a live view link.");
    if (!formData.timelines.trim()) errors.push("Please enter timelines.");
    if (!formData.services.trim()) errors.push("Please enter services provided.");

    if (errors.length > 0) {
      Swal.fire({
        title: "Validation Error!",
        html: errors.join("<br>"),
        icon: "warning",
        confirmButtonColor: "#3085d6",
        customClass: {
          popup: "rounded-xl shadow-lg",
          confirmButton: "px-4 py-2 rounded-full",
        },
      });
      return;
    }

    if (isUploading) {
      Swal.fire({
        title: "Please Wait!",
        text: "Image is still uploading. Please wait before submitting.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        customClass: {
          popup: "rounded-xl shadow-lg",
          confirmButton: "px-4 py-2 rounded-full",
        },
      });
      return;
    }

    try {
      const payload = {
        title: formData.title.trim(),
        image: imageUrl,
        platform: formData.platform.trim(),
        category: formData.category.trim(),
        liveView: formData.liveView.trim(),
        timelines: formData.timelines.trim(),
        services: formData.services.trim(),
      };

      if (isEditing) {
        await axios.put(`http://localhost:5000/api/projects/${projectId}`, payload, {
          headers: { "Content-Type": "application/json" },
        });
        Swal.fire({
          title: "Success!",
          text: "Project updated successfully!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          customClass: {
            popup: "rounded-xl shadow-lg",
            confirmButton: "px-4 py-2 rounded-full",
          },
          timer: 2000,
          timerProgressBar: true,
        });
      } else {
        await axios.post("http://localhost:5000/api/projects", payload, {
          headers: { "Content-Type": "application/json" },
        });
        Swal.fire({
          title: "Success!",
          text: "Project data saved to MongoDB!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          customClass: {
            popup: "rounded-xl shadow-lg",
            confirmButton: "px-4 py-2 rounded-full",
          },
          timer: 2000,
          timerProgressBar: true,
        });
      }

      setFormData({
        title: "",
        platform: "",
        category: "",
        liveView: "",
        timelines: "",
        services: "",
      });
      setSelectedImage(null);
      setImageUrl(null);
      setIsEditing(false);
      navigate("/admin/projects");
    } catch (error) {
      console.error("Error submitting project:", error.response?.data || error.message);
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          (isEditing ? "Error updating project data." : "Error saving project data."),
        icon: "error",
        confirmButtonColor: "#d33",
        customClass: {
          popup: "rounded-xl shadow-lg",
          confirmButton: "px-4 py-2 rounded-full",
        },
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        {isEditing ? "✏️ Edit Project" : "📝 Add Project"}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload */}
        <div className="lg:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">Project Image</label>
          <label
            htmlFor="imageUpload"
            className="w-full flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-8 cursor-pointer hover:border-blue-600 transition"
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Preview"
                className="max-h-64 object-contain mb-3 rounded-lg"
              />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-blue-500 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 15a4 4 0 014-4h1a4 4 0 018 0h1a4 4 0 014 4v5H3v-5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11V3m0 0l-4 4m4-4l4 4"
                  />
                </svg>
                <span className="text-blue-500 font-medium">
                  {isUploading ? "Uploading..." : "Click to upload an image"}
                </span>
              </>
            )}
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., My Project"
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Platform */}
        <div>
          <label className="block text-gray-700 font-medium">Platform</label>
          <input
            type="text"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            placeholder="e.g., Appstore"
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Decentralized Finance/Fintech"
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Live View */}
        <div>
          <label className="block text-gray-700 font-medium">Live View Link</label>
          <input
            type="url"
            name="liveView"
            value={formData.liveView}
            onChange={handleChange}
            placeholder="e.g., https://example.com"
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Timelines */}
        <div>
          <label className="block text-gray-700 font-medium">Timelines</label>
          <input
            type="text"
            name="timelines"
            value={formData.timelines}
            onChange={handleChange}
            placeholder="e.g., 3-4 Months"
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Services */}
        <div className="lg:col-span-2">
          <label className="block text-gray-700 font-medium">Services Provided</label>
          <textarea
            name="services"
            value={formData.services}
            onChange={handleChange}
            placeholder="e.g., Frontend, Backend, Cloud notification and Application"
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="lg:col-span-2 flex gap-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isEditing ? "✅ Update" : "✅ Submit"}
          </button>
          <Link
            to="/admin/projects"
            className="w-full text-center bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProjectDetailsForm;