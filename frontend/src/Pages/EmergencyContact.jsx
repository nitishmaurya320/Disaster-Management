import React, { useState } from "react";

const emergencyContacts = [
  {
    category: "Police",
    contacts: [
      { name: "All India Police Helpline", number: "112" },
      { name: "Delhi Police", number: "100" },
      { name: "Mumbai Police", number: "100" },
    ],
  },
  {
    category: "Ambulance / Medical",
    contacts: [
      { name: "All India Ambulance", number: "108" },
      { name: "AIIMS Emergency", number: "011-26588500" },
      { name: "Apollo Hospitals", number: "1860-500-1066" },
    ],
  },
  {
    category: "Fire Services",
    contacts: [
      { name: "Delhi Fire Service", number: "101" },
      { name: "Mumbai Fire Brigade", number: "101" },
    ],
  },
  {
    category: "Disaster Management Authorities",
    contacts: [
      { name: "National Disaster Management Authority (NDMA)", number: "011-26701700" },
    ],
  },
];

const stateDisasterContacts = {
  "Andhra Pradesh": "0866-2410978",
  "Arunachal Pradesh": "0360-2212809",
  "Assam": "0361-2230150",
  "Bihar": "0612-2236010",
  "Chhattisgarh": "0771-2224988",
  "Goa": "0832-2439687",
  "Gujarat": "079-23252000",
  "Haryana": "0172-2740733",
  "Himachal Pradesh": "0177-2622114",
  "Jharkhand": "0651-2225394",
  "Karnataka": "080-22325044",
  "Kerala": "0471-2329800",
  "Madhya Pradesh": "0755-2670471",
  "Maharashtra": "022-22023971",
  "Manipur": "0385-2411232",
  "Meghalaya": "0364-2222337",
  "Mizoram": "0389-2338224",
  "Nagaland": "0370-2271311",
  "Odisha": "0674-2390630",
  "Punjab": "0172-2740733",
  "Rajasthan": "0141-2229330",
  "Sikkim": "03592-202457",
  "Tamil Nadu": "044-25693000",
  "Telangana": "040-23390748",
  "Tripura": "0381-2329611",
  "Uttar Pradesh": "0522-2288281",
  "Uttarakhand": "0135-2713106",
  "West Bengal": "033-23379894",
  "Delhi": "011-23378040",
  "Jammu & Kashmir": "0191-2544940",
  "Ladakh": "01982-256612",
  "Puducherry": "0413-2257201",
  "Chandigarh": "0172-2740733",
  "Dadra & Nagar Haveli and Daman & Diu": "0260-2644203",
  "Lakshadweep": "0489-2411617",
  "Andaman & Nicobar": "03192-232102"
};

const EmergencyContacts = () => {
  const [selectedState, setSelectedState] = useState("");

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Emergency Contact Directory - India</h1>

      {/* National Emergency Contacts */}
      {emergencyContacts.map((group, index) => (
        <div key={index} className="mb-6 border rounded p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">{group.category}</h2>
          <ul>
            {group.contacts.map((contact, idx) => (
              <li key={idx} className="mb-2 flex justify-between items-center">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-gray-600">Emergency No: {contact.number}</p>
                </div>
                <a
                  href={`tel:${contact.number}`}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Call
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* State Disaster Management Contacts */}
      <div className="mb-6 border rounded p-4 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">State Disaster Management Contacts</h2>
        <select
          value={selectedState}
          onChange={handleStateChange}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Select your state</option>
          {Object.keys(stateDisasterContacts).map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>

        {selectedState && (
          <div className="p-4 border rounded bg-gray-100 text-center">
            <p className="font-semibold">{selectedState}</p>
            <p>Emergency No: {stateDisasterContacts[selectedState]}</p>
            <a
              href={`tel:${stateDisasterContacts[selectedState]}`}
              className="mt-2 inline-block bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Call
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;
