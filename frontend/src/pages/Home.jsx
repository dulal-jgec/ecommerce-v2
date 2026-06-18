// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import Navigation from "../customer/components/HomeSection/Navigation";
import HeroSection from "../customer/components/HomeSection/HeroSection";
import HomeSection from "../customer/components/HomeSection/HomeSection";
import Footer from "../customer/components/Footer/Footer";
import {
  getFeaturedProducts,
  getNewArrivalProducts,
  getBestSellerProducts,
  getTrendingProducts,
} from "../services/productService";

import { useCart } from "../context/CartContext";

const Home = () => {
  const { addToCart } = useCart();

  const handleAddToCart = async (product) => {
    console.log("HOME ADD TO CART =", product);

    await addToCart({
      id: product.id,
      quantity: 1,
      color: product.images?.[0]?.color,
    });
  };

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState({
    featured: true,
    newArrivals: true,
    bestSellers: true,
    trending: true,
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchFeaturedProducts(),
      fetchNewArrivals(),
      fetchBestSellers(),
      fetchTrendingProducts(),
    ]);
  };

  const fetchFeaturedProducts = async () => {
    try {
      const data = await getFeaturedProducts();
      console.log("FEATURED =", data);
      setFeaturedProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        featured: false,
      }));
    }
  };
  const fetchNewArrivals = async () => {
    try {
      const data = await getNewArrivalProducts();
      console.log("NEW ARRIVALS =", data);
      setNewArrivals(data);
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
    } finally {
      setLoading((prev) => ({ ...prev, newArrivals: false }));
    }
  };

  const fetchBestSellers = async () => {
    try {
      const data = await getBestSellerProducts();
      console.log("BEST SELLERS =", data);
      setBestSellers(data);
    } catch (error) {
      console.error("Error fetching best sellers:", error);
    } finally {
      setLoading((prev) => ({ ...prev, bestSellers: false }));
    }
  };

  const fetchTrendingProducts = async () => {
    try {
      const data = await getTrendingProducts();
      setTrendingProducts(data);
    } catch (error) {
      console.error("Error fetching trending products:", error);
    } finally {
      setLoading((prev) => ({ ...prev, trending: false }));
    }
  };

  return (
    <div className="min-h-screen bg-red">
      <main>
        <HeroSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomeSection
            title="Featured Collection"
            subtitle="Curated just for you"
            products={featuredProducts}
            loading={loading.featured}
            onAddToCart={handleAddToCart}
            type="featured"
          />

          <HomeSection
            title="New Arrivals"
            subtitle="Fresh styles added weekly"
            products={newArrivals}
            loading={loading.newArrivals}
            onAddToCart={handleAddToCart}
            type="new-arrivals"
          />

          <HomeSection
            title="Best Sellers"
            subtitle="Most loved by our customers"
            products={bestSellers}
            loading={loading.bestSellers}
            onAddToCart={handleAddToCart}
            type="best-sellers"
          />

          <HomeSection
            title="Trending Now"
            subtitle="Hot picks of the season"
            products={trendingProducts}
            loading={loading.trending}
            onAddToCart={handleAddToCart}
            type="trending"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
