// src/features/home/sections/NewsletterSection.jsx
import React from 'react';
import { Send } from 'lucide-react';

const NewsletterSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📬 Stay in the Loop
        </h2>
        <p className="text-gray-500 mb-6">
          Get exclusive deals, new arrivals and tech updates delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
          <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2">
            <Send size={18} />
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;