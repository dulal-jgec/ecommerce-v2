import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-800 text-center">About ShopLy</h1>
          <p className="text-slate-500 text-center mt-2 max-w-2xl mx-auto">
            Your trusted destination for quality products and seamless shopping
          </p>

          <div className="grid md:grid-cols-2 gap-12 mt-10">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800">Our Story</h2>
              <p className="text-slate-600 mt-4 leading-relaxed">
                ShopLy was founded with a simple mission: to make online shopping easy, secure, and enjoyable for everyone. 
                We believe in providing high-quality products at competitive prices while ensuring a seamless customer experience.
              </p>
              <p className="text-slate-600 mt-4 leading-relaxed">
                From electronics to fashion, we curate a wide range of products from trusted sellers across the country. 
                Every product is vetted for quality, and every transaction is protected.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-800">Why Choose Us</h2>
              <ul className="space-y-4 mt-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                  <div>
                    <p className="font-medium text-slate-800">Quality Assured</p>
                    <p className="text-sm text-slate-500">Every product is carefully selected and verified</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                  <div>
                    <p className="font-medium text-slate-800">Secure Payments</p>
                    <p className="text-sm text-slate-500">100% encrypted transactions with multiple payment options</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                  <div>
                    <p className="font-medium text-slate-800">Fast Delivery</p>
                    <p className="text-sm text-slate-500">Reliable shipping with real-time tracking</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                  <div>
                    <p className="font-medium text-slate-800">24/7 Support</p>
                    <p className="text-sm text-slate-500">Dedicated customer service team always ready to help</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-slate-200/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-indigo-600">50K+</p>
              <p className="text-sm text-slate-500">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-emerald-600">10K+</p>
              <p className="text-sm text-slate-500">Products Sold</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">500+</p>
              <p className="text-sm text-slate-500">Sellers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">4.8★</p>
              <p className="text-sm text-slate-500">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;