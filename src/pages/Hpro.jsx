import React, { useEffect, useState, useRef } from "react";
import i1 from "../img/th (4).jpg";
import i2 from "../img/PD-Build-the-best-banking-apps-Image1-1-2048x1398.png";
import i3 from "../img/Portfolio-Desenvolvedor-Web.webp";
import i4 from "../img/th (6).jpg"; 
import i5 from "../img/pexels-photo-13452088.webp";
import { motion, AnimatePresence } from "framer-motion";

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
    tech: ["Web Development", "Web Design", "UI/UX"],
  },
  {
    title: "Grub Grams",
    description: "Grub Grams is a USA-based online food delivery mobile application where people can order food from the nearest hotel and restaurants.",
    image: i5,
    tech: ["Android Dev", "iOS Dev", "Web Design"],
  },
];

const PortfolioPage = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Simulate a smooth auto-carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Intersection observer for section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const visibleProjects = projects
    .concat(projects) 
    .slice(startIndex, startIndex + 3);

  // Card animation variants
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  // Text animation variants
  const textVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-gray-900 text-white py-24 px-6 font-sans relative overflow-hidden"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated heading */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
        >
          <motion.div 
            className="overflow-hidden inline-block"
            variants={textVariants}
          >
            <div
  className="overflow-hidden mb-2 group cursor-pointer w-full flex justify-center"
  data-aos="fade-down"
  data-aos-duration="800"
>
  <h2 className="text-4xl md:text-5xl font-bold text-blue-400 dark:text-white relative inline-block">
    {/* Letter-by-letter animation wrapper */}
    <span className="inline-block overflow-hidden">
      {['O', 'u', 'r', ' ', 'P', 'o', 'r', 't', 'f', 'o', 'l', 'i', 'o'].map((letter, index) => (
        <span
          key={index}
          className="inline-block transform transition-all duration-500 hover:text-purple-500 dark:hover:text-blue-300"
          style={{
            transitionDelay: `${index * 50}ms`,
            transform: 'translateY(0)',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-8px) scale(1.1)';
            e.target.style.textShadow = '0 10px 15px rgba(59, 130, 246, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.textShadow = 'none';
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>

    {/* Bottom gradient animation */}
    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 transition-transform duration-700 group-hover:scale-x-100 origin-left"></span>

    {/* Top shimmer effect */}
    {/* <span className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out"></span> */}

    {/* Circular pulse on hover */}
    {/* <span className="absolute -inset-2 scale-0 rounded-full bg-blue-500/5 group-hover:scale-100 group-hover:animate-pulse transition-all duration-700"></span> */}
  </h2>
</div>
          </motion.div>
          
          <motion.p 
            className="text-gray-300 text-lg max-w-2xl mx-auto"
            variants={textVariants}
          >
            Semicolon Solution is the leading agency for digital solutions. With a team of experts, we build what you need most to launch your business online.
          </motion.p>
        </motion.div>

        {/* Projects grid with staggered animations */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 ease-in-out">
          <AnimatePresence mode="wait">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.3 }
                }}
                className="group bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
              >
                {/* Image container with overlay effect */}
                <div className="overflow-hidden rounded-t-3xl relative">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover transition-transform duration-700"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
                
                {/* Content section */}
                <div className="p-6 relative z-10">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2 relative z-10 group-hover:text-blue-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 relative z-10 group-hover:text-gray-300 transition-colors duration-300">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-gray-700 text-blue-300 px-3 py-1 rounded-full text-xs font-medium group-hover:bg-blue-900/30 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Add keyframe animations */}
      
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: scale(1) translate(0px, 0px);
          }
          33% {
            transform: scale(1.1) translate(30px, -50px);
          }
          66% {
            transform: scale(0.9) translate(-20px, 20px);
          }
          100% {
            transform: scale(1) translate(0px, 0px);
          }
        }
        
        .animate-blob {
          animation: blob 15s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes hourline {
          0% {
            transform: scaleX(0);
            left: 0;
            transform-origin: left;
          }
          50% {
            transform: scaleX(1);
            left: 0;
            transform-origin: left;
          }
          50.1% {
            transform: scaleX(1);
            transform-origin: right;
          }
          100% {
            transform: scaleX(0);
            transform-origin: right;
          }
        }
        
        .animate-hourline {
          animation: hourline 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default PortfolioPage;
