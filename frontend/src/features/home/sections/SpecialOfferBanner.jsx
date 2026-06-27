import React from 'react';

const SpecialOfferBanner = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          🎉 Mega Sale!
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-6">
          Get Flat 50% OFF on Electronics & Gadgets
        </p>
        <p className="text-lg text-white/80 mb-8">
          Use code: <span className="bg-white/20 px-4 py-2 rounded-lg font-bold">FLASH50</span>
        </p>
        <button className="px-10 py-3 bg-white text-blue-700 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
          Shop Now →
        </button>
      </div>
    </section>
  );
};

export default SpecialOfferBanner;