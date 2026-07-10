// src/features/contact/pages/ContactPage.jsx
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-800 text-center">Contact Us</h1>
          <p className="text-slate-500 text-center mt-2 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you
          </p>

          <div className="grid md:grid-cols-2 gap-12 mt-10">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800">Get in Touch</h2>
              <p className="text-slate-600 mt-2">Our team is here to help you with any questions</p>

              <div className="space-y-5 mt-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Email</p>
                    <p className="text-slate-500">support@shoply.com</p>
                    <p className="text-slate-500">info@shoply.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Phone</p>
                    <p className="text-slate-500">+91 98765 43210</p>
                    <p className="text-slate-500">+91 98765 43211</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Address</p>
                    <p className="text-slate-500">123, Tech Park, Bangalore</p>
                    <p className="text-slate-500">Karnataka, India - 560001</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                <p className="text-sm text-slate-600">
                  <span className="font-medium text-slate-800">Business Hours:</span><br />
                  Monday - Friday: 9:00 AM - 8:00 PM<br />
                  Saturday - Sunday: 10:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-slate-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition mt-1"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition mt-1"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition mt-1"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition mt-1 resize-none"
                    placeholder="Your message..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Send Message
                </button>
                {submitted && (
                  <p className="text-emerald-600 text-sm text-center">Thank you! We'll get back to you soon.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;