// src/features/home/sections/HeroCarousel.jsx
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getActiveBanners } from "../services/homeService";
import { Link } from "react-router-dom";

const HeroCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBanners();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const loadBanners = async () => {
    setLoading(true);
    try {
      const data = await getActiveBanners();
      setSlides(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  if (loading) {
    return (
      <div className="h-[400px] md:h-[500px] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-gray-500 text-sm">Loading banners...</p>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="h-[400px] md:h-[500px] flex items-center justify-center bg-gray-100">
        <p className="text-gray-400">No banners available</p>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative overflow-hidden w-full mt-0 pt-0">
      <div 
        className="relative h-[400px] md:h-[500px] lg:h-[550px] w-full bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${currentSlide.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

        <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <div className="text-white max-w-2xl space-y-4">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium tracking-wider uppercase border border-white/30">
              {currentSlide.tag || "New Collection"}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
              {currentSlide.title}
            </h2>
            <p className="text-lg md:text-xl text-white/95 font-medium drop-shadow-md">
              {currentSlide.subtitle}
            </p>
            <Link
              to={currentSlide.buttonLink || "/products"}
              className="inline-block mt-2 px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg hover:shadow-xl hover:scale-105 transform duration-200"
            >
              {currentSlide.buttonText || "Shop Now"}
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-lg transition-all hover:scale-110"
      >
        <ChevronLeft size={22} className="text-gray-700" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-lg transition-all hover:scale-110"
      >
        <ChevronRight size={22} className="text-gray-700" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === index
                ? "bg-white w-8 h-2"
                : "bg-white/50 hover:bg-white/80 w-2 h-2"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-4 right-6 z-20 text-white/70 text-xs font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
        {currentIndex + 1} / {slides.length}
      </div>
    </section>
  );
};

export default HeroCarousel;