// src/features/policy/pages/ReturnPolicyPage.jsx
import React from "react";

const ReturnPolicyPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-800 text-center">Return Policy</h1>
          <p className="text-slate-500 text-center mt-2">Last updated: July 2025</p>

          <div className="space-y-6 mt-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Return Period</h2>
              <p className="text-slate-600 mt-2 leading-relaxed">
                You can return items within <span className="font-semibold text-slate-700">30 days</span> of delivery for a full refund or exchange.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">Return Conditions</h2>
              <ul className="list-disc pl-6 text-slate-600 mt-2 space-y-1 leading-relaxed">
                <li>Items must be unused and in original condition</li>
                <li>Original packaging and tags must be intact</li>
                <li>Items must be returned in the original packaging</li>
                <li>Clearance and perishable items may not be returnable</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">How to Return</h2>
              <ol className="list-decimal pl-6 text-slate-600 mt-2 space-y-1 leading-relaxed">
                <li>Go to "My Orders" in your account</li>
                <li>Select the order and click "Return"</li>
                <li>Choose the items and reason for return</li>
                <li>Schedule a pickup or drop off</li>
                <li>Track your return status in your account</li>
              </ol>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">Refund Process</h2>
              <ul className="list-disc pl-6 text-slate-600 mt-2 space-y-1 leading-relaxed">
                <li>Refunds will be processed within 5-7 business days after we receive the return</li>
                <li>Refunds will be issued to the original payment method</li>
                <li>Shipping charges are non-refundable</li>
                <li>You will receive a confirmation email once the refund is processed</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">Exchanges</h2>
              <p className="text-slate-600 mt-2 leading-relaxed">
                We offer free exchanges for items that do not fit or match your expectations. 
                Please contact customer support to initiate an exchange.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
              <p className="text-sm text-slate-600">
                <span className="font-medium text-slate-800">Need help with returns?</span><br />
                Contact us at{" "}
                <a href="mailto:returns@shoply.com" className="text-indigo-600 hover:underline">returns@shoply.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;