import React from "react";
import bgImage from "../img/th (5).jpg";

const jobData = [
  {
    title: "React.js Developer",
    exp: "2",
    positions: "1",
    icon: "https://img.icons8.com/ios/50/000000/react-native.png",
  },
  {
    title: "UI/UX Designer",
    exp: "2.5",
    positions: "3",
    icon: "https://img.icons8.com/ios/50/000000/ux.png",
  },
  {
    title: "Node.js Developer",
    exp: "1",
    positions: "3",
    icon: "https://img.icons8.com/ios/50/000000/nodejs.png",
  },
  {
    title: "Flutter Developer",
    exp: "1.5",
    positions: "1",
    icon: "https://img.icons8.com/ios/50/000000/flutter.png",
  },
  {
    title: "Next.js Developer",
    exp: "1",
    positions: "1",
    icon: "https://img.icons8.com/ios/50/000000/next.js.png",
  },
  {
    title: "Android Developer",
    exp: "2",
    positions: "1",
    icon: "https://img.icons8.com/ios/50/000000/android.png",
  },
];

const CareerGrid = () => {
  return (
    <section className=" bg-white mb-16">
    <div
          className="w-full  bg-cover bg-center rounded-xl overflow-hidden"
          style={{
            backgroundImage: `url(${bgImage})`,
            height: "15vh",
          }}
        >
          <div className="h-full w-full bg-white/20 dark:bg-black/60 flex items-center justify-center transition-colors duration-300">
            <p className="text-[35px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              Career
            </p>
          </div>
        </div>
      <div className="max-w-7xl mt-20 mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-20">
        {jobData.map((job, idx) => (
          <div
            key={idx}
            className="border border-blue-300 rounded-lg p-8 w-96 bg-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out relative text-center transform hover:scale-105"
          >
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <img
                src={job.icon}
                alt={job.title}
                className="w-20 h-20 object-contain border-4 border-blue-300 p-3 bg-white rounded-full"
              />
            </div>
            <div className="mt-16 ">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{job.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                Exp: {job.exp} Years | Positions: {job.positions}
              </p>
              <button className="mt-4 inline-flex items-center gap-2 text-black hover:text-blue-600 font-medium transition">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerGrid;
