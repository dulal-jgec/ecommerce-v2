// src/features/home/sections/CategorySection.jsx
import React from 'react';
import { 
  Smartphone, 
  Laptop, 
  Watch, 
  Headphones, 
  Shirt, 
  ShoppingBag, 
  Home, 
  Gamepad2,
  Camera, 
  Tv, 
  Volume2,  // ← Speakers এর পরিবর্তে Volume2
  Cpu
} from 'lucide-react';

const categories = [
  { icon: Smartphone, name: 'Smartphones', color: 'from-blue-500 to-blue-600' },
  { icon: Laptop, name: 'Laptops', color: 'from-purple-500 to-purple-600' },
  { icon: Watch, name: 'Smart Watches', color: 'from-emerald-500 to-emerald-600' },
  { icon: Headphones, name: 'Audio', color: 'from-orange-500 to-orange-600' },
  { icon: Shirt, name: 'Fashion', color: 'from-pink-500 to-pink-600' },
  { icon: ShoppingBag, name: 'Bags', color: 'from-amber-500 to-amber-600' },
  { icon: Tv, name: 'TV & Monitors', color: 'from-red-500 to-red-600' },
  { icon: Camera, name: 'Cameras', color: 'from-cyan-500 to-cyan-600' },
  { icon: Volume2, name: 'Speakers', color: 'from-indigo-500 to-indigo-600' }, // ✅ ঠিক করা হলো
  { icon: Gamepad2, name: 'Gaming', color: 'from-rose-500 to-rose-600' },
  { icon: Cpu, name: 'Components', color: 'from-slate-500 to-slate-600' },
  { icon: Home, name: 'Smart Home', color: 'from-teal-500 to-teal-600' },
];

const CategorySection = () => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          Top Categories
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="group flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100"
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-lg`}>
                <category.icon size={22} />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center group-hover:text-blue-600 transition">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;