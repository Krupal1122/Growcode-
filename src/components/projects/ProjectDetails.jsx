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
      <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-400 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg">Loading project details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-400 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {error || "Project Not Found"}
          </h2>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-purple-600 px-6 py-2 rounded-full hover:bg-gray-100 transition mr-4"
          >
            Retry
          </button>
          <Link
            to="/portfolio"
            className="bg-white text-purple-600 px-6 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  // Custom rendering to match the full-screen image layout
  const renderProjectDetails = () => {
    const excludeFields = ["_id", "__v"]; // Exclude MongoDB metadata
    const details = Object.entries(project).filter(
      ([key]) => !excludeFields.includes(key)
    );

    return (
      <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
      {/* Project Image */}
      {details.find(([key]) => key.toLowerCase().includes("image")) && (
        <div className="mb-8">
          <img
            src={
              details.find(([key]) => key.toLowerCase().includes("image"))[1] ||
              "https://via.placeholder.com/600x400"
            }
            alt={project.title || "Project"}
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </div>
      )}

      {/* Details Section */}
      <div className="flex grid-cols-1 md:grid-cols-5 gap-52 text-center">
        {/* Platform */}
        {details.find(([key]) => key.toLowerCase().includes("platform")) && (
          <div>
            <h3 className="text-xs uppercase text-gray-500 tracking-wide">
              Platform
            </h3>
            <p className="mt-1 text-base font-semibold text-gray-800">
              {details.find(([key]) =>
                key.toLowerCase().includes("platform")
              )[1] || "N/A"}
            </p>
          </div>
        )}

        {/* Category */}
        {details.find(([key]) => key.toLowerCase().includes("category")) && (
          <div>
            <h3 className="text-xs uppercase text-gray-500 tracking-wide">
              Category
            </h3>
            <p className="mt-1 text-base font-semibold text-gray-800">
              {details.find(([key]) =>
                key.toLowerCase().includes("category")
              )[1] || "N/A"}
            </p>
          </div>
        )}

        {/* Live View */}
        {details.find(
          ([key]) =>
            key.toLowerCase().includes("live") ||
            key.toLowerCase().includes("view")
        ) && (
          <div>
            <h3 className="text-xs uppercase text-gray-500 tracking-wide">
              Live View
            </h3>
            <a
              href={
                details.find(
                  ([key]) =>
                    key.toLowerCase().includes("live") ||
                    key.toLowerCase().includes("view")
                )[1] || "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-base font-semibold text-blue-600 hover:underline"
            >
              {details.find(
                ([key]) =>
                  key.toLowerCase().includes("live") ||
                  key.toLowerCase().includes("view")
              )[1] || "No link"}
            </a>
          </div>
        )}

        {/* Timelines */}
        {details.find(([key]) => key.toLowerCase().includes("time")) && (
          <div>
            <h3 className="text-xs uppercase text-gray-500 tracking-wide">
              Timelines
            </h3>
            <p className="mt-1 text-base font-semibold text-gray-800">
              {details.find(([key]) =>
                key.toLowerCase().includes("time")
              )[1] || "N/A"}
            </p>
          </div>
        )}

        {/* Services Provided */}
        {details.find(([key]) => key.toLowerCase().includes("service")) && (
          <div>
            <h3 className="text-xs uppercase text-gray-500 tracking-wide">
              Service We Provided
            </h3>
            {Array.isArray(
              details.find(([key]) => key.toLowerCase().includes("service"))[1]
            ) ? (
              <div className="flex flex-col items-center mt-1 space-y-1">
                {details
                  .find(([key]) => key.toLowerCase().includes("service"))[1]
                  .map((item, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
              </div>
            ) : (
              <p className="mt-1 text-base font-semibold text-gray-800">
                {
                  details.find(([key]) =>
                    key.toLowerCase().includes("service")
                  )[1]
                }
              </p>
            )}
          </div>
        )}
      </div>
    </div>
    );
  };

  return (
    <section className="">
      <div className="">
        
        <div className="">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            {project.title || "Project Details"}
          </h2>
          {renderProjectDetails()}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;