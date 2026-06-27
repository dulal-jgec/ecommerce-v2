// src/features/home/sections/HeroCarousel.jsx (Simple Version - No Slider)
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Premium Smartphones',
    subtitle: 'Up to 40% off on latest models',
    bg: 'from-blue-600 to-blue-800',
    emoji: '📱',
    cta: 'Shop Now',
  },
  {
    id: 2,
    title: 'Smart Watches',
    subtitle: 'Track your fitness in style',
    bg: 'from-purple-600 to-purple-800',
    emoji: '⌚',
    cta: 'Explore',
  },
  {
    id: 3,
    title: 'Laptop Sale',
    subtitle: 'Best deals on gaming & work laptops',
    bg: 'from-emerald-600 to-emerald-800',
    emoji: '💻',
    cta: 'View Deals',
  },
  {
    id: 4,
    title: 'Wireless Headphones',
    subtitle: 'Immersive sound, premium quality',
    bg: 'from-orange-600 to-orange-800',
    emoji: '🎧',
    cta: 'Shop Now',
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative overflow-hidden">
      <div className={`bg-gradient-to-r ${currentSlide.bg} h-[400px] md:h-[500px] flex items-center px-8 md:px-16 transition-all duration-500`}>
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center">
          <div className="text-white space-y-4 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold">{currentSlide.title}</h2>
            <p className="text-lg md:text-xl text-white/90">{currentSlide.subtitle}</p>
            <button className="px-8 py-3 bg-white text-gray-800 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
              {currentSlide.cta} →
            </button>
          </div>
          <div className="text-8xl md:text-[150px] mt-4 md:mt-0">
            {currentSlide.emoji}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
      >
        <ChevronLeft size={24} className="text-gray-700" />
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
      >
        <ChevronRight size={24} className="text-gray-700" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentIndex === index 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;