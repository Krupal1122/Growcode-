import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import APIInputTable from "../components/Blogs/APIInputTable";
import BlogDetail from "./BlogDetail";

const BlogPage = () => {
  const [showInputTable, setShowInputTable] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const navigate = useNavigate();
  const location = useLocation();

  const toggleInputTable = () => {
    setShowInputTable(!showInputTable);
  };

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/forms");
        const formattedBlogs = response.data.map((form) => ({
          id: form._id,
          title: form.title,
          description: form.sections[0]?.questions[0]?.questionText || "No description available",
          image: form.image || "https://via.placeholder.com/150",
          date: new Date(form.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          sections: form.sections,
        }));
        setBlogs(formattedBlogs);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch forms. Please try again later.");
        setLoading(false);
        console.error("Error fetching forms:", err);
      }
    };

    fetchForms();
  }, []);

  const featuredBlog = blogs[0];

  const handleCardClick = (blog) => {
    navigate(`/blog/${blog.id}`, { state: { blog } });
  };

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 font-sans antialiased">
      {/* Admin Input Table Toggle */}
      {/* {location.pathname === "/blogs-admin" && (
        <div className="max-w-3xl mx-auto text-center mb-14">
          <button
            onClick={toggleInputTable}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {showInputTable ? "Close Input Table" : "Add New Blog"}
          </button>
        </div>
      )} */}

      {/* Input Table Modal */}
      {showInputTable && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-8 relative transform transition-all duration-300 scale-100">
            <button
              onClick={toggleInputTable}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <APIInputTable />
          </div>
        </div>
      )}

      {/* Featured Blog Section */}
      {loading ? (
        <div className="max-w-5xl mx-auto mb-16 p-8 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center">
          <p className="text-center text-gray-600 w-full text-lg">Loading featured article...</p>
        </div>
      ) : error ? (
        <div className="max-w-5xl mx-auto mb-16 p-8 bg-white rounded-2xl shadow-lg border border-red-100">
          <p className="text-center text-red-600 w-full text-lg">{error}</p>
        </div>
      ) : !featuredBlog ? (
        <div className="max-w-5xl mx-auto mb-16 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
          <p className="text-center text-gray-600 w-full text-lg">No featured article available.</p>
        </div>
      ) : (
        <div
          className="max-w-5xl mx-auto mb-16 p-8 bg-white rounded-2xl shadow-lg border border-gray-100 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          onClick={() => handleCardClick(featuredBlog)}
        >
          <div className="flex -col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <img
                src={featuredBlog.image}
                alt={featuredBlog.title}
                className="w-full h-80 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{featuredBlog.title}</h2>
              <div
                className="text-gray-600 mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: featuredBlog.description }}
              ></div>
              <div className="flex items-center gap-3">
                <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
                  #Application
                </span>
                <p className="text-gray-500 text-sm">{featuredBlog.date}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Cards Grid */}
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {loading ? (
          <p className="text-center text-gray-600 col-span-full text-lg">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600 col-span-full text-lg">{error}</p>
        ) : currentBlogs.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full text-lg">No blogs available.</p>
        ) : (
          currentBlogs.map((blog, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer flex flex-col"
              onClick={() => handleCardClick(blog)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
                <div
                  className="text-gray-600 text-sm mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                ></div>
                <div className="text-gray-500 text-xs flex justify-between items-center mt-auto">
                  <span>{blog.date}</span>
                  <span>{blog.author || "Unknown"}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="max-w-6xl mx-auto mt-12 flex justify-center items-center gap-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-md"
            }`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                currentPage === index + 1
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-md"
            }`}
          >
            Next
          </button>
        </div>
      )}

      <Routes>
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  );
};

export default BlogPage;