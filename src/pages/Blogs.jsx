import React, { useState } from "react";
import APIInputTable from "./APIInputTable"; // Assuming APIInputTable is in the same directory

const blogs = [
  {
    title: "Top 10 UI/UX Trends in 2025",
    description: "Explore the latest UI/UX design trends that are transforming digital products.",
    image: 'https://tse4.mm.bing.net/th?id=OIP.CtfLuIjPupjwEFyDTR8RAQAAAA&pid=Api&P=0&h=180',
    date: "April 15, 2025",
    author: "GrowCode Team",
  },
  {
    title: "Why You Should Use Next.js for Your Startup",
    description: "Learn why Next.js is becoming the go-to framework for scalable, SEO-friendly apps.",
    image: 'https://tse2.mm.bing.net/th?id=OIP.PnxJzLhcUhQ8hl7gyBhvMQHaDZ&pid=Api&P=0&h=180',
    date: "March 29, 2025",
    author: "GrowCode Developers",
  },
  {
    title: "Boosting Performance with Tailwind CSS",
    description: "A guide to optimizing speed and performance using Tailwind's utility-first approach.",
    image: 'https://tse4.mm.bing.net/th?id=OIP.qcNrfZzRekT0N7uRkflN1wHaDs&pid=Api&P=0&h=180',
    date: "March 10, 2025",
    author: "GrowCode UI Team",
  },
];

const BlogPage = () => {
  const [showInputTable, setShowInputTable] = useState(false);

  const toggleInputTable = () => {
    setShowInputTable(!showInputTable);
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
      <div className="max-w-screen-xl mx-auto mb-12 p-6 bg-white rounded-lg shadow-md flex items-center border border-gray-200">
        <div className="w-1/2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn2OMjOFdwxLEmb1c3jWPGdfPOj7hhAmweUQ&s"
            alt="Featured Article"
            className="w-full h-72 object-cover rounded-lg"
          />
        </div>
        <div className="w-1/2 pl-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Best Low Code Development Platforms for Modern App Solutions</h2>
          <p className="text-gray-600 mb-4">Build powerful apps with ease using the Best Low Code Development Platforms for scalable and modern solutions.</p>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">#Application</span>
          <p className="text-gray-500 text-sm mt-2">May 12, 2025</p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {blogs.map((blog, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default BlogPage;