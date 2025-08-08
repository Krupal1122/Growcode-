import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Briefcase,
  Users,
  Folder,
  FileText,
  BarChart,
  Phone,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: <Home size={20} /> },
  { label: "Team", to: "/admin/team", icon: <Briefcase size={20} /> },
  { label: "Projects", to: "/admin/projects", icon: <Users size={20} /> },
  { label: "Calendar", to: "/admin/calendar", icon: <Folder size={20} /> },
  { label: "Documents", to: "/admin/documents", icon: <FileText size={20} /> },
  { label: "Reports", to: "/admin/reports", icon: <Phone size={20} /> },
];

function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-lg h-screen border-r border-gray-200 fixed top-0 left-0 overflow-y-auto">
      <div className="p-6 text-center border-b border-gray-100">
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-wide">Admin Panel</h1>
      </div>
      <ul className="p-4 space-y-2">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.to;
          return (
            <li key={idx}>
              <Link
                to={item.to}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;