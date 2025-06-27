import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import { FiMenu } from 'react-icons/fi';

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md transition-all duration-200 font-medium 
    ${isActive ? 'bg-white text-green-800 shadow-md' : 'text-white hover:bg-green-700 hover:text-yellow-300'}`;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
        
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-green-800 text-white px-4 py-3 shadow-md">
        <h2 className="text-xl font-semibold tracking-wide">Dashboard</h2>
        <button onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? 'block' : 'hidden'} md:block fixed md:static top-0 left-0 z-40 w-64  bg-green-800 text-white min-h-screen px-6 py-6 space-y-6 transition-all duration-300`}
      >
        <h2 className="text-3xl font-bold mb-4 tracking-wide">PlantTrack</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
            Home
          </NavLink>
          <NavLink to="overviewpage" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
            Overview
          </NavLink>
          <NavLink to="dashallplants" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
            All Plants
          </NavLink>
          <NavLink to="dashmyplants" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
            My Plants
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-200  p-6 mt-16 md:mt-0 transition-all duration-300">
        <div className=" min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
