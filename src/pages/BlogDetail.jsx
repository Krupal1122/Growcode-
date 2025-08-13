import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
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
  const readingTime = "5 min"; // Replace with actual logic if needed

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
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
      };
    };

    const handleScroll = () => {
      if (!blog?.sections || !contentRef.current) return;

      const sectionElements = document.querySelectorAll(".section-heading");
      const questionElements = document.querySelectorAll(".question-heading");
      let closestElement = null;
      let minDistance = Infinity;

      const allElements = [];

      // Add sections
      sectionElements.forEach((section, index) => {
        allElements.push({
          element: section,
          type: "section",
          value: blog.sections[index].subheading || `Section ${index + 1}`,
          index,
        });
      });

      // Add questions
      let questionCount = 0;
      blog.sections.forEach((section, sIndex) => {
        section.questions.forEach((question, qIndex) => {
          const element = questionElements[questionCount];
          if (element) {
            allElements.push({
              element,
              type: "question",
              value: question.questionText,
              sIndex,
              qIndex,
            });
          }
          questionCount++;
        });
      });

      // Find the element closest to the top of the content div
      allElements.forEach((item) => {
        const rect = item.element.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        const distance = Math.abs(rect.top - contentRect.top); // Distance from top of content div
        if (distance < minDistance && rect.top >= contentRect.top - rect.height && rect.top <= contentRect.top + window.innerHeight / 2) {
          minDistance = distance;
          closestElement = {
            type: item.type,
            value: item.value,
            index: item.index || `${item.sIndex}-${item.qIndex}`,
          };
        }
      });

      setActiveElement(closestElement);
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", debouncedHandleScroll);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener("scroll", debouncedHandleScroll);
      }
    };
  }, [blog?.sections]);

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element && contentRef.current) {
      const contentRect = contentRef.current.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const offsetTop = elementRect.top - contentRect.top + contentRef.current.scrollTop;
      contentRef.current.scrollTo({
        top: offsetTop,
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

          <div className="space-y-4">
            {blog.sections.map((section, index) => (
              <div key={index} className="space-y-1">
                {section.subheading && (
                  <p
                    className={`text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                      activeElement?.type === "section" &&
                      activeElement?.value === section.subheading
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
                        className={`text-sm leading-snug transition-colors duration-200 cursor-pointer ${
                          activeElement?.type === "question" &&
                          activeElement?.value === question.questionText
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-blue-500"
                        }`}
                        onClick={() => scrollToElement(`question-${index}-${qIndex}`)}
                      >
                        {/* <div
                          className="font-medium"
                          dangerouslySetInnerHTML={{ __html: question.questionText }}
                        ></div> */}
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