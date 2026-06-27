// src/features/home/sections/NewArrivals.jsx
import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

const products = [
  { id: 1, name: 'Samsung Galaxy S24', price: 129999, image: '📱', color: 'bg-purple-100', rating: 4.5 },
  { id: 2, name: 'Dyson V15 Vacuum', price: 55999, image: '🧹', color: 'bg-yellow-100', rating: 4.8 },
  { id: 3, name: 'Bose QC45', price: 19999, image: '🎧', color: 'bg-gray-200', rating: 4.4 },
  { id: 4, name: 'iPad Pro M4', price: 99999, image: '📱', color: 'bg-blue-100', rating: 4.7 },
];

const NewArrivals = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">🆕 New Arrivals</h2>
          <button className="text-blue-600 font-medium hover:text-blue-700 transition">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className={`${product.color} p-6 flex justify-center items-center h-48`}>
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300">{product.image}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-sm truncate">{product.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-gray-800">₹{product.price.toLocaleString()}</span>
                </div>
                <button className="w-full mt-3 py-2 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2">
                  <ShoppingCart size={16} />
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

export default NewArrivals;