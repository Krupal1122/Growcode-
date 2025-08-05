import React from "react";
import bgImage from "../img/laptop-agencies-consulting-website-development-companies.png";

const Growcodecontact = () => {
  return (
    <>
      <section className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <div
          className="w-full bg-cover bg-center rounded-xl overflow-hidden"
          style={{
            backgroundImage: `url(${bgImage})`,
            height: "15vh",
          }}
        >
          <div className="h-full w-full bg-white/40 dark:bg-black/60 flex items-center justify-center transition-colors duration-300">
            <p className="text-[35px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              Contact Us
            </p>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto mt-16 px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-12 text-left text-transparent bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text">
            Get in Touch
          </h1>

          <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
            <div className="lg:w-3/4 w-full bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-transform hover:scale-105 duration-300">
              <form className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-1">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-1">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-1">
                      Brief about the project
                    </label>
                    <textarea
                      className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">
                      Have a file to share?
                    </label>
                    <input
                      type="file"
                      className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Submit Application
                </button>
              </form>
            </div>

            <div className="lg:w-1/4 w-full mt-12 lg:mt-0 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-transparent bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text">
                Contact Info.
              </h1>
              <div className="space-y-4 text-sm leading-relaxed text-gray-800 dark:text-gray-300">
                <h2 className="text-lg font-semibold">Let's Talk.</h2>
                <p>Growcode@semicolonsolution.com</p>
                <p>+91 9574198852 or +91 9274009002</p>
                <h2 className="text-lg font-semibold mt-6">Visit Us.</h2>
                <p>
                  Krrish Chinese & Fast Food,
                  <br />
                  Simada Naka To Mota Varachha Road,
                  <br />
                  Near Raj Garden, Simada Naka,
                  <br />
                  Nana Varachha, Surat, Gujarat 395006
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-4 sm:px-6 mt-16">
          <div className="rounded-xl overflow-hidden shadow-lg ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.8377105235295!2d72.88401648282758!3d21.238283130091787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fa0b44e199f%3A0xb2b2adaf3c125594!2sOpera%20Business%20Hub!5e0!3m2!1sen!2sin!4v1744800707977!5m2!1sen!2sin"
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full mb-10"
            ></iframe>
          </div>
        </div>

        
      </section>
    </>
  );
};

export default Growcodecontact;
