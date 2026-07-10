// src/features/policy/pages/ShippingPolicyPage.jsx
import React from "react";

const ShippingPolicyPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-800 text-center">Shipping Policy</h1>
          <p className="text-slate-500 text-center mt-2">Last updated: July 2025</p>

          <div className="space-y-6 mt-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Shipping Methods</h2>
              <ul className="list-disc pl-6 text-slate-600 mt-2 space-y-1 leading-relaxed">
                <li><span className="font-medium text-slate-700">Standard Delivery:</span> 5-7 business days (Free on orders above ₹499)</li>
                <li><span className="font-medium text-slate-700">Express Delivery:</span> 2-3 business days (₹100 extra)</li>
                <li><span className="font-medium text-slate-700">Same Day Delivery:</span> Within 24 hours (₹200 extra, available in select cities)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">Shipping Charges</h2>
              <ul className="list-disc pl-6 text-slate-600 mt-2 space-y-1 leading-relaxed">
                <li>Free shipping on orders above ₹499</li>
                <li>₹50 flat fee for orders below ₹499</li>
                <li>Express and Same Day delivery charges apply</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">Order Tracking</h2>
              <p className="text-slate-600 mt-2 leading-relaxed">
                Once your order is shipped, you will receive a tracking number via email and SMS. 
                You can track your order status on our website in the Orders section.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">Delivery Coverage</h2>
              <p className="text-slate-600 mt-2 leading-relaxed">
                We currently deliver across India. Some remote areas may have extended delivery times. 
                Please check availability at checkout.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">Shipping Delays</h2>
              <p className="text-slate-600 mt-2 leading-relaxed">
                We strive to meet delivery estimates, but occasional delays may occur due to weather, 
                holidays, or logistical issues. We will notify you of any significant delays.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
              <p className="text-sm text-slate-600">
                <span className="font-medium text-slate-800">Questions about shipping?</span><br />
                Contact us at{" "}
                <a href="mailto:shipping@shoply.com" className="text-indigo-600 hover:underline">shipping@shoply.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;