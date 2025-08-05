import React from 'react';
import useFadeIn from '../hooks/useFadeIn';
import '../page.css';
import Services from './Services';
import Projects from './Projects';
import Team from './Team';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Hpro from './Hpro';
import Habout from './Habout';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Hero = () => {
  useFadeIn();
  useScrollAnimation();

  return (
    <>
      <section className="grid h-screen justify-center  items-center pb-10 bg-gray-900 text-white">
        {/* Dark theme gradient background with subtle pattern */}
        {/* <div className=" top-0 left-0 w-full h-full z-0 pointer-events-none opacity-20 bg-grid-pattern"></div>
        <div className=" top-0 left-0 w-full h-full z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div> */}

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="animate-fadeIn opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              <span className="inline-block overflow-hidden">
                {["T", "u", "r", "n", "i", "n", "g", " ", "I", "d", "e", "a", "s", " ", "I", "n", "t", "o"].map((letter, index) => (
                  <span
                    key={index}
                    className="letter-container inline-block relative"
                  >
                    <span
                      className="animate-letterFadeIn inline-block opacity-0 transition-all duration-300 relative"
                      style={{
                        animationDelay: `${0.1 * (index + 1)}s`,
                        animationFillMode: "forwards",
                        transform: `translateY(${Math.sin(index * 0.5) * 5}px)`
                      }}
                    >
                      {letter === " " ? (
                        // Special handling for space character
                        <span className="inline-block w-2 sm:w-3" aria-hidden="true"></span>
                      ) : (
                        // Regular letter handling
                        <>
                          <span className="hover-effect relative inline-block transform transition-all duration-300 hover:-translate-y-1 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-blue-400 to-purple-500">
                            {letter}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 hover:w-full group-hover:w-full"></span>
                          </span>
                          <span className="text-shadow absolute top-0 left-0 pointer-events-none opacity-0 transition-all duration-300 blur-[1px] text-blue-800/40 hover-shadow-effect">
                            {letter}
                          </span>
                        </>
                      )}
                    </span>
                  </span>
                ))}
              </span>
              <div className='main mt-1 md:mt-2'>
                <h2 className="first abc text-transparent font-semibold bg-clip-text tracking-wide">Digital Reality</h2>
                <h2 className="second abc text-transparent font-semibold bg-clip-text tracking-wide">Digital Reality</h2>
              </div>
            </h1>
          </div>

          <div className="animate-slideUp opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            <div className="relative py-5 px-4 sm:px-8 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl border border-gray-700 mt-10 md:mt-6">
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-l-lg"></div>
              <p className="text-xl text-gray-200 mb-4 leading-relaxed max-w-3xl mx-auto font-medium">
                <span className="text-blue-400 font-semibold">GrowCode</span> provides innovative IT solutions that empower businesses to thrive in an ever-evolving digital world.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Our team brings your ideas to life through seamless, scalable technology.
              </p>
              <div className="flex flex-wrap justify-center mt-6 gap-4">
                <span className="inline-flex items-center text-sm text-blue-400 bg-gray-800 px-3 py-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Innovative Solutions
                </span>
                <span className="inline-flex items-center text-sm text-blue-400 bg-gray-800 px-3 py-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Scalable Technology
                </span>
                <span className="inline-flex items-center text-sm text-blue-400 bg-gray-800 px-3 py-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Results-Driven
                </span>
              </div>
            </div>
          </div><div className="animate-fadeIn opacity-0 mt-10" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="/contact"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-lg text-base sm:text-lg font-medium hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-800 transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-blue-400 rounded-full opacity-70 animate-ping"></span>
              </a>

              <a
                href="/services"
                className="group relative overflow-hidden bg-transparent text-blue-400 border border-blue-500 px-8 py-4 rounded-lg text-base sm:text-lg font-medium transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Learn More</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-700/80 transform scale-y-0 origin-bottom transition-transform duration-300 ease-out group-hover:scale-y-100"></span>
                <svg
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Enhanced animated blobs with more professional styling */}
        <div className="bg-blob">
          <div className="blob bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
          <div className="blob bg-gradient-to-br from-indigo-600/15 to-blue-600/15"></div>
          <div className="blob bg-gradient-to-br from-purple-600/10 to-indigo-600/10"></div>
        </div>

        {/* Add subtle animated particles for professional tech feel */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="particles-container"></div>
        </div>
      </section>

      {/* <section className="relative pt-24 pb-40 bg-white">
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none grid-pattern"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="animate-fadeIn opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
              <span className="inline-block overflow-hidden">

                {["T", "u", "r", "n", "i", "n", "g", " ", "I", "d", "e", "a", "s", " ", "I", "n", "t", "o"].map((letter, index) => (
                  <span
                    key={index}
                    className="animate-letterFadeIn inline-block opacity-0 hover:scale-110 hover:text-blue-600 transition-all duration-200"
                    style={{
                      animationDelay: `${0.1 * (index + 1)}s`,
                      animationFillMode: "forwards",
                      transform: `translateY(${Math.sin(index * 0.5) * 5}px)`
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
              <div className='main'>
                <h2 className="first">Digital Reality</h2>
                <h2 className="second">Digital Reality</h2>
              </div>
              <span
                className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-textReveal opacity-0 hover:animate-pulse"
                style={{
                  animationDelay: "2.2s",
                  animationFillMode: "forwards",
                  textShadow: "0 0 20px rgba(79, 70, 229, 0.3)"
                }}
              >
                Digital Reality
              </span>
            </h1>
          </div>
          <div className="animate-slideUp opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            <div className="relative py-6 px-8 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-sm">
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-l-lg"></div>
              <p className="text-xl text-gray-700 dark:text-gray-200 mb-4 leading-relaxed max-w-3xl mx-auto font-medium">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">GrowCode</span> provides innovative IT solutions that empower businesses to thrive in an ever-evolving digital world.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Our team brings your ideas to life through seamless, scalable technology.
              </p>
              <div className="flex justify-center mt-6 gap-4">
                <span className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Innovative Solutions
                </span>
                <span className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Scalable Technology
                </span>
                <span className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Results-Driven
                </span>
              </div>
            </div>
          </div>
          <div className="animate-slideUp opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              GrowCode provides innovative IT solutions that empower businesses to thrive in an ever-evolving digital world.
              Our team brings your ideas to life through seamless, scalable technology.
            </p>
          </div>

          <div className="animate-fadeIn opacity-0" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
            <div className="flex justify-center gap-8">
              <a
                href="/contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all ease-in-out duration-300 animate-buttonPulse"
              >
                Get Started
              </a>
              <a
                href="/services"
                className="bg-white text-blue-600 border border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all ease-in-out duration-300 animate-buttonPulse"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        <div class="bg-blob">
          <div class="blob"></div>
          <div class="blob"></div>
          <div class="blob"></div>
        </div>

      </section> */}


      <Habout />
      <Services />
      <Hpro />
      <Team />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Hero;
