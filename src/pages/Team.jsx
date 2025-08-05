import React, { useEffect, useState } from 'react';
import bgImage from '../img/pexels-photo-6894201.jpeg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const teamMembers = [
  {
    name: "Rajesh Patel",
    role: "CEO & Founder",
    image: "https://placehold.co/400x400/6366f1/ffffff",
    bio: "With over 15 years of experience in IT, Rajesh leads our vision and strategy.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    name: "Priya Sharma",
    role: "CTO",
    image: "https://placehold.co/400x400/10b981/ffffff",
    bio: "Priya oversees our technical direction and ensures we stay at the cutting edge.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    name: "Amit Singh",
    role: "Lead Developer",
    image: "https://placehold.co/400x400/8b5cf6/ffffff",
    bio: "Amit brings extensive expertise in full-stack development and system architecture.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    name: "Neha Gupta",
    role: "UX/UI Designer",
    image: "https://placehold.co/400x400/ec4899/ffffff",
    bio: "Neha creates intuitive and beautiful user experiences for our clients.",
    social: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
];

const Team = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <section
      id="team"
      className="py-24 bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80 z-0"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center text-white backdrop-blur-sm bg-black/40 py-12 rounded-3xl relative z-10 shadow-2xl"
        data-aos="zoom-in"
        data-aos-duration="1200">

        {/* Animated heading with underline effect */}
        <div className="mb-4 relative inline-block group" data-aos="fade-up">
          <div
            className="overflow-hidden mb-2 group cursor-pointer w-full flex justify-center"
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-400 dark:text-white relative inline-block">
              {/* Letter-by-letter animation wrapper */}
              <span className="inline-block overflow-hidden">
                {['O', 'u', 'r', ' ', 'T', 'e', 'a', 'm'].map((letter, index) => (
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
        </div>

        <p className="text-lg mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          Meet the experts behind GrowCode's success — a team of dedicated professionals committed to delivering exceptional digital solutions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={100 * index}
              className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 text-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 p-6 group relative overflow-hidden"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Card background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-0 group-hover:opacity-10 transition-all duration-1000 group-hover:duration-300"></div>

              {/* Image container with animated border */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-full h-full mx-auto rounded-full overflow-hidden shadow-md border-2 border-transparent group-hover:border-white/20 transition-all duration-300 z-10 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/70 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Content with staggered animations */}
              <h3 className="text-xl font-semibold mb-1 transform transition-transform duration-300 group-hover:-translate-y-1">
                {member.name}
              </h3>

              <p className="text-sm text-indigo-300 font-medium mb-3 opacity-90 transition-all duration-300 group-hover:text-indigo-200">
                {member.role}
              </p>

              {/* Bio with animated reveal */}
              <div className="h-16 overflow-hidden relative">
                <p className="text-sm text-gray-300 mb-4 transition-all duration-500 transform 
                             group-hover:-translate-y-1 group-hover:text-white">
                  {member.bio}
                </p>
                {/* Gradient fade for text */}
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-800/90 to-transparent group-hover:opacity-0 transition-opacity duration-300"></div>
              </div>

              {/* Social links with animated icons */}
              <div className="flex justify-center space-x-4 pt-3 transform transition-all duration-500 opacity-80 group-hover:opacity-100">
                <a href={member.social.linkedin} className="text-gray-300 hover:text-indigo-300 transition-colors duration-300 relative group/icon">
                  <i className="fab fa-linkedin text-lg"></i>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover/icon:w-full transition-all duration-300 ease-in-out"></span>
                </a>
                <a href={member.social.twitter} className="text-gray-300 hover:text-indigo-300 transition-colors duration-300 relative group/icon">
                  <i className="fab fa-twitter text-lg"></i>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover/icon:w-full transition-all duration-300 ease-in-out"></span>
                </a>
                <a href={member.social.github} className="text-gray-300 hover:text-indigo-300 transition-colors duration-300 relative group/icon">
                  <i className="fab fa-github text-lg"></i>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 group-hover/icon:w-full transition-all duration-300 ease-in-out"></span>
                </a>
              </div>

              {/* View profile button that slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 py-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center rounded-b-3xl">
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated keyframes */}
      <style jsx>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-40px) translateX(20px);
            opacity: 0.2;
          }
          75% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.3;
          }
          100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Team;
