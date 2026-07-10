// src/features/policy/pages/PrivacyPolicyPage.jsx
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-800 text-center">Privacy Policy</h1>
          <p className="text-slate-500 text-center mt-2">Last updated: July 2025</p>

          <div className="space-y-6 mt-8">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Information We Collect</h2>
              <p className="text-slate-600 mt-2 leading-relaxed">
                We collect information you provide directly to us, such as your name, email address, phone number, 
                shipping address, and payment details when you create an account, place an order, or contact us.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-slate-600 mt-2 space-y-1 leading-relaxed">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and updates</li>
                <li>Improve our products and services</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">Information Sharing</h2>
              <p className="text-slate-600 mt-2 leading-relaxed">
                We do not sell or rent your personal information to third parties. We may share your information with 
                trusted partners who help us operate our website, process payments, and deliver orders, subject to 
                confidentiality agreements.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">Data Security</h2>
              <p className="text-slate-600 mt-2 leading-relaxed">
                We implement industry-standard security measures to protect your personal information, including 
                encryption, secure servers, and regular security audits.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">Your Rights</h2>
              <ul className="list-disc pl-6 text-slate-600 mt-2 space-y-1 leading-relaxed">
                <li>Access and update your personal information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
              <p className="text-sm text-slate-600">
                <span className="font-medium text-slate-800">Contact Us:</span><br />
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@shoply.com" className="text-indigo-600 hover:underline">privacy@shoply.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;