import React from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Store,
  Image,
  Eye,
  EyeOff,
} from "lucide-react";

const SellerRegisterForm = ({
  formData,
  handleChange,
  showPassword,
  setShowPassword,
  handleLogoChange,
}) => {
  return (
    <>
      {/* Personal Details */}

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
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-black outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Last Name</label>

          <div className="relative mt-1">
            <User
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
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
            required
            value={formData.email}
            onChange={handleChange}
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
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-black outline-none"
          />
        </div>
      </div>

      {/* Password */}

      <div>
        <label className="text-sm font-medium text-gray-700">Password</label>

        <div className="relative mt-1">
          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            minLength={6}
            value={formData.password}
            onChange={handleChange}
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

      <hr className="my-2" />

      {/* Seller Information */}

      <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
        <Store size={18} />
        Seller Information
      </h3>

      {/* Shop Name */}

      <div>
        <label className="text-sm font-medium text-gray-700">Shop Name</label>

        <input
          type="text"
          name="shopName"
          required
          value={formData.shopName}
          onChange={handleChange}
          placeholder="Tech World"
          className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-black outline-none"
        />
      </div>

      {/* Description */}

      <div>
        <label className="text-sm font-medium text-gray-700">
          Shop Description
        </label>

        <textarea
          rows="4"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your shop..."
          className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 resize-none focus:ring-2 focus:ring-black outline-none"
        />
      </div>

      {/* Logo */}

      <div>
        <label className="text-sm font-medium text-gray-700">
          Shop Logo URL (Optional)
        </label>

        <input
          type="text"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          placeholder="abc / logo.png / https://..."
          className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50"
        />
      </div>
    </>
  );
};

export default SellerRegisterForm;
