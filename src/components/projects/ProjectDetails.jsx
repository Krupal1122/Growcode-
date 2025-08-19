import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProjectDetails = () => {
  const { id } = useParams(); // Get project ID from URL
  console.log("Project ID from URL:", id); // Debug: Log ID
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        console.log("Fetching project with ID:", id);

        // Try fetching single project by ID
        let response;
        try {
          response = await axios.get(`http://localhost:5000/api/projects/${id}`);
          console.log("Fetched project:", response.data); // Debug: Log fetched project
          setProject(response.data);
        } catch (err) {
          console.warn("Single project fetch failed, trying to fetch all projects:", err.message);
          // Fallback: Fetch all projects and filter by _id
          response = await axios.get("http://localhost:5000/api/projects");
          console.log("Fetched all projects:", response.data); // Debug: Log all projects
          const project = response.data.find((p) => p._id === id);
          if (!project) {
            throw new Error("Project not found in fallback fetch");
          }
          console.log("Found project in fallback:", project); // Debug: Log found project
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

  // Render project details
  const renderProjectDetails = () => {
    const dynamicFields = project.dynamicFields || [];
    console.log("Rendering dynamicFields:", dynamicFields); // Debug: Log dynamicFields before rendering

    return (
      <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
        {/* Project Image */}
        {project.image && (
        <div className="mb-8 flex justify-center">
  <img
    src={project.image || "https://via.placeholder.com/600x400"}
    alt={project.title || "Project"}
    className="max-w-[100%] h-auto object-cover rounded-xl shadow-lg"
  />
</div>
        )}

        {/* Details Section */}
        <div className="flex grid-cols-1 md:grid-cols-5 gap-52 text-center">
          {/* Platform */}
          {project.platform && (
            <div>
              <h3 className="text-xs uppercase text-gray-500 tracking-wide">Platform</h3>
              <p className="mt-1 text-base font-semibold text-gray-800">{project.platform}</p>
            </div>
          )}

          {/* Category */}
          {project.category && (
            <div>
              <h3 className="text-xs uppercase text-gray-500 tracking-wide">Category</h3>
              <p className="mt-1 text-base font-semibold text-gray-800">{project.category}</p>
            </div>
          )}

          {/* Live View */}
          {project.liveView && (
            <div>
              <h3 className="text-xs uppercase text-gray-500 tracking-wide">Live View</h3>
              <a
                href={project.liveView}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-base font-semibold text-blue-600 hover:underline"
              >
                {project.liveView}
              </a>
            </div>
          )}

          {/* Timelines */}
          {project.timelines && (
            <div>
              <h3 className="text-xs uppercase text-gray-500 tracking-wide">Timelines</h3>
              <p className="mt-1 text-base font-semibold text-gray-800">{project.timelines}</p>
            </div>
          )}

          {/* Services Provided */}
          {project.services && (
            <div>
              <h3 className="text-xs uppercase text-gray-500 tracking-wide">Service We Provided</h3>
              <p className="mt-1 text-base font-semibold text-gray-800">{project.services}</p>
            </div>
          )}
        </div>
        <hr className="my-8 border-gray-300" />

        {/* Dynamic Fields Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Project Highlights</h2>
          {dynamicFields.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dynamicFields.map((field, index) => {
                if (field.type === "image") {
                  return (
                    <div key={index} className="flex justify-center items-center col-span-2">
                      <img
                        src={field.value || "https://via.placeholder.com/600x400"}
                        alt={`Dynamic Image ${index + 1}`}
                        className="w-full max-w-[500px] rounded-2xl shadow-lg object-cover"
                        style={{ background: "#f5f7fa" }}
                      />
                    </div>
                  );
                } else if (field.type === "title") {
                  // Title on left half (col 1)
                  return (
                    <div key={index} className="md:col-span-1 col-span-1 flex items-start">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 text-left w-full">
                        {field.value || "N/A"}
                      </h3>
                    </div>
                  );
                } else if (field.type === "description") {
                  // Description on right half (col 2)
                  return (
                    <div key={index} className="md:col-start-2 md:col-span-1 col-span-1 flex items-start">
                      <p className="text-base text-gray-700 mb-4 text-left w-full">
                        {field.value || "N/A"}
                      </p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <p className="text-base text-gray-500 text-center">No additional details available.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="">
      <div className="">
        <h2 className="text-5xl font-bold  mb-6 text-center">
          {project.title || "Project Details"}
        </h2>
        {renderProjectDetails()}
      </div>
    </section>
  );
};

export default ProjectDetails;