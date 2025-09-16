import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6 mt-10">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Logo / Project Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Shield<span className="text-yellow-400">ED</span>
          </h2>
          <p className="text-sm">
            Helping communities prepare, respond, and recover from disasters.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-yellow-300">Home</a></li>
            <li><a href="/alerts" className="hover:text-yellow-300">Alerts</a></li>
            <li><a href="/resources" className="hover:text-yellow-300">Resources</a></li>
            <li><a href="/help" className="hover:text-yellow-300">Help</a></li>
            <li><a href="/donate" className="hover:text-yellow-300">Donate</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p className="text-sm">📞 Emergency: 108 / 112</p>
          <p className="text-sm">📧 support@disastercare.org</p>
          <p className="text-sm">📍 Kanpur, India</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-300 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} DisasterCare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
