import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <div className="text-2xl font-bold">
          Shield<span className="text-yellow-400">ED</span>
        </div>

        {/* Links */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li><a href="/" className="hover:text-yellow-300">Home</a></li>
          <li><a href="/alerts" className="hover:text-yellow-300">Alerts</a></li>
          <li><a href="/modules" className="hover:text-yellow-300">Modules</a></li>
          <li><a href="/team" className="hover:text-yellow-300">Team</a></li>
          <li><a href="/volunteer" className="hover:text-yellow-300">Volunteer</a></li>
          <li><a href="/donate" className="hover:text-yellow-300">Donate</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="focus:outline-none">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
