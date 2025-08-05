import React from "react";

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
  return (
    <div className="bg-white py-16 px-6 text-gray-800 font-sans">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Blogs</h1>
        <p className="text-base md:text-lg text-gray-600">
          Stay up to date with the latest tech insights, design inspiration, and product development tips from GrowCode.
        </p>
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
