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
        <div className="w-60 pr-4 sticky top-0 self-start h-screen overflow-y-auto bg-gray-50 p-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Contributor</p>
            <div className="flex items-center mt-2">
              <img
                src="https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg"
                alt="Contributor"
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <p className="text-gray-800 font-medium">Unknown</p>
                <p className="text-gray-500 text-sm">{blog.date}</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-4">Reading Time: {readingTime}</p>
          </div>
          <div className="mt-6 border-l border-r border-gray-300 px-4 max-h-[80vh] overflow-y-auto">
            {blog.sections.map((section, index) => (
              <div key={index} className="mb-4">
                {section.subheading && (
                  <li
                    className={`text-base font-semibold mb-2 ${
                      activeElement?.type === "section" &&
                      activeElement?.value === section.subheading
                        ? "text-blue-600"
                        : "text-gray-800"
                    }`}
                  >
                    {section.subheading}
                  </li>
                )}
                {section.questions.length > 0 && (
                  <ul className="list-disc pl-5">
                    {section.questions.map((question, qIndex) => (
                      <h3
                        key={qIndex}
                        className={`text-sm mb-1 ${
                          activeElement?.type === "question" &&
                          activeElement?.value === question.questionText
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        {question.questionText}
                      </h3>
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
            <div className="absolute bottom-4 left-4">
            
            </div>
          </div>
          <div className="text-gray-600">
            <ul className="list-disc pl-5 mt-2 text-gray-600">
              {blog.sections.map((section, index) => (
                <li key={index}>
                  <div className="section-heading font-semibold text-gray-800 mb-2">
                    {section.subheading || `Section ${index + 1}`}
                  </div>
                  {section.questions.length > 0 && (
                    <ul className="list-circle pl-5 mt-1">
                      {section.questions.map((question, qIndex) => (
                        <li key={qIndex}>
                          <div className="question-heading font-medium text-gray-800">
                            {question.questionText}
                          </div>
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

export default BlogDetail;