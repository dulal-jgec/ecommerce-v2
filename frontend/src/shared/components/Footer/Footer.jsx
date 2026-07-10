// src/shared/components/Footer/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">

        {/* Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">

          {/* Brand - Full width on mobile, span 2 cols */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="text-3xl font-bold"
            >
              <span className="text-indigo-600">Shop</span>
              <span className="text-white">Ly</span>
            </Link>

            <p className="mt-4 text-sm text-gray-400 leading-6">
              ShopLy is a modern full-stack e-commerce platform where
              customers can discover products, sellers can manage stores,
              and administrators control the marketplace.
            </p>

            <div className="flex flex-wrap gap-3 mt-5">
              {[
                { icon: FaFacebookF, color: "hover:bg-indigo-600", href: "https://facebook.com" },
                { icon: FaTwitter, color: "hover:bg-sky-500", href: "https://twitter.com" },
                { icon: FaInstagram, color: "hover:bg-pink-600", href: "https://instagram.com" },
                { icon: FaYoutube, color: "hover:bg-red-600", href: "https://youtube.com" },
                { icon: FaLinkedinIn, color: "hover:bg-blue-700", href: "https://linkedin.com" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-9 h-9 rounded-full bg-gray-800 ${social.color} transition flex items-center justify-center hover:scale-110`}
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-base font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-indigo-400 transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-indigo-400 transition">Products</Link></li>
              <li><Link to="/cart" className="hover:text-indigo-400 transition">Cart</Link></li>
              <li><Link to="/orders" className="hover:text-indigo-400 transition">My Orders</Link></li>
              <li><Link to="/profile" className="hover:text-indigo-400 transition">Profile</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-base font-semibold mb-4">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/faq" className="hover:text-indigo-400 transition">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-indigo-400 transition">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-indigo-400 transition">Return Policy</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-indigo-400 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-400 transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact - Full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-white text-base font-semibold mb-4">
              Contact
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <FiMapPin className="text-indigo-500 mt-1 flex-shrink-0" size={17} />
                <span>
                  Jalpaiguri,
                  <br />
                  West Bengal, India
                </span>
              </div>
              <div className="flex gap-3">
                <FiPhone className="text-indigo-500 mt-1 flex-shrink-0" size={17} />
                <span>+91 XXXXX XXXXX</span>
              </div>
              <div className="flex gap-3">
                <FiMail className="text-indigo-500 mt-1 flex-shrink-0" size={17} />
                <span>support@shoply.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
          <p className="text-gray-500 text-center sm:text-left">
            © {currentYear} ShopLy. All Rights Reserved.
          </p>
          <p className="text-gray-500 text-center sm:text-right">
            Built with ❤️ using React, Spring Boot & MySQL
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;