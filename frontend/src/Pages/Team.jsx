import React from "react";

const teamMembers = [
  {
    name: "Teammate 1",
    role: "Frontend Developer",
    image: "", // Add image URL here later
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
  },
  {
    name: "Teammate 2",
    role: "Backend Developer",
    image: "",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
  },
  {
    name: "Teammate 3",
    role: "UI/UX Designer",
    image: "",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
  },
  {
    name: "Teammate 4",
    role: "Project Manager",
    image: "",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
  },
  {
    name: "Teammate 4",
    role: "Project Manager",
    image: "",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
  },
  {
    name: "Teammate 4",
    role: "Project Manager",
    image: "",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
  },
];

const TeamPage = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Our SIH Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300">
            <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center">
              {member.image ? (
                <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded" />
              ) : (
                <span className="text-gray-500 text-lg">Image Here</span>
              )}
            </div>
            <h2 className="text-xl font-semibold text-center">{member.name}</h2>
            <p className="text-gray-600 text-center mb-3">{member.role}</p>
            <div className="flex justify-center space-x-4">
              {member.social.linkedin && (
                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                  LinkedIn
                </a>
              )}
              {member.social.github && (
                <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">
                  GitHub
                </a>
              )}
              {member.social.twitter && (
                <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Twitter
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
