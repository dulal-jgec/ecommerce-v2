import React from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";

const BuyerRegisterForm = ({
  formData,
  handleChange,
  showPassword,
  setShowPassword,
}) => {
  return (
    <>
      {/* Name */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700">
            First Name
          </label>

          <div className="relative mt-1">
            <User
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="John"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-black outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Last Name
          </label>

          <div className="relative mt-1">
            <User
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Doe"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-black outline-none"
            />
          </div>
        </div>
      </div>

      {/* Email */}

      <div>
        <label className="text-sm font-medium text-gray-700">
          Email Address
        </label>

        <div className="relative mt-1">
          <Mail
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@gmail.com"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-black outline-none"
          />
        </div>
      </div>

      {/* Phone */}

      <div>
        <label className="text-sm font-medium text-gray-700">
          Phone Number
        </label>

        <div className="relative mt-1">
          <Phone
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+91xxxxxxxxxx"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-black outline-none"
          />
        </div>
      </div>

      {/* Password */}

      <div>
        <label className="text-sm font-medium text-gray-700">
          Password
        </label>

        <div className="relative mt-1">
          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            placeholder="Minimum 6 characters"
            className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-black outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
    </>
  );
};

export default BuyerRegisterForm;