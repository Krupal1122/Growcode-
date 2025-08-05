import React from "react";

const testimonials = [
  {
    quote:
      "GrowCode transformed our business with their exceptional web development services. Their team delivered a solution that exceeded our expectations and significantly improved our online presence.",
    name: "John Smith",
    position: "CEO, TechSolutions Inc.",
    avatar: "https://placehold.co/100x100/6366f1/ffffff",
  },
  {
    quote:
      "The mobile app developed by GrowCode has revolutionized how we interact with our customers. The team's attention to detail and commitment to quality is truly impressive.",
    name: "Sarah Johnson",
    position: "Marketing Director, Retail Plus",
    avatar: "https://placehold.co/100x100/10b981/ffffff",
  },
  {
    quote:
      "Working with GrowCode on our database solutions was a game-changer. Their expertise and professionalism helped us optimize our operations and scale efficiently.",
    name: "Michael Chen",
    position: "CTO, DataFlow Systems",
    avatar: "https://placehold.co/100x100/8b5cf6/ffffff",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-gray-100 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Client Testimonials</h2>
        <p className="text-gray-600 mb-12 text-lg">
          What our clients say about our services
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 transform hover:scale-[1.02] transition duration-300"
            >
              <p className="text-gray-700 mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full border-2 border-indigo-500"
                />
                <div className="text-left">
                  <h4 className="text-gray-900 font-semibold">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.position}</p>
                  <div className="flex mt-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.781 1.401 8.172L12 18.896l-7.335 3.867 1.401-8.172L.132 9.21l8.2-1.192z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
