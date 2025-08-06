import React, { useState, useEffect } from "react";
import axios from "axios";
import APIInputTable from "./APIInputTable"; // Assuming APIInputTable is in the same directory

const BlogPage = () => {
  const [showInputTable, setShowInputTable] = useState(false);
  const [blogs, setBlogs] = useState([]); // State to store API data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Toggle input table visibility
  const toggleInputTable = () => {
    setShowInputTable(!showInputTable);
  };

  // Fetch data from the API
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/forms");
        // Map API data to match the card structure
        const formattedBlogs = response.data.map((form) => ({
          title: form.title,
          description: form.sections[0]?.questions[0]?.questionText || "No description available", // Use first question as description or fallback
          image: form.image || "https://via.placeholder.com/150", // Fallback image if none provided
          date: new Date(form.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }), // Format date
          author: "Form Author", // Static author or derive from form data if available
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
  }, []); // Empty dependency array to run once on mount

  // Select the first blog as the featured article (or apply custom logic)
  const featuredBlog = blogs[0]; // You can modify this to select based on criteria (e.g., most recent)

  return (
    <div className="bg-white py-16 px-6 text-gray-800 font-sans">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <div className="mb-6">
          <button
            onClick={toggleInputTable}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300 flex items-center gap-2 mx-auto"
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
            {showInputTable ? "Close Input Table" : "Add Blog"}
          </button>
        </div>
      </div>

      {/* Modal for APIInputTable */}
      {showInputTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
            <button
              onClick={toggleInputTable}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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

      {/* Featured Article Card */}
      {loading ? (
        <div className="max-w-screen-xl mx-auto mb-12 p-6 bg-white rounded-lg shadow-md flex items-center border border-gray-200">
          <p className="text-center text-gray-600 w-full">Loading featured article...</p>
        </div>
      ) : error ? (
        <div className="max-w-screen-xl mx-auto mb-12 p-6 bg-white rounded-lg shadow-md flex items-center border border-gray-200">
          <p className="text-center text-red-600 w-full">{error}</p>
        </div>
      ) : !featuredBlog ? (
        <div className="max-w-screen-xl mx-auto mb-12 p-6 bg-white rounded-lg shadow-md flex items-center border border-gray-200">
          <p className="text-center text-gray-600 w-full">No featured article available.</p>
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto mb-12 p-6 bg-white rounded-lg shadow-md flex items-center border border-gray-200">
          <div className="w-1/2">
            <img
              src={featuredBlog.image}
              alt={featuredBlog.title}
              className="w-full h-72 object-cover rounded-lg"
            />
          </div>
          <div className="w-1/2 pl-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{featuredBlog.title}</h2>
            <p className="text-gray-600 mb-4">{featuredBlog.description}</p>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">#Application</span>
            <p className="text-gray-500 text-sm mt-2">{featuredBlog.date}</p>
          </div>
        </div>
      )}

      {/* Dynamic Blog Cards */}
      <div className="max-w-screen-xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-600">No blogs available.</p>
        ) : (
          blogs.map((blog, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
              </div>
              <div className="p-6 text-left flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{blog.description}</p>
                </div>
                <div className="text-gray-500 text-xs flex justify-between items-center mt-auto">
                  <span>{blog.date}</span>
                  <span>{blog.author}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogPage;