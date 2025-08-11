import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FormCard = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/forms');
        const formattedForms = response.data.map((form) => ({
          id: form._id,
          title: form.title,
          description: form.sections[0]?.questions[0]?.questionText || 'No description available',
          image: form.image || 'https://via.placeholder.com/150',
          date: new Date(form.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
          sections: form.sections,
        }));
        setForms(formattedForms);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching forms:', error);
        setError('Failed to load forms. Please try again later.');
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  // Calculate pagination details
  const totalPages = Math.ceil(forms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentForms = forms.slice(startIndex, endIndex);

  // Handle page navigation
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
    <div className="max-w-7xl mx-auto p-6 sm:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Submitted Forms
        </h1>
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
          <p className="text-red-600 text-lg font-medium">{error}</p>
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
                      <td className="px-6 py-4">
                        <Link
                          to={`/blog/${form.id}`}
                          state={{ blog: form, from: 'admin' }}
                          className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-sm text-sm font-medium"
                        >
                          View Details
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-6 bg-white border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-sm'
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
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
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
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 shadow-sm'
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
  );
};

export default FormCard;