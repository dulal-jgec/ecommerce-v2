// src/features/home/pages/HomePage.jsx
import React from 'react';
import HeroCarousel from '../sections/HeroCarousel';
import CategorySection from '../sections/CategorySection';
import FlashSale from '../sections/FlashSale';
import FeaturedProducts from '../sections/FeaturedProducts';
import BestSellers from '../sections/BestSellers';
import SpecialOfferBanner from '../sections/SpecialOfferBanner';
import NewArrivals from '../sections/NewArrivals';
import Testimonials from '../sections/Testimonials';
import NewsletterSection from '../sections/NewsletterSection';

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      <HeroCarousel />
      <CategorySection />
      <FlashSale />
      <FeaturedProducts />
      <BestSellers />
      <SpecialOfferBanner />
      <NewArrivals />
      <Testimonials />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;