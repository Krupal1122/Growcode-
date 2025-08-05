import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div
      className="w- h-64 relative overflow-hidden"
      style={{
        backgroundImage: `url(${project.bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0  p-6 flex flex-col justify-end ">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <p>{project.desc}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
