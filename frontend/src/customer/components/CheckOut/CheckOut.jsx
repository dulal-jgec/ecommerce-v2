// Checkout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeftIcon, LockClosedIcon } from "@heroicons/react/24/outline";

import DeliveryAddressForm from "./DelivaryAddressForm";
import OrderSummary from "./OrderSummary";
import { createAddress } from "../../../services/addressService";
import { placeOrder } from "../../../services/orderService";
import { useCart } from "../../../context/CartContext";

import { createPayment, verifyPayment } from "../../../services/paymentService";

const STEPS = [
  { id: "address", name: "Delivery Address", path: "/checkout/address" },
  { id: "summary", name: "Order Summary", path: "/checkout/summary" },
  { id: "payment", name: "Payment", path: "/checkout/payment" },
];

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [] } = useCart();

  // Load saved address from localStorage (to prevent state loss on navigation)
  const savedAddress = localStorage.getItem("checkoutAddress")
    ? JSON.parse(localStorage.getItem("checkoutAddress"))
    : null;

  const [currentStep, setCurrentStep] = useState("address");
  const [formData, setFormData] = useState({
    address: savedAddress,
    shippingMethod: "standard",
    paymentMethod: null,
  });

  // Sync URL with current step
  useEffect(() => {
    const path = location.pathname;
    const step = STEPS.find((s) => path.includes(s.path)) || STEPS[0];
    setCurrentStep(step.id);
  }, [location]);

  const handleStepChange = (stepId, path) => {
    setCurrentStep(stepId);
    navigate(path);
  };

  const handleAddressSubmit = async (addressData, shippingMethod) => {
    try {
      const savedAddress = await createAddress(addressData);

      console.log("✅ ADDRESS SAVED =>", savedAddress);

      // Persist in localStorage (Important fix)
      localStorage.setItem("checkoutAddress", JSON.stringify(savedAddress));

      setFormData((prev) => ({
        ...prev,
        address: savedAddress,
        shippingMethod,
      }));

      navigate("/checkout/summary");
    } catch (error) {
      console.error("Address save failed", error);
      alert(
        error.response?.data?.message ||
          "Failed to save address. Please try again.",
      );
    }
  };

  const handlePaymentSubmit = async () => {
    try {
      // 1. Place Order
      const order = await placeOrder(formData.address.id);

      console.log("ORDER =", order);

      // 2. Create Payment
      const payment = await createPayment(order.orderId);

      console.log("PAYMENT =", payment);

      // 3. Razorpay Popup
      const options = {
        key: payment.key,
        currency: "INR",
        name: "Shoply",
        description: `Order #${order.orderId}`,
        order_id: payment.razorpayOrderId,

        handler: async function (response) {
          try {
            await verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            localStorage.removeItem("checkoutAddress");

            alert("Payment Successful");

            navigate("/orders");

             await clearCart();

          } catch (error) {
            console.error(error);
            alert("Payment verification failed");
          }
        },

        theme: {
          color: "#4f46e5",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Payment initialization failed");
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
      0,
    );
    const shipping = formData.shippingMethod === "express" ? 99 : 0;
    return subtotal + shipping;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "address":
        return (
          <DeliveryAddressForm
            onSubmit={handleAddressSubmit}
            initialData={formData.address}
          />
        );
      case "summary":
        return (
          <OrderSummary
            address={formData.address}
            shippingMethod={formData.shippingMethod}
            total={calculateTotal()}
            onNext={() => navigate("/checkout/payment")}
            onBack={() => navigate("/checkout/address")}
          />
        );
      case "payment":
        return (
          <PaymentForm
            onSubmit={handlePaymentSubmit}
            onBack={() => navigate("/checkout/summary")}
            total={calculateTotal()}
          />
        );
      default:
        return <div>Something went wrong</div>;
    }
  };

  return (
    <div className="bg-[linear-gradient(to_bottom,var(--light-bg),#ecfdf5)] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors mb-4"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Back to Cart
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Secure Checkout
          </h1>
          <p className="text-gray-500 mt-1">
            Complete your purchase with confidence
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center relative">
                  <button
                    onClick={() => handleStepChange(step.id, step.path)}
                    disabled={
                      index > STEPS.findIndex((s) => s.id === currentStep)
                    }
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                      ${
                        currentStep === step.id
                          ? "bg-indigo-600 text-white ring-4 ring-indigo-200 scale-110"
                          : STEPS.findIndex((s) => s.id === currentStep) > index
                            ? "bg-emerald-500 text-white cursor-pointer hover:bg-emerald-600"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    {STEPS.findIndex((s) => s.id === currentStep) > index ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </button>
                  <span
                    className={`mt-2 text-xs font-medium hidden sm:block ${currentStep === step.id ? "text-indigo-600" : "text-gray-500"}`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 rounded-full transition-all duration-500 ${STEPS.findIndex((s) => s.id === currentStep) > index ? "bg-emerald-500" : "bg-gray-200"}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8">{renderStepContent()}</div>
            </div>
          </div>

          {/* Security Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    <LockClosedIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Secure Checkout
                    </h3>
                    <p className="text-xs text-gray-500">
                      Your data is encrypted
                    </p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    ✅ 256-bit SSL encryption
                  </div>
                  <div className="flex items-center gap-2">
                    ✅ PCI compliant
                  </div>
                  <div className="flex items-center gap-2">
                    ✅ Money-back guarantee
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment Form Component
const PaymentForm = ({ onSubmit, onBack, total }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ method: paymentMethod, details: cardDetails });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
        <div className="space-y-3">
          {["card", "paypal", "applepay"].map((method) => (
            <label
              key={method}
              className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                paymentMethod === method
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-4 h-4 text-indigo-600"
              />
              <span className="font-medium capitalize">{method}</span>
            </label>
          ))}
        </div>
      </div>

      {paymentMethod === "card" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, number: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name on Card
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={cardDetails.name}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiry: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVC
              </label>
              <input
                type="text"
                placeholder="123"
                value={cardDetails.cvc}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvc: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 transition-all"
                required
              />
            </div>
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600">Total Amount</span>
          <span className="text-2xl font-bold text-gray-900">
            ₹{total.toLocaleString()}
          </span>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-lg shadow-indigo-200"
          >
            Pay ₹{total.toLocaleString()}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
