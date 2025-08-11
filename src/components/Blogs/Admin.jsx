import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

const Admin = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-64 flex-1 overflow-y-auto p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;