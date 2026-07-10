// src/features/policy/pages/TermsPage.jsx
import React from "react";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-800 text-center">Terms of Service</h1>
          <p className="text-slate-500 text-center mt-2">Last updated: July 2025</p>

          <div className="space-y-6 mt-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Acceptance of Terms</h2>
              <p className="text-slate-600 mt-2 leading-relaxed">
                By using ShopLy, you agree to these Terms of Service. If you do not agree, please do not use our platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">Account Registration</h2>
              <ul className="list-disc pl-6 text-slate-600 mt-2 space-y-1 leading-relaxed">
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining account security</li>
                <li>You must be at least 18 years old to create an account</li>
                <li>We reserve the right to suspend or terminate accounts</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">Products and Pricing</h2>
              <p className="text-slate-600 mt-2 leading-relaxed">
                We strive to ensure that all product descriptions, prices, and availability information are accurate. 
                However, errors may occur, and we reserve the right to correct them.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">Orders and Payments</h2>
              <ul className="list-disc pl-6 text-slate-600 mt-2 space-y-1 leading-relaxed">
                <li>All orders are subject to acceptance and availability</li>
                <li>Payment must be completed before order processing</li>
                <li>We accept multiple payment methods</li>
                <li>Order confirmation does not guarantee fulfillment</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">Returns and Refunds</h2>
              <p className="text-slate-600 mt-2 leading-relaxed">
                Please refer to our Return Policy for detailed information about returns, refunds, and exchange processes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">User Responsibilities</h2>
              <ul className="list-disc pl-6 text-slate-600 mt-2 space-y-1 leading-relaxed">
                <li>Use the platform for lawful purposes only</li>
                <li>Do not misuse or abuse our services</li>
                <li>Respect intellectual property rights</li>
                <li>Provide accurate information for all transactions</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
              <p className="text-sm text-slate-600">
                <span className="font-medium text-slate-800">Contact:</span><br />
                For questions about these Terms, please contact us at{" "}
                <a href="mailto:legal@shoply.com" className="text-indigo-600 hover:underline">legal@shoply.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;