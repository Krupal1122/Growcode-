import React from 'react'


const TestimonialCard = ({ quote, author, position }) => {
    return (
      <div className="testimonial-card border rounded-lg shadow-md p-6 mb-6">
        <p className="text-gray-600 mb-4">"{quote}"</p>
        <div className="testimonial-author flex items-center">
          <div className="testimonial-avatar w-10 h-10 rounded-full overflow-hidden mr-3">
            <img src="https://placehold.co/100x100" alt={author} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-semibold">{author}</h4>
            <p className="text-gray-500">{position}</p>
          </div>
        </div>
      </div>
    );
  };

  export default TestimonialCard;