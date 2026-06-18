// src/customer/components/HomeSection/HeroSection.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      title: "Elevate Your Style",
      subtitle: "Discover the latest trends in fashion",
      cta: "Shop Now",
      image:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600",
      bgColor: "from-gray-900 to-gray-700",
    },
    {
      id: 2,
      title: "Premium Collection",
      subtitle: "Luxury essentials for modern living",
      cta: "Explore Collection",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600",
      bgColor: "from-gray-800 to-gray-600",
    },
    {
      id: 3,
      title: "Summer Essentials",
      subtitle: "Lightweight, breathable, stylish",
      cta: "Shop Summer",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600",
      bgColor: "from-gray-900 to-gray-700",
    },
  ];

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-60`}
              />

              {/* Content */}
              <div className="relative h-full flex items-center justify-start px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl text-white animate-fadeInUp">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 opacity-90">
                    {slide.subtitle}
                  </p>
                  <div className="flex gap-4">
                    <button className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                      {slide.cta}
                    </button>
                    <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105">
                      Explore Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

     <style>{`
  .swiper-pagination-bullet {
    background: #9ca3af !important;
  }

  .swiper-pagination-bullet-active {
    background: #111827 !important;
  }
`}</style>
    </div>
  );
};

export default HeroSection;
