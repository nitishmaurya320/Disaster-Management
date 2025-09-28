import React from "react";
import { useNavigate } from "react-router-dom";

const drills = [
  {
    name: "Earthquake Drill",
    description: "Learn how to stay safe during earthquakes.",
    route: "/earthquake-drill",
    color: "bg-red-500",
  },
  {
    name: "Flood Drill",
    description: "Practice quick actions during floods.",
    route: "/flood-drill",
    color: "bg-blue-500",
  },
  {
    name: "Fire Drill",
    description: "Train on proper evacuation during fire.",
    route: "/fire-drill",
    color: "bg-orange-500",
  },
  {
    name: "Tsunami Drill",
    description: "Simulate response to a tsunami warning.",
    route: "/tsunami-drill",
    color: "bg-teal-500",
  },
];

export default function DrillsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">Virtual Disaster Drills</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {drills.map((drill, idx) => (
          <div
            key={idx}
            onClick={() => navigate(drill.route)}
            className={`cursor-pointer p-6 rounded-2xl shadow-lg hover:scale-105 transform transition-all duration-300 ${drill.color} text-white`}
          >
            <h2 className="text-2xl font-semibold mb-2">{drill.name}</h2>
            <p className="text-sm">{drill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
