import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(state?.blog || null);
  const [loading, setLoading] = useState(!state?.blog);
  const [error, setError] = useState(null);
  const [activeElement, setActiveElement] = useState(null);
  const contentRef = useRef(null);
  const readingTime = " ";

  useEffect(() => {
    if (!blog) {
      const fetchBlog = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/forms/${id}`);
          const form = response.data;
          const formattedBlog = {
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
          };
          setBlog(formattedBlog);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch blog. Please try again later.");
          setLoading(false);
          console.error("Error fetching blog:", err);
        }
      };
      fetchBlog();
    }
  }, [id, blog]);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = document.querySelectorAll(".section-heading");
      const questionElements = document.querySelectorAll(".question-heading");
      let topElement = null;

      sectionElements.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.top >= -rect.height) {
          topElement = {
            type: "section",
            value: blog.sections[index].subheading || `Section ${index + 1}`,
          };
        }
      });

      questionElements.forEach((question, qIndex) => {
        const rect = question.getBoundingClientRect();
        if (rect.top <= 100 && rect.top >= -rect.height) {
          let questionCount = 0;
          for (let i = 0; i < blog.sections.length; i++) {
            const questions = blog.sections[i].questions;
            for (let j = 0; j < questions.length; j++) {
              if (questionCount === qIndex) {
                topElement = {
                  type: "question",
                  value: questions[j].questionText,
                };
                return;
              }
              questionCount++;
            }
          }
        }
      });

      setActiveElement(topElement);
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [blog?.sections]);

  // Function to handle clicking on sidebar items and scroll to corresponding content
  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element && contentRef.current) {
      const offset = element.getBoundingClientRect().top + contentRef.current.scrollTop - 100; // Adjust offset as needed
      contentRef.current.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center text-red-600">Blog not found.</div>;
  }

  return (
    <div className="bg-white text-gray-800 font-sans w-screen min-h-screen flex">
      <div className="flex w-full h-full mt-16">
        {/* Sidebar */}
        <div className="w-72 sticky top-4 self-start bg-white rounded-xl shadow-lg p-5 ml-10 overflow-y-auto max-h-[85vh]">
  {/* Contributor Card */}
  <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-4">
    <img
      src="https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg"
      alt="Contributor"
      className="w-12 h-12 rounded-full object-cover"
    />
    <div>
      <p className="text-gray-900 font-semibold">Unknown</p>
      <p className="text-gray-500 text-xs">{blog.date}</p>
      <p className="text-gray-400 text-xs">Reading Time: {readingTime}</p>
    </div>
  </div>

  {/* Sections List */}
  <div className="space-y-4">
    {blog.sections.map((section, index) => (
      <div key={index} className="space-y-1">
        {section.subheading && (
          <p
            className={`text-sm font-semibold transition-colors cursor-pointer ${
              activeElement?.type === "section" && activeElement?.value === section.subheading
                ? "text-blue-600"
                : "text-gray-800 hover:text-blue-500"
            }`}
            onClick={() => scrollToElement(`section-${index}`)}
          >
            {section.subheading}
          </p>
        )}
        {section.questions.length > 0 && (
          <ul className="space-y-1 pl-3 border-l-2 border-gray-200">
            {section.questions.map((question, qIndex) => (
              <li
                key={qIndex}
                className={`text-sm leading-snug transition-colors cursor-pointer ${
                  activeElement?.type === "question" && activeElement?.value === question.questionText
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-blue-500"
                }`}
                onClick={() => scrollToElement(`question-${index}-${qIndex}`)}
              >
                <div
                  className="font-medium"
                  dangerouslySetInnerHTML={{ __html: question.title }}
                ></div>
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
</div>

        {/* Main Content */}
        <div className="flex-1 h-screen overflow-y-auto p-6" ref={contentRef}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
          <div className="relative mb-6">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
            <div className="absolute bottom-4 left-4"></div>
          </div>
          <div className="text-gray-600">
            <ul className="list-disc pl-5 mt-2 text-gray-600">
              {blog.sections.map((section, index) => (
                <li key={index}>
                  <div
                    id={`section-${index}`}
                    className="section-heading font-semibold text-gray-800 mb-2"
                  >
                    {section.subheading || `Section ${index + 1}`}
                  </div>
                  {section.questions.length > 0 && (
                    <ul className="list-circle pl-5 mt-1">
                      {section.questions.map((question, qIndex) => (
                        <li key={qIndex}>
                          <div
                            id={`question-${index}-${qIndex}`}
                            className="question-heading font-medium text-gray-800"
                            dangerouslySetInnerHTML={{ __html: question.questionText }}
                          ></div>
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

export default BlogDetail;