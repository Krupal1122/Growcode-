// src/components/projects/ProjectDetailsPage.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useSidebar } from "../../SidebarContext";

export default function ProjectDetailsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const { isCollapsed } = useSidebar();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/projects");
      const formattedProjects = response.data.map((project) => ({
        id: project._id,
        title: project.title || "Untitled Project",
        image: project.image || "https://via.placeholder.com/150",
        platform: project.platform || "N/A",
        category: project.category || "N/A",
        date: new Date(project.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        createdAt: new Date(project.createdAt),
      }));
      setProjects(formattedProjects);
      setFilteredProjects(formattedProjects);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again later.");
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1);
    const filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(query)
    );
    setFilteredProjects(filtered);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newSortOrder);
    const sortedProjects = [...filteredProjects].sort((a, b) =>
      newSortOrder === "desc"
        ? b.createdAt - a.createdAt
        : a.createdAt - b.createdAt
    );
    setFilteredProjects(sortedProjects);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this project? This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-xl shadow-lg",
        confirmButton: "px-4 py-2 rounded-full",
        cancelButton: "px-4 py-2 rounded-full",
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`);
        setProjects(projects.filter((project) => project.id !== id));
        setFilteredProjects(filteredProjects.filter((project) => project.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Project deleted successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          customClass: {
            popup: "rounded-xl shadow-lg",
            confirmButton: "px-4 py-2 rounded-full",
          },
        });
      } catch (error) {
        console.error("Error deleting project:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete project. Please try again later.",
          icon: "error",
          confirmButtonColor: "#d33",
          customClass: {
            popup: "rounded-xl shadow-lg",
            confirmButton: "px-4 py-2 rounded-full",
          },
        });
      }
    }
  };

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 transition-all duration-300 flex-1 ${
        isCollapsed ? "ml-16" : "ml-10"
      }`}
    >
      <div className="w-full p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-6 rounded-xl mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Submitted Projects
          </h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            
            <Link to="/admin/projects/add">
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Data
              </button>
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="animate-pulse flex flex-col space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="h-16 w-16 bg-gray-200 rounded-md"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="flex items-center justify-center h-32 flex-col space-y-4">
              <p className="text-red-600 text-lg font-medium">{error}</p>
              <button
                onClick={fetchProjects}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-sm"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Platform
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentProjects.length > 0 ? (
                    currentProjects.map((project) => (
                      <tr
                        key={project.id}
                        className="hover:bg-gray-50 transition duration-200"
                      >
                        <td className="px-6 py-4">
                          <div className="relative w-16 h-16 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transform hover:scale-110 transition duration-300"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-800 font-semibold text-lg truncate max-w-xs">
                            {project.title}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {project.platform}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {project.category}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {project.date}
                        </td>
                        <td className="px-6 py-4 flex space-x-2">
                          <Link
                            to={`/admin/projects/edit/${project.id}`}
                            state={{ project }}
                            className="inline-flex items-center gap-2 text-yellow-500 px-4 py-2 rounded-full hover:text-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-sm text-sm font-medium"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="inline-flex items-center gap-2 text-red-600 px-4 py-2 rounded-full hover:text-red-700 transform hover:scale-105 transition-all duration-300 shadow-sm text-sm font-medium"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-8 text-center text-gray-500 text-lg"
                      >
                        No projects found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between p-6 bg-white border-t border-gray-200">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-sm"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous
                </button>

                <div className="flex items-center space-x-2">
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                          currentPage === page
                            ? "bg-indigo-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-sm"
                  }`}
                >
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}