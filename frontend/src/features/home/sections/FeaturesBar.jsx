// src/features/home/sections/FeaturesBar.jsx
import React from 'react';
import { Truck, RefreshCw, CreditCard, Headphones, Shield } from 'lucide-react';

const features = [
  { icon: Truck, label: 'Free Delivery', sub: 'On orders above ₹499' },
  { icon: RefreshCw, label: 'Easy Returns', sub: '30-day hassle-free' },
  { icon: CreditCard, label: 'Secure Payments', sub: '100% encrypted' },
  { icon: Headphones, label: '24/7 Support', sub: 'Always here to help' },
  { icon: Shield, label: 'Quality Assured', sub: 'Vetted by our team' },
];

const FeaturesBar = () => {
  return (
    <section className="py-8 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 rounded-full flex-shrink-0">
                <feature.icon className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{feature.label}</p>
                <p className="text-xs text-gray-500">{feature.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBar;