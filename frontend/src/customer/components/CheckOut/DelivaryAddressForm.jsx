// DeliveryAddressForm.jsx
import React, { useState, useEffect } from "react";
import {
  MapPinIcon,
  TruckIcon,
  ClockIcon,
  PlusIcon,
  HomeIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import {
  getMyAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../../services/addressService";

const DeliveryAddressForm = ({ onSubmit, onBack }) => {
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [loading, setLoading] = useState(true);
  const [editingAddress, setEditingAddress] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    addressType: "home",
    isDefault: false,
  });

  // Fetch user's saved addresses on component mount
  useEffect(() => {
    fetchUserAddresses();
  }, []);

  const fetchUserAddresses = async () => {
    setLoading(true);
    try {
      const data = await getMyAddresses();
      setSavedAddresses(data);

      // Auto-select default address if exists
      const defaultAddr = data.find((addr) => addr.isDefault);
      if (defaultAddr) {
        setSelectedAddress(defaultAddr);
      } else if (data.length > 0) {
        setSelectedAddress(data[0]);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setNewAddress({
      fullName: "",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      addressType: "home",
      isDefault: savedAddresses.length === 0,
    });
    setShowAddressForm(true);
    setErrors({});
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setNewAddress({
      fullName: address.fullName,
      phoneNumber: address.phoneNumber,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country || "India",
      addressType: address.addressType || "home",
      isDefault: address.isDefault || false,
    });
    setShowAddressForm(true);
    setErrors({});
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await deleteAddress(addressId);
        await fetchUserAddresses();
        if (selectedAddress?.id === addressId) {
          setSelectedAddress(null);
        }
      } catch (error) {
        console.error("Error deleting address:", error);
        alert("Failed to delete address. Please try again.");
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newAddress.fullName.trim())
      newErrors.fullName = "Full name is required";
    if (!newAddress.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!newAddress.phoneNumber.match(/^\d{10}$/)) {
      newErrors.phoneNumber = "Enter valid 10-digit phone number";
    }
    if (!newAddress.addressLine1.trim())
      newErrors.addressLine1 = "Address Line 1 is required";
    if (!newAddress.city.trim()) newErrors.city = "City is required";
    if (!newAddress.state.trim()) newErrors.state = "State is required";
    if (!newAddress.postalCode.trim()) {
      newErrors.postalCode = "Postal Code is required";
    } else if (!newAddress.postalCode.match(/^\d{6}$/)) {
      newErrors.postalCode = "Enter valid 6-digit postal code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAddress = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      let savedAddress;

      if (editingAddress) {
        // Update existing address
        await updateAddress(editingAddress.id, newAddress);
        savedAddress = { ...editingAddress, ...newAddress };
      } else {
        // Create new address
        savedAddress = await createAddress(newAddress);
      }

      await fetchUserAddresses();
      setShowAddressForm(false);
      setEditingAddress(null);

      // Auto-select the newly saved/edited address
      const updatedAddresses = await getMyAddresses();
      if (editingAddress) {
        const edited = updatedAddresses.find(
          (addr) => addr.id === editingAddress.id,
        );
        if (edited) setSelectedAddress(edited);
      } else {
        const newAddr = updatedAddresses.find(
          (addr) => addr.id === savedAddress.id,
        );
        if (newAddr) setSelectedAddress(newAddr);
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      await setDefaultAddress(addressId);
      await fetchUserAddresses();
      const updatedDefault = savedAddresses.find(
        (addr) => addr.id === addressId,
      );
      if (updatedDefault) setSelectedAddress(updatedDefault);
    } catch (error) {
      console.error("Error setting default address:", error);
      alert("Failed to set default address. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedAddress && !showAddressForm) {
      alert("Please select a delivery address or add a new one");
      return;
    }

    if (selectedAddress && !showAddressForm) {
      onSubmit(selectedAddress, shippingMethod);
    }
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case "home":
        return HomeIcon;
      case "work":
        return BuildingOfficeIcon;
      default:
        return MapPinIcon;
    }
  };

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      price: 0,
      days: "5-7 business days",
      icon: TruckIcon,
      description: "Free shipping",
    },
    {
      id: "express",
      name: "Express Delivery",
      price: 99,
      days: "2-3 business days",
      icon: ClockIcon,
      description: "Faster delivery",
    },
    {
      id: "overnight",
      name: "Overnight Delivery",
      price: 199,
      days: "Next day delivery",
      icon: ClockIcon,
      description: "Guaranteed next day",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Saved Addresses Section */}
      {!showAddressForm && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-indigo-500" />
              Select Delivery Address
            </h2>
            <button
              type="button"
              onClick={handleAddNewAddress}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
            >
              <PlusIcon className="h-4 w-4" />
              Add New Address
            </button>
          </div>

          {savedAddresses.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <MapPinIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">No saved addresses found</p>
              <button
                type="button"
                onClick={handleAddNewAddress}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Add your first address
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {savedAddresses.map((addr) => {
                const Icon = getAddressIcon(addr.addressType);
                const isSelected = selectedAddress?.id === addr.id;

                return (
                  <div
                    key={addr.id}
                    className={`relative p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        onClick={() => handleAddressSelect(addr)}
                        className="flex-1 flex items-start gap-4"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected
                                ? "border-indigo-500 bg-indigo-500"
                                : "border-gray-300"
                            }`}
                          >
                            {isSelected && (
                              <CheckCircleIcon className="h-3 w-3 text-white" />
                            )}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Icon className="h-4 w-4 text-gray-500" />
                            <span className="font-semibold text-gray-900 capitalize">
                              {addr.addressType}
                            </span>
                            {addr.isDefault && (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>

                          <p className="font-medium text-gray-900">
                            {addr.fullName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {addr.phoneNumber}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {addr.addressLine1}
                            {addr.addressLine2 && `, ${addr.addressLine2}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            {addr.city}, {addr.state} - {addr.postalCode}
                          </p>
                          <p className="text-sm text-gray-600">
                            {addr.country}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        {!addr.isDefault && (
                          <button
                            type="button"
                            onClick={() => handleSetDefault(addr.id)}
                            className="p-2 text-xs text-gray-500 hover:text-indigo-600 transition-colors"
                            title="Set as default"
                          >
                            Set Default
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleEditAddress(addr)}
                          className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Address Form */}
      {showAddressForm && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-indigo-500" />
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h2>
            <button
              type="button"
              onClick={() => {
                setShowAddressForm(false);
                setEditingAddress(null);
              }}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-6">
            {/* Address Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Type
              </label>
              <div className="flex gap-3">
                {["home", "work", "other"].map((type) => {
                  const Icon = getAddressIcon(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setNewAddress((prev) => ({
                          ...prev,
                          addressType: type,
                        }))
                      }
                      className={`flex-1 py-2 px-4 rounded-xl border-2 flex items-center justify-center gap-2 capitalize transition-all ${
                        newAddress.addressType === type
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newAddress.fullName}
                  onChange={(e) =>
                    setNewAddress((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all ${
                    errors.fullName ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={newAddress.phoneNumber}
                  onChange={(e) =>
                    setNewAddress((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="9876543210"
                />
                {errors.phoneNumber && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Address Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newAddress.addressLine1}
                  onChange={(e) =>
                    setNewAddress((prev) => ({
                      ...prev,
                      addressLine1: e.target.value,
                    }))
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all ${
                    errors.addressLine1 ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="House no, Street, Area"
                />
                {errors.addressLine1 && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.addressLine1}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  value={newAddress.addressLine2}
                  onChange={(e) =>
                    setNewAddress((prev) => ({
                      ...prev,
                      addressLine2: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all"
                  placeholder="Apartment, Landmark, etc."
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }))
                    }
                    className={`w-full px-4 py-3 border rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all ${
                      errors.city ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Mumbai"
                  />
                  {errors.city && (
                    <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newAddress.state}
                    onChange={(e) =>
                      setNewAddress((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                    className={`w-full px-4 py-3 border rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all ${
                      errors.state ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Maharashtra"
                  />
                  {errors.state && (
                    <p className="text-xs text-red-500 mt-1">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newAddress.postalCode}
                    onChange={(e) =>
                      setNewAddress((prev) => ({
                        ...prev,
                        postalCode: e.target.value,
                      }))
                    }
                    className={`w-full px-4 py-3 border rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all ${
                      errors.postalCode ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="400001"
                  />
                  {errors.postalCode && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.postalCode}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={newAddress.country}
                    disabled
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="defaultAddress"
                  checked={newAddress.isDefault}
                  onChange={(e) =>
                    setNewAddress((prev) => ({
                      ...prev,
                      isDefault: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                />
                <label
                  htmlFor="defaultAddress"
                  className="text-sm text-gray-700"
                >
                  Set as default address
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveAddress}
              disabled={saving}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving
                ? "Saving..."
                : editingAddress
                  ? "Update Address"
                  : "Save Address"}
            </button>
          </div>
        </div>
      )}

      {/* Shipping Method - Only show if address is selected */}
      {selectedAddress && !showAddressForm && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TruckIcon className="h-5 w-5 text-indigo-500" />
            Select Shipping Method
          </h3>
          <div className="space-y-3">
            {shippingOptions.map((option) => {
              const Icon = option.icon;
              return (
                <label
                  key={option.id}
                  className={`flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                    shippingMethod === option.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={option.id}
                      checked={shippingMethod === option.id}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-gray-500" />
                        <span className="font-medium text-gray-900">
                          {option.name}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {option.days}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-900">
                      {option.price === 0 ? "Free" : `₹${option.price}`}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-2xl hover:bg-gray-50 transition-colors"
        >
          Back to Cart
        </button>
        {selectedAddress && !showAddressForm && (
          <button
            type="submit"
            className="flex-1 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg shadow-indigo-200"
          >
            Continue to Summary
          </button>
        )}
      </div>
    </form>
  );
};

export default DeliveryAddressForm;
