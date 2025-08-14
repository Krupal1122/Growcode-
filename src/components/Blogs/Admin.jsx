// src/components/Blogs/Admin.js
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useSidebar } from "../../SidebarContext";

const Admin = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex">
      <Sidebar />
      <div
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;