import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBolt, FaWater, FaFire, FaLeaf } from "react-icons/fa";

const disasters = [
  { name: "Earthquake", path: "/earthquake", icon: <FaBolt className="inline mr-2 text-yellow-500" /> },
  { name: "Flood", path: "/flood", icon: <FaWater className="inline mr-2 text-blue-500" /> },
  { name: "Fire", path: "/fire", icon: <FaFire className="inline mr-2 text-red-500" /> },
  { name: "Cyclone / Storm", path: "/cyclone", icon: <FaLeaf className="inline mr-2 text-green-500" /> },
];

const DisastersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Disaster Education Modules</h1>
      <ul>
        {disasters.map((disaster, idx) => (
          <li
            key={idx}
            onClick={() => navigate(disaster.path)}
            className="cursor-pointer p-4 mb-3 border rounded shadow hover:bg-gray-100 flex items-center"
          >
            {disaster.icon} <span className="text-xl">{disaster.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisastersPage;
