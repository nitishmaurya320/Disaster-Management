import React, { useEffect, useState } from "react";

const Home = () => {
  const images = ["earthquake", "drought", "flood"];
  const [imageIndex, setImageIndex] = useState(0);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Function to get user's location and send SOS
  const handleSOS = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        const message = `SOS! I need help. My location: https://www.google.com/maps?q=${latitude},${longitude}`;
        
        // Open SMS app with message (for mobile devices)
        window.location.href = `sms:?body=${encodeURIComponent(message)}`;

        // Optional: for WhatsApp use:
        // window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
      },
      (error) => {
        alert("Unable to retrieve your location. Please allow location access.");
      }
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className={`bg-cover bg-center text-white h-[400px] transition-all py-20 duration-500`}
        style={{ backgroundImage: `url(/assets/${images[imageIndex]}.jpg)` }}
      >
        <div className="container mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shield<span className="text-yellow-400">ED</span>
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Stay safe, stay prepared. Get real-time alerts, resources, and support during disasters.
          </p>
          <div className="space-x-4">
            <a
              href="/help"
              className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300"
            >
              Get Help
            </a>
           
          </div>

          {/* SOS Button */}
          <div className="mt-6">
            <button
              onClick={handleSOS}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition"
            >
              🚨 SOS
            </button>
            {location && (
              <p className="mt-2 text-sm text-white">
                Location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Rest of your sections ... */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 grid sm:grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Live Alerts Card */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-3 text-blue-700">Live Alerts</h2>
            <p className="text-gray-600 mb-4">
              Get real-time disaster alerts and stay updated about your area.
            </p>
            <a 
              href="/alerts" 
              className="text-yellow-500 font-semibold hover:underline"
            >
              View Alerts →
            </a>
          </div>

          {/* Modules Card */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-3 text-blue-700">Modules</h2>
            <p className="text-gray-600 mb-4">
              Find shelters, hospitals, and emergency contacts near you.
            </p>
            <a 
              href="/modules" 
              className="text-yellow-500 font-semibold hover:underline"
            >
              Explore →
            </a>
          </div>

          {/* Donate Card */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-3 text-blue-700">Donate</h2>
            <p className="text-gray-600 mb-4">
              Contribute to disaster relief funds and support affected families.
            </p>
            <a 
              href="/donate" 
              className="text-yellow-500 font-semibold hover:underline"
            >
              Donate Now →
            </a>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-3 text-blue-700">Virtual Drills</h2>
            <p className="text-gray-600 mb-4">
              Interactive simulations that train users to respond safely during disasters.
            </p>
            <a 
              href="/drills" 
              className="text-yellow-500 font-semibold hover:underline"
            >
              Start drills →
            </a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h2 className="text-2xl font-bold mb-3 text-blue-700">Emergency contacts</h2>
            <p className="text-gray-600 mb-4">
              View emergency contact numbers for India.
            </p>
            <a 
              href="/emergency-contacts" 
              className="text-yellow-500 font-semibold hover:underline"
            >
              View Contacts →
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center md:text-left">
          <h2 className="text-3xl font-bold text-blue-700 mb-4"> Why ShieldED? </h2>
          <p className="text-gray-600 max-w-3xl">
            Disasters can strike anytime—earthquakes, floods, fires, or pandemics. Our mission is to provide <strong>real-time alerts, essential resources, and community support</strong> to help people prepare, respond, and recover effectively.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
