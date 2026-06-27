// src/features/home/sections/FlashSale.jsx
import React, { useState, useEffect } from 'react';
import { Clock, ShoppingCart, Star } from 'lucide-react';

const flashProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 129999,
    originalPrice: 169999,
    discount: 24,
    rating: 4.8,
    image: '📱',
    color: 'bg-blue-100',
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5',
    price: 24999,
    originalPrice: 34999,
    discount: 29,
    rating: 4.7,
    image: '🎧',
    color: 'bg-gray-200',
  },
  {
    id: 3,
    name: 'Apple Watch Ultra 2',
    price: 79999,
    originalPrice: 99999,
    discount: 20,
    rating: 4.6,
    image: '⌚',
    color: 'bg-blue-200',
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24',
    price: 109999,
    originalPrice: 139999,
    discount: 21,
    rating: 4.5,
    image: '📱',
    color: 'bg-purple-100',
  },
  {
    id: 5,
    name: 'MacBook Air M3',
    price: 89999,
    originalPrice: 119999,
    discount: 25,
    rating: 4.9,
    image: '💻',
    color: 'bg-gray-300',
  },
  {
    id: 6,
    name: 'Bose QC45 Headphones',
    price: 19999,
    originalPrice: 27999,
    discount: 29,
    rating: 4.4,
    image: '🎧',
    color: 'bg-gray-200',
  },
];

const FlashSale = () => {
  // Timer State (12 hours from now)
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 12;
          minutes = 0;
          seconds = 0;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time with leading zeros
  const formatTime = (value) => String(value).padStart(2, '0');

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">⚡ Flash Sale</h2>
            {/* Timer */}
            <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full">
              <Clock size={18} className="text-red-500" />
              <div className="flex items-center gap-1 text-sm font-bold text-red-600">
                <span className="bg-red-600 text-white px-2 py-0.5 rounded">
                  {formatTime(timeLeft.hours)}
                </span>
                <span>:</span>
                <span className="bg-red-600 text-white px-2 py-0.5 rounded">
                  {formatTime(timeLeft.minutes)}
                </span>
                <span>:</span>
                <span className="bg-red-600 text-white px-2 py-0.5 rounded">
                  {formatTime(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>
          <button className="text-blue-600 font-medium hover:text-blue-700 transition">
            See All Deals →
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {flashProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
            >
              {/* Discount Badge */}
              <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                -{product.discount}%
              </div>

              {/* Product Image */}
              <div className={`${product.color} p-6 flex justify-center items-center h-40`}>
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  {product.image}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="font-semibold text-sm text-gray-800 truncate">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{product.rating}</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-bold text-red-600">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full mt-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-1">
                  <ShoppingCart size={14} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;