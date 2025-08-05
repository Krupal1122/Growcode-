import React from 'react'


const TeamMemberCard = ({ name, position }) => {
    return (
      <div className="team-card border rounded-lg shadow-md overflow-hidden">
        <img src="https://placehold.co/400x400" alt={name} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p className="text-gray-600 mb-4">{position}</p>
          <div className="flex space-x-2">
            <a href="#" className="text-indigo-500 hover:underline">LinkedIn</a>
            <a href="#" className="text-indigo-500 hover:underline">Twitter</a>
          </div>
        </div>
      </div>
    );
  };

  export default TeamMemberCard;