import React, { useState, useEffect } from "react";
import axios from "axios";
import APIInputTable from "./APIInputTable"; // Assuming APIInputTable is in the same directory

const BlogPage = () => {
  const [showInputTable, setShowInputTable] = useState(false);
  const [blogs, setBlogs] = useState([]); // State to store API data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedBlog, setSelectedBlog] = useState(null); // State for selected blog

  // Toggle input table visibility
  const toggleInputTable = () => {
    setShowInputTable(!showInputTable);
  };

  // Fetch data from the API
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/forms");
        // Map API data to match the card structure using actual fields
        const formattedBlogs = response.data.map((form) => ({
          id: form._id, // Use _id as a unique identifier
          title: form.title,
          description: form.sections[0]?.questions[0]?.questionText || "No description available",
          image: form.image || "https://via.placeholder.com/150",
          date: new Date(form.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          sections: form.sections, // Pass sections as is for detailed view
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

  // Select the first blog as the featured article (or apply custom logic)
  const featuredBlog = blogs[0];

  // Handle card click to show details
  const handleCardClick = (blog) => {
    setSelectedBlog(blog);
  };

  // Close detail view
  const closeDetail = () => {
    setSelectedBlog(null);
  };

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
        <div
          className="max-w-screen-xl mx-auto mb-12 p-6 bg-white rounded-lg shadow-md flex items-center border border-gray-200 cursor-pointer hover:shadow-xl hover:-translate-y-2 hover:scale-105 transition duration-300"
          onClick={() => handleCardClick(featuredBlog)}
        >
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
      <div className="max-w-screen-xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3 px-4">
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
              className="h-[380px] group bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden cursor-pointer flex flex-col"
              onClick={() => handleCardClick(blog)}
            >
              {/* Fixed image height */}
              <div className="relative h-[150px] overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
              </div>

              {/* Text content */}
              <div className="flex flex-col justify-between flex-1 p-5 text-left">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{blog.description}</p>
                </div>
                <div className="text-gray-500 text-xs flex justify-between items-center mt-auto">
                  <span>{blog.date}</span>
                  <span>{blog.author || "Unknown"}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>




      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto p-8 relative">
            <button
              onClick={closeDetail}
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
            <BlogDetail blog={selectedBlog} />
          </div>
        </div>
      )}
    </div>
  );
};

// BlogDetail Component (Unchanged)
const BlogDetail = ({ blog }) => {
  // Static reading time
  const readingTime = "~ 6 minutes";

  return (
    <div className="">
      <div className="flex items-start mb-6">
        <div className="w-60 pr-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Contributor</p>
            <div className="flex items-center mt-2">
              <img
                src="https://via.placeholder.com/40"
                alt="Contributor"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <p className="text-gray-800 font-medium">Unknown</p>
                <p className="text-gray-500 text-sm">{blog.date}</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-4">Reading Time</p>
            <p className="text-gray-800">{readingTime}</p>
          </div>
          <div className="mt-12 border-l border-r border-gray-300 px-6">
            {blog.sections.map((section, index) => (
              <div key={index} className="mb-4">
                {/* Display subheading if it exists */}
                {section.subheading && (
                  <li className="text-lg font-semibold text-gray-800 mb-2">
                    {section.subheading}
                  </li>
                )}
                {/* Display questions if they exist */}
                {section.questions.length > 0 && (
                  <ul className="list-disc pl-5">
                    {section.questions.map((question, qIndex) => (
                      <h3 key={qIndex} className="text-gray-600 text-sm mb-1">
                        {question.questionText}
                      </h3>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="w-3/4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
          <div className="relative mb-6">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
            <div className="absolute bottom-4 left-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Company Logo"
                className="w-24 h-auto"
              />
            </div>
          </div>
          <div className="text-gray-600">
            <ul className="list-disc pl-5 mt-2 text-gray-600">
              {blog.sections.map((section, index) => (
                <li key={index}>
                  {section.subheading || `Section ${index + 1}`}
                  {section.questions.length > 0 && (
                    <ul className="list-circle pl-5 mt-1">
                      {section.questions.map((question, qIndex) => (
                        <li key={qIndex}>
                          <div className="font-medium text-gray-800">{question.questionText}</div>
                          <div className="text-gray-500 text-sm ml-4">{question.answerText}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;