import React from 'react'


const ServiceCard = ({ title, description }) => {
    return (
      <div className="card p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a href="#" className="text-indigo-500 hover:underline">Learn more</a>
      </div>
    );
  };

  export default ServiceCard;