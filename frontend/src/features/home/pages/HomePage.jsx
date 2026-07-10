// src/features/home/pages/HomePage.jsx
import React from 'react';
import HeroCarousel from '../sections/HeroCarousel';
import CategorySection from '../sections/CategorySection';
import FlashSale from '../sections/FlashSale';
import FeaturedProducts from '../sections/FeaturedProducts';
import BestSellers from '../sections/BestSellers';
import NewArrivals from '../sections/NewArrivals';
import TrendingSection from '../sections/TrendingSection';
import NewsletterSection from '../sections/NewsletterSection';

const HomePage = () => {
  return (
<div className="bg-white m-0 p-0">     <HeroCarousel />
      <CategorySection />
      <FlashSale />
      <FeaturedProducts />
      <BestSellers />
      <NewArrivals />
      <TrendingSection />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;