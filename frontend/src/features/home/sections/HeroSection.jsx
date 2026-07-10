// src/features/home/sections/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-white/5"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium tracking-wider uppercase border border-white/30 mb-4">
            Summer Sale
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Premium Lifestyle <br />
            <span className="text-yellow-300">Products</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mt-4 max-w-lg">
            Sustainably sourced - Ethically made - Planet approved
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl"
          >
            Shop Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;