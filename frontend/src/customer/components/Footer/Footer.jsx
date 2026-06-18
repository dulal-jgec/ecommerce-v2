import React from "react";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-gray-300 mt-20">

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-12 sm:py-16">

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* SHOP */}
          <div>
            <h3 className="text-white font-semibold text-base sm:text-lg mb-5">
              SHOP
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-lime-300 cursor-pointer">Men's Kurtas</li>
              <li className="hover:text-lime-300 cursor-pointer">Women's Wear</li>
              <li className="hover:text-lime-300 cursor-pointer">New Arrivals</li>
              <li className="hover:text-lime-300 cursor-pointer">Festive</li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h3 className="text-white font-semibold text-base sm:text-lg mb-5">
              HELP
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-lime-300 cursor-pointer">Contact</li>
              <li className="hover:text-lime-300 cursor-pointer">FAQs</li>
              <li className="hover:text-lime-300 cursor-pointer">Returns</li>
              <li className="hover:text-lime-300 cursor-pointer">Shipping</li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="text-white font-semibold text-base sm:text-lg mb-5">
              ABOUT
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-lime-300 cursor-pointer">Our Story</li>
              <li className="hover:text-lime-300 cursor-pointer">Blog</li>
              <li className="hover:text-lime-300 cursor-pointer">Careers</li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-white font-semibold text-base sm:text-lg mb-3">
              Get 15% off your first order
            </h3>

            <p className="text-gray-400 text-sm mb-5">
              Subscribe for latest offers & updates.
            </p>

            {/* RESPONSIVE INPUT */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm outline-none focus:border-lime-400"
              />

              <button className="w-full sm:w-auto bg-lime-400 hover:bg-lime-300 px-5 py-3 rounded-full text-emerald-950 font-semibold text-sm transition">
                Subscribe
              </button>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-6 text-xl sm:text-2xl">
              <Instagram className="hover:text-lime-300 cursor-pointer transition" />
              <Facebook className="hover:text-lime-300 cursor-pointer transition" />
              <Twitter className="hover:text-lime-300 cursor-pointer transition" />
              <LinkedIn className="hover:text-lime-300 cursor-pointer transition" />
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-400">

          <p className="text-center md:text-left">
            © 2026 Shoply. All rights reserved
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">Cookies</span>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;