// src/features/home/sections/BestSellers.jsx
import React from 'react';

const products = [
  { id: 1, name: 'iPhone 15 Pro', price: 129999, image: '📱', color: 'bg-blue-100' },
  { id: 2, name: 'Sony Headphones', price: 29999, image: '🎧', color: 'bg-gray-200' },
  { id: 3, name: 'Apple Watch', price: 89999, image: '⌚', color: 'bg-blue-200' },
  { id: 4, name: 'MacBook Air', price: 99999, image: '💻', color: 'bg-gray-300' },
  { id: 5, name: 'Nike Shoes', price: 14999, image: '👟', color: 'bg-red-100' },
  { id: 6, name: 'Samsung S24', price: 129999, image: '📱', color: 'bg-purple-100' },
];

const BestSellers = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">⚡ Best Sellers</h2>
          <button className="text-blue-600 font-medium hover:text-blue-700 transition">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 text-center cursor-pointer group"
            >
              <div className={`${product.color} rounded-xl p-6 flex justify-center`}>
                <span className="text-5xl">{product.image}</span>
              </div>
              <h3 className="font-semibold text-sm mt-3 truncate">{product.name}</h3>
              <p className="text-blue-600 font-bold mt-1">₹{product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;