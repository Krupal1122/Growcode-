import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Briefcase,
  Users,
  Folder,
  FileText,
  BarChart,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: <Home size={20} /> },
  { label: "Team", to: "/admin/team", icon: <Briefcase size={20} /> },
  { label: "Projects", to: "/admin/projects", icon: <Users size={20} /> },
  { label: "Calendar", to: "/admin/calendar", icon: <Folder size={20} /> },
  { label: "Blogs", to: "/admin/Blogs", icon: <FileText size={20} /> },
  { label: "Reports", to: "/admin/reports", icon: <BarChart size={20} /> },
];

function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`sidebar bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen fixed top-0 left-0 border-r border-gray-800 transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Floating Toggle Button */}
      <button
        onClick={handleSidebarToggle}
        className="absolute top-6 -right-5 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl  transition-colors border border-g"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isCollapsed ? "M4 12h16M12 4l7 7-7 7" : "M15 19l-7-7 7-7"}
          />
        </svg>
      </button>

      {/* Logo */}
      <div className="p-6 text-center border-b border-gray-700">
        <h1
          className={`text-2xl font-extrabold tracking-wide transition-all duration-300 ${
            isCollapsed ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
        >
          NexusFlow
        </h1>
      </div>

      {/* Menu Items - grow so footer stays pinned */}
      <ul className="p-4 space-y-2 flex-grow overflow-y-auto no-scrollbar">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.to;
          return (
            <li key={idx}>
              <Link
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-gray-700 hover:translate-x-1"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <span>{item.icon}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* User Profile Section */}
      <div
        className={`p-4 border-t border-gray-700 bg-gray-900/70 backdrop-blur-md transition-all duration-300 ${
          isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <img
            src="https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg"
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover border border-gray-600"
          />
          {!isCollapsed && (
            <div>
              <p className="text-sm font-semibold">Alex Morgan</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
