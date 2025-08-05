import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white pt-16 pb-10 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        <div>
          <h2 className="text-3xl font-bold mb-4">GrowCode</h2>
          <p className="text-gray-300 mb-6">
            Transforming ideas into digital reality with innovative IT solutions.
          </p>
          <div className="flex space-x-4">
            {[
              { icon: 'fab fa-facebook-f' },
              { icon: 'fab fa-twitter' },
              { icon: 'fab fa-linkedin-in' },
            ].map((item, index) => (
              <a
                key={index}
                href="#"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
              >
                <i className={`${item.icon} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-300">
            <li><a href="#services" className="hover:text-white">Services</a></li>
            <li><a href="#projects" className="hover:text-white">Projects</a></li>
            <li><a href="#team" className="hover:text-white">Team</a></li>
            <li><a href="#testimonials" className="hover:text-white">Testimonials</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-3 text-gray-300">
            <li><i className="fas fa-map-marker-alt mr-2"></i> 123 Tech Park, Ahmedabad</li>
            <li><i className="fas fa-phone-alt mr-2"></i> +91 98765 43210</li>
            <li><i className="fas fa-envelope mr-2"></i> info@growcode.com</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-300 mb-4">
            Subscribe to our newsletter for the latest updates.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              className="w-full px-4 py-2 rounded-full text-black focus:outline-none"
              placeholder="Your email address"
              required
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-full font-medium transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-400 text-sm">
        &copy; 2024 GrowCode IT Solutions. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
