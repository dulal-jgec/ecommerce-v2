// src/features/checkout/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useCheckout } from '../hooks/useCheckout';
import CheckoutLayout from '../components/CheckoutLayout';
import ShippingAddress from '../components/ShippingAddress';
import DeliveryOptions from '../components/DeliveryOptions';
import PaymentMethod from '../components/PaymentMethod';
import OrderSummary from '../components/OrderSummary';
import CouponSection from '../components/CouponSection';
import PlaceOrderButton from '../components/PlaceOrderButton';

const CheckoutPage = () => {
  const {
    loading,
    error,
    cart,
    addresses,
    selectedAddress,
    setSelectedAddress,
    shippingMethod,
    setShippingMethod,
    paymentMethod,
    setPaymentMethod,
    coupon,
    discount,
    total,
    handleAddAddress,
    handleSetDefaultAddress,
    handleApplyCoupon,
    handlePlaceOrder,
  } = useCheckout();

  const [step, setStep] = useState(1);

  const handleNext = async () => {
    if (step === 1 && selectedAddress) setStep(2);
    else if (step === 2) {
      const order = await handlePlaceOrder();
      if (order) setStep(3);
    }
  };

  return (
    <CheckoutLayout step={step}>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Address */}
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <ShippingAddress
                addresses={addresses}
                selected={selectedAddress}
                onSelect={setSelectedAddress}
                onAdd={handleAddAddress}
                onSetDefault={handleSetDefaultAddress}
              />
              <button
                onClick={handleNext}
                disabled={!selectedAddress}
                className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition disabled:opacity-50"
              >
                Continue to Delivery
              </button>
            </div>
          )}

          {/* Step 2: Delivery & Payment */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <DeliveryOptions selected={shippingMethod} onSelect={setShippingMethod} />
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <PaymentMethod selected={paymentMethod} onSelect={setPaymentMethod} />
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <CouponSection 
                  onApply={handleApplyCoupon}
                  onRemove={() => {}}
                  discount={discount}
                  coupon={coupon}
                />
              </div>
              <button
                onClick={handleNext}
                disabled={loading}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Processing...' : 'Review Order'}
              </button>
            </div>
          )}

          {/* Step 3: Review & Place Order */}
          {step === 3 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
              <div className="flex items-center gap-2 text-emerald-600">
                <span className="text-lg">✓</span>
                <span className="font-medium">Review your order</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Delivery</span>
                  <span className="text-gray-800 capitalize">{shippingMethod}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Payment</span>
                  <span className="text-gray-800 capitalize">{paymentMethod}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Shipping Address</span>
                  <span className="text-gray-800 text-right">
                    {selectedAddress?.fullName}<br />
                    {selectedAddress?.street}<br />
                    {selectedAddress?.city}, {selectedAddress?.state}
                  </span>
                </div>
              </div>
              <PlaceOrderButton
                onClick={handlePlaceOrder}
                loading={loading}
                total={total}
              />
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            </div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary 
            cart={cart} 
            shippingCost={shippingMethod === 'express' ? 100 : 0}
            discount={discount}
          />
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutPage;