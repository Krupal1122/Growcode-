import React from 'react';
import { FaGamepad, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'; // Gamepad, Phone, Email icons

const Contact = () => {
  const contactDetails = [
    {
      icon: <FaGamepad className="text-xl" />,
      title: 'Address',
      detail: '123 Tech Park, Ahmedabad, Gujarat 380015, India',
    },
    {
      icon: <FaPhoneAlt className="text-xl" />,
      title: 'Phone',
      detail: '+91 98765 43210',
    },
    {
      icon: <FaEnvelope className="text-xl" />,
      title: 'Email',
      detail: 'info@growcode.com',
    },
  ];

  return (
    <section
      id="contact"
      className="py-32 bg-gradient-to-br from-white via-blue-50 to-purple-100 relative overflow-hidden"
    >
      <div
        className="container mx-auto text-center px-4"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Let’s Connect</h2>
        <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
          Have a project in mind or just want to say hi? We’d love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form className="bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/40 transition-all hover:scale-[1.02] duration-300 ease-in-out">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 transition"
                  placeholder="Your Name"
                  required
                />
                <input
                  type="email"
                  className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 transition"
                  placeholder="Your Email"
                  required
                />
              </div>
              <input
                type="text"
                className="w-full p-4 mb-6 bg-white border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 transition"
                placeholder="Subject"
                required
              />
              <textarea
                className="w-full p-4 mb-6 bg-white border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 transition"
                rows="5"
                placeholder="Your Message"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-indigo-500 transition-all duration-300 shadow-lg"
              >
                ✉️ Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Card with Game Icons */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-10 shadow-2xl space-y-8 text-left">
            <h3 className="text-3xl font-semibold text-gray-900">Get In Touch</h3>

            {contactDetails.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-xl shadow-md">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-gray-600">{item.detail}</p>
                </div>
              </div>
            ))}

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🕒 Business Hours</h4>
              <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Sat: 10:00 AM - 2:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
