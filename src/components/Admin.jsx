import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Admin() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;