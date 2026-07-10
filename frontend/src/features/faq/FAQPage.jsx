// src/features/faq/pages/FAQPage.jsx
import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "Orders",
      q: "How do I place an order?",
      a: "Browse our products, select the items you want, add them to your cart, and proceed to checkout. Enter your shipping address, choose a payment method, and confirm your order."
    },
    {
      category: "Orders",
      q: "Can I cancel or modify my order?",
      a: "You can cancel or modify your order within 1 hour of placing it. Go to 'My Orders', select the order, and click 'Cancel' or 'Modify'."
    },
    {
      category: "Payment",
      q: "What payment methods do you accept?",
      a: "We accept Credit/Debit Cards (Visa, Mastercard, RuPay), UPI (Google Pay, PhonePe, Paytm), and Cash on Delivery."
    },
    {
      category: "Payment",
      q: "Is my payment information secure?",
      a: "Yes, we use industry-standard encryption (SSL) to protect your payment information. All transactions are secure."
    },
    {
      category: "Shipping",
      q: "How long does shipping take?",
      a: "Standard delivery takes 5-7 business days. Express delivery takes 2-3 business days. Same day delivery is available in select cities."
    },
    {
      category: "Shipping",
      q: "Do you offer free shipping?",
      a: "Yes, we offer free shipping on all orders above ₹499. A flat fee of ₹50 applies for orders below ₹499."
    },
    {
      category: "Returns",
      q: "What is your return policy?",
      a: "You can return items within 30 days of delivery. Items must be unused, in original condition, and with original packaging."
    },
    {
      category: "Returns",
      q: "How long does a refund take?",
      a: "Refunds are processed within 5-7 business days after we receive the returned item."
    },
    {
      category: "Account",
      q: "How do I reset my password?",
      a: "Click on 'Forgot Password' on the sign-in page. Enter your email address and we'll send you a password reset link."
    },
    {
      category: "Account",
      q: "How do I update my profile?",
      a: "Go to 'My Profile' in your account settings. You can update your name, email, phone number, and shipping address."
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = [...new Set(faqs.map((faq) => faq.category))];

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-800 text-center">Frequently Asked Questions</h1>
          <p className="text-slate-500 text-center mt-2">
            Find answers to the most common questions
          </p>

          <div className="mt-8">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search for questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSearchTerm("")}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-600 text-white"
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSearchTerm(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
                >
                  <span className="font-medium text-slate-800">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`px-5 transition-all duration-200 overflow-hidden ${
                    openIndex === index ? "py-4 border-t border-slate-200" : "max-h-0 py-0"
                  }`}
                >
                  <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  <p className="text-xs text-slate-400 mt-1">Category: {faq.category}</p>
                </div>
              </div>
            ))}
            {filteredFaqs.length === 0 && (
              <p className="text-center text-slate-500 py-8">No questions found matching your search.</p>
            )}
          </div>

          <div className="mt-8 p-5 bg-slate-50 rounded-xl border border-slate-200/60 text-center">
            <p className="text-slate-600">
              Still have questions?{" "}
              <a href="/contact" className="text-indigo-600 font-medium hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;