// components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md h-full">
      <div className="p-4">
        <div className="text-2xl font-bold mb-6">🏠</div>
        <ul className="space-y-2">
          <li className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <span className="mr-2">🏠</span>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <span className="mr-2">👥</span>
            <Link to="/admin/team">Team</Link>
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <span className="mr-2">📁</span>
            <Link to="/admin/projects">Projects</Link>
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <span className="mr-2">📅</span>
            <Link to="/admin/calendar">Calendar</Link>
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <span className="mr-2">📄</span>
            <Link to="/admin/documents">Documents</Link>
          </li>
          <li className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
            <span className="mr-2">📊</span>
            <Link to="/admin/reports">Reports</Link>
          </li>
        </ul>
        <div className="mt-6">
          <p className="text-sm text-gray-500">Your teams</p>
          <ul className="mt-2 space-y-1">
            <li className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <span className="mr-2">H</span>
              <Link to="/admin/heroicons">Heroicons</Link>
            </li>
            <li className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <span className="mr-2">T</span>
              <Link to="/admin/tailwind-labs">Tailwind Labs</Link>
            </li>
            <li className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <span className="mr-2">W</span>
              <Link to="/admin/workcation">Workcation</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;