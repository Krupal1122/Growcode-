// src/components/PortfolioPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/projects");

        const formattedProjects = response.data.map((project, index) => ({
          id: index, // Add an ID for routing
          title: project.title || "Untitled Project",
          description: project.services
            ? `A project focused on ${project.category} with services including ${project.services}.`
            : "A dynamic project showcasing innovative solutions.",
          image: project.image || "https://via.placeholder.com/150",
          tech: project.services
            ? project.services.split(", ").map((s) => s.trim())
            : [],
          liveView: project.liveView || "#",
          category: project.category || "General",
        }));

        setProjects(formattedProjects);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Please try again later.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Categories
  const categories = ["All", "Mobile", "UI/UX", "Website"];

  // Filter projects
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <section className="bg-gray-50 py-24 px-6 font-sans min-h-screen">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Portfolio
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Semicolon Solution is the leading agency for digital solutions. With
            a team of experts, we build what you need most to launch your
            business online.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-16">
          <div className="flex space-x-6 bg-white border rounded-full px-6 py-3 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-lg font-medium transition ${
                  activeCategory === cat
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center">
            <div className="animate-pulse space-y-12">
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-xl p-6 flex w-full"
                >
                  <div className="w-1/2 h-96 bg-gray-200 rounded-l-3xl"></div>
                  <div className="w-1/2 p-6 flex flex-col justify-center">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-16 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Projects */}
        {!loading && !error && (
          <div className="space-y-20">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`flex w-full items-center ${
                    index % 2 === 0 ? "" : "flex-row-reverse"
                  }`}
                >
                  {/* Image */}
                  <div className="w-1/2 overflow-hidden rounded-3xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-96 object-cover rounded-3xl shadow-lg"
                    />
                  </div>

                  {/* Text */}
                  <div className="w-1/2 p-10">
                    <h3 className="text-3xl font-semibold text-gray-900 mb-4">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-lg mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-6">
                      <Link
                        to={`/project/${project.id}`}
                        state={{ project }} // Pass project data via state
                        className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition text-lg font-medium"
                      >
                        View Case Study
                      </Link>
                      <a
                        href={project.liveView}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition text-lg font-medium"
                      >
                        Live Link
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 text-xl py-12">
                No projects found in this category.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioPage;