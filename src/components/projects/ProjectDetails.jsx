// src/components/ProjectDetails.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProjectDetails = () => {
  const { id } = useParams(); // Get project ID from URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        console.log("Fetching project with ID:", id); // Debug log

        // Try fetching single project by ID
        let response;
        try {
          response = await axios.get(`http://localhost:5000/api/projects/${id}`);
          console.log("API response:", response.data); // Debug log
          setProject(response.data);
        } catch (err) {
          console.warn("Single project fetch failed, trying to fetch all projects:", err.message);
          // Fallback: Fetch all projects and filter by ID
          response = await axios.get("http://localhost:5000/api/projects");
          const project = response.data.find((p, index) => index === parseInt(id));
          if (!project) {
            throw new Error("Project not found in fallback fetch");
          }
          console.log("Fallback project found:", project); // Debug log
          setProject(project);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(`Failed to load project details: ${err.message}. Please try again later.`);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Loading project details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div

 className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Project Not Found"}
          </h2>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition mr-4"
          >
            Retry
          </button>
          <Link
            to="/portfolio"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  // Dynamically render all project fields
  const renderProjectDetails = () => {
    const excludeFields = ["_id", "__v"]; // Exclude MongoDB metadata
    const details = Object.entries(project).filter(
      ([key]) => !excludeFields.includes(key)
    );

    return details.map(([key, value]) => {
      // Handle arrays (e.g., services, tech)
      if (Array.isArray(value)) {
        return (
          <div key={key} className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </h3>
            <div className="flex flex-wrap gap-2">
              {value.map((item, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        );
      }
      // Handle images
      if (key.toLowerCase().includes("image")) {
        return (
          <div key={key} className="mb-6">
            <img
              src={value || "https://via.placeholder.com/150"}
              alt={project.title || "Project"}
              className="w-full h-96 object-cover rounded-3xl"
            />
          </div>
        );
      }
      // Handle URLs
      if (key.toLowerCase().includes("url") || key.toLowerCase().includes("link")) {
        return (
          <div key={key} className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </h3>
            <a
              href={value || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {value || "No link available"}
            </a>
          </div>
        );
      }
      // Handle other fields
      return (
        <div key={key} className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </h3>
          <p className="text-gray-600 text-lg">{value || "N/A"}</p>
        </div>
      );
    });
  };

  return (
    <section className="bg-gray-50 py-24 px-6 font-sans min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
       

        {/* Project Details */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {project.title || "Project Details"}
          </h2>
          {renderProjectDetails()}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;