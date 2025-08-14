import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useSidebar } from "../../SidebarContext";

const FormCard = () => {
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]); // New state for filtered forms
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search
  const [sortOrder, setSortOrder] = useState("desc"); // New state for sort order
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const { isCollapsed } = useSidebar();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/forms");
      const formattedForms = response.data.map((form) => ({
        id: form._id,
        title: form.title,
        description: form.sections[0]?.questions[0]?.questionText || "No description available",
        image: form.image || "https://via.placeholder.com/150",
        date: new Date(form.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        createdAt: new Date(form.createdAt), // Store raw date for sorting
        sections: form.sections,
      }));
      setForms(formattedForms);
      setFilteredForms(formattedForms); // Initialize filtered forms
      setLoading(false);
    } catch (error) {
      console.error("Error fetching forms:", error);
      setError("Failed to load forms. Please try again later.");
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
    const filtered = forms.filter((form) =>
      form.title.toLowerCase().includes(query)
    );
    setFilteredForms(filtered);
  };

  // Handle sorting
  const handleSort = () => {
    const newSortOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newSortOrder);
    const sortedForms = [...filteredForms].sort((a, b) =>
      newSortOrder === "desc"
        ? b.createdAt - a.createdAt
        : a.createdAt - b.createdAt
    );
    setFilteredForms(sortedForms);
    setCurrentPage(1); // Reset to first page on sort
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this form? This action cannot be undone!",
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
        await axios.delete(`http://localhost:5000/api/forms/${id}`);
        setForms(forms.filter((form) => form.id !== id));
        setFilteredForms(filteredForms.filter((form) => form.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Form deleted successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          customClass: {
            popup: "rounded-xl shadow-lg",
            confirmButton: "px-4 py-2 rounded-full",
          },
        });
      } catch (error) {
        console.error("Error deleting form:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete form. Please try again later.",
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

  const totalPages = Math.ceil(filteredForms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentForms = filteredForms.slice(startIndex, endIndex);

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
      className={`min-h-screen bg-gray-50 transition-all duration-300 flex-1 ${isCollapsed ? "ml-16" : "ml-10"
        }`}
    >
      <div className="w-full p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-6 rounded-xl  mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Submitted Blogs
          </h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={handleSearch}
              className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <Link to="/admin/Blogs/add">
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
                onClick={fetchForms}
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
                      Created At
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentForms.length > 0 ? (
                    currentForms.map((form) => (
                      <tr
                        key={form.id}
                        className="hover:bg-gray-50 transition duration-200"
                      >
                        <td className="px-6 py-4">
                          <div className="relative w-16 h-16 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={form.image}
                              alt={form.title}
                              className="w-full h-full object-cover transform hover:scale-110 transition duration-300"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-800 font-semibold text-lg truncate max-w-xs">
                            {form.title}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {form.date}
                        </td>
                        <td className="px-6 py-4 flex space-x-2">
                          {/* Edit Button */}
                          <Link
                            to={`/admin/Blogs/edit/${form.id}`}
                            state={{ blog: form }}
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

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(form.id)}
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

                          {/* View Details Button */}
                          <Link
                            to={`/blog/${form.id}`}
                            state={{ blog: form, from: "admin" }}
                            className="inline-flex items-center gap-2 text-indigo-600 px-4 py-2 rounded-full hover:text-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-sm text-sm font-medium"
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
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                            View Details
                          </Link>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-8 text-center text-gray-500 text-lg"
                      >
                        No forms found.
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
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === 1
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
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === page
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
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === totalPages
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
};

export default FormCard;