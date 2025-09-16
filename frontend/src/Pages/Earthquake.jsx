import React, { useState } from "react";
import { FaHome, FaBolt, FaHandsHelping, FaExclamationTriangle, FaClipboardList } from "react-icons/fa";

const pages = [
  {
    title: "Before an Earthquake",
    icon: <FaHome className="inline mr-2 text-red-500" />,
    content: [
      "Consult a structural engineer to make your house earthquake resilient.",
      "Know your seismic zone and carry out necessary structural changes in your house.",
      "Preserve the design and layout drawings of your house for future reference.",
      "Repair deep plaster cracks on walls and ceilings.",
      "Fasten shelves securely to walls; place heavy/large objects on lower shelves. Provide strong support to power and gas appliances.",
      "Prepare an emergency kit with essential items for safety and survival.",
      "Develop an emergency communication and evacuation plan for your family.",
      "Learn the technique of 'Drop-Cover-Hold'.",
      "Avoid flood plains and filled-up areas for construction as far as possible.",
      "Educate yourself and family members about earthquake risk.",
    ],
  },
  {
    title: "During an Earthquake",
    icon: <FaBolt className="inline mr-2 text-yellow-500" />,
    content: [
      "Stay calm. Do not panic. If you're indoors, stay inside. If you're outside, stay outside.",
      "Do not use matches, candles, or any flame. Be careful with broken gas pipelines.",
      "If you're in a car, stop the car and stay inside until the earthquake stops.",
      "Drop under a table; Cover your head with one hand and Hold the table until the tremors last.",
      "Stay away from mirrors and windows. Do not exit the building while the earth is still shaking.",
      "Move outside as soon as the tremors stop. Do not use a lift.",
      "When outside, move away from buildings, trees, walls, and poles/electric lines.",
      "When inside a vehicle, pull over in an open place and remain inside; avoid bridges.",
      "Protect yourself by staying in a corner/under a strong table or bed/inside wall away from mirrors and windows.",
      "If inside an old and weak structure, take the fastest and safest way out.",
    ],
  },
  {
    title: "After an Earthquake",
    icon: <FaHandsHelping className="inline mr-2 text-green-500" />,
    content: [
      "Do not enter damaged buildings.",
      "If trapped in rubble: Do not light a matchstick; Cover your mouth with a cloth; Tap on a pipe or wall; Sound a whistle; Shout only as a last resort.",
      "Use stairs and not lifts or elevators.",
      "Move cautiously, check for unstable objects and hazards. Check yourself for injuries.",
      "Anticipate aftershocks, especially after a major earthquake.",
      "Stay away from beaches. Tsunamis and seiches sometimes occur after the shaking stops.",
      "Do not spread or believe in rumors.",
      "Leave a message stating where you are going if you must evacuate.",
      "Do not drive around damaged areas to keep roads free for rescue operations.",
      "Do not attempt to cross bridges/flyovers that may have been damaged.",
    ],
  },
  {
    title: "Community Safety",
    icon: <FaExclamationTriangle className="inline mr-2 text-blue-500" />,
    content: [
      "Practice Drop, Cover, Hold drills regularly.",
      "Practice evacuation drills regularly.",
      "Ensure exit routes are marked and firefighting equipment is working properly, especially in high-rise buildings.",
    ],
  },
];

const EarthquakeModule = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {pages[currentPage].icon} {pages[currentPage].title}
      </h1>
      <ul className="list-disc list-inside mb-6">
        {pages[currentPage].content.map((point, idx) => (
          <li key={idx} className="mb-2 flex items-start">
            <FaClipboardList className="mr-2 mt-1 text-gray-700" /> {point}
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded ${currentPage === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1}
          className={`px-4 py-2 rounded ${currentPage === pages.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EarthquakeModule;
