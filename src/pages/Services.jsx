import React, { useEffect } from 'react';
import backgroundImage from '../img/pexels-photo-8866726.webp';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Services = () => {
  useEffect(() => {
    // Initialize AOS animation library with custom settings
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <>
      <section
        id="services"
        className="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden"
      >
        {/* Animated Particle Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Moving particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-blue-500 opacity-20 dark:opacity-30"
                style={{
                  width: `${Math.random() * 40 + 10}px`,
                  height: `${Math.random() * 40 + 10}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 15 + 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          {/* Background Image with parallax effect */}
          <div
            className="absolute inset-0 transition-transform duration-1000 ease-out"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(1px)',
              opacity: 0.3,
              transform: 'scale(1.05)',
            }}
            data-aos="zoom-out"
            data-aos-duration="1500"
          ></div>

          {/* Gradient overlay with animated opacity */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-blue-900/20 opacity-70"
            data-aos="fade"
            data-aos-duration="2000"
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6">
          {/* Animated heading with text reveal */}
          {/* Animated heading with text reveal - Centered Properly */}
          <div
            className="overflow-hidden mb-2 group cursor-pointer w-full flex justify-center"
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-400 dark:text-white relative inline-block">
              {/* Letter-by-letter animation wrapper */}
              <span className="inline-block overflow-hidden">
                {['O', 'u', 'r', ' ', 'S', 'e', 'r', 'v', 'i', 'c', 'e', 's'].map((letter, index) => (
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

          {/* Animated tagline */}
          <p
            className="text-lg text-center text-white dark:text-gray-300 mt-4 mb-12"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            Comprehensive IT solutions tailored to your business needs
          </p>

          {/* Services grid with staggered animations */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-md p-6 overflow-hidden relative z-10"
                data-aos="zoom-in-up"
                data-aos-delay={100 * index}
                data-aos-duration="800"
              >
                {/* Animated hover effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out rounded-xl"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-300"></div>

                {/* Icon with floating animation */}
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-4 mx-auto transform transition-all duration-500 group-hover:scale-110 group-hover:shadow-blue-500/20 group-hover:shadow-lg relative z-10">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  {service.icon}
                </div>

                {/* Title with slide-up animation */}
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2 transform transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  {service.title}
                </h3>

                {/* Description with fade-in effect */}
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4 transition-all duration-500 group-hover:text-gray-800 dark:group-hover:text-white">
                  {service.description}
                </p>

                {/* Animated button */}
                <div className="text-center transform transition-all duration-500 translate-y-0 opacity-100 group-hover:translate-y-0">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center space-x-2 px-3 text-blue-600 dark:text-blue-400 relative overflow-hidden group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300"
                  >
                    <span className="relative z-10">Learn more</span>
                    <svg
                      className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated shapes */}
        <div className="hidden md:block">
          <div className="absolute top-20 left-0 w-64 h-64 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-10 right-0 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-40px) translateX(20px) rotate(180deg);
            opacity: 0.3;
          }
          75% {
            transform: translateY(-20px) translateX(10px) rotate(270deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0) translateX(0) rotate(360deg);
            opacity: 0.3;
          }
        }

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

        @keyframes shimmer {
          0% {
            transform: translateX(-150%);
          }
          100% {
            transform: translateX(150%);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

const services = [
  {
    title: 'Web Development',
    description:
      'Custom web applications and responsive websites built with the latest technologies to enhance your online presence.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Mobile App Development',
    description:
      'Native and cross-platform mobile applications for iOS and Android devices that deliver exceptional user experiences.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    title: 'Database Solutions',
    description:
      'Efficient database design, optimization, and management for your business needs with scalable architecture.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    title: 'Cloud Services',
    description:
      'Scalable cloud infrastructure and migration services for optimal performance and reliability of your applications.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    title: 'E-commerce Solutions',
    description:
      'End-to-end e-commerce platforms with secure payment gateways and inventory management systems for your online business.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'Data Analytics',
    description:
      'Advanced data analysis and visualization to drive business intelligence and insights for informed decision making.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    ),
  },
];

export default Services;
