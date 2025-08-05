import React from "react";
import i1 from "../img/th (4).jpg";
import i2 from "../img/PD-Build-the-best-banking-apps-Image1-1-2048x1398.png";
import i3 from "../img/Portfolio-Desenvolvedor-Web.webp";
import i4 from "../img/th (6).jpg"; 
import i5 from "../img/pexels-photo-13452088.webp";

const projects = [
  {
    title: "E-commerce Web App",
    description: "A scalable e-commerce platform with shopping cart, payments, and admin dashboard.",
    image: i1,
    tech: ["React", "Tailwind", "Node.js"],
  },
  {
    title: "Mobile Banking App",
    description: "Secure and user-friendly banking app with biometric login and transaction history.",
    image: i2,
    tech: ["Flutter", "Firebase"],
  },
  {
    title: "Portfolio Website",
    description: "A personal website to showcase my skills, blogs, and projects.",
    image: i3,
    tech: ["Next.js", "Tailwind CSS"],
  },
  {
    title: "EduTeck",
    description: "EduTeck is an online educational platform to improve the technical skills and efficiency of students for securing their future.",
    image: i4,
    tech: ["Web Development", "web design", "ui/ux"],
  },
  {
    title: "Grub Grams",
    description: "Grub Grams is a USA-based online food delivery mobile application where people can order food from the nearest hotel and restaurants.",
    image: i5,
    tech: ["ANDROID APP DEV", "IOS APP DEV", "web design"],
  },
];

const PortfolioPage = () => {
  return (
    <section className="bg-white py-24 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Portfolio
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Semicolon Solution is the leading agency for digital solutions. With a team of experts, we build what you need most to launch your business online.
          </p>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 ease-in-out">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPage;
