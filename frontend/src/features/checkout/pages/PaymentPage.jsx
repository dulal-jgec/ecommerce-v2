import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createPayment,
  verifyPayment,
  clearCart,
} from "../services/checkoutService";

const PaymentPage = () => {
  const { orderId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    startPayment();
  }, []);

  const startPayment = async () => {
    try {
      setLoading(true);

      const payment = await createPayment({
        orderId: Number(orderId),
      });

      const options = {
        key: payment.key,

        order_id: payment.razorpayOrderId,

        name: "Ecommerce Shop",

        description: "Order Payment",

        handler: async function (response) {
          try {
            await verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            await clearCart();

            navigate("/orders");
          } catch (err) {
            console.error(err);

            setError("Payment verification failed.");
          }
        },

        modal: {
          ondismiss: function () {
            navigate("/checkout");
          },
        },

        theme: {
          color: "#10b981",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error(response.error);

        setError("Payment Failed");
      });

      razorpay.open();
    } catch (err) {
      console.error(err);

      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white rounded-xl shadow-lg p-8 w-[420px] text-center">

        {loading ? (
          <>
            <h2 className="text-xl font-semibold">
              Redirecting to Razorpay...
            </h2>

            <p className="text-gray-500 mt-3">
              Please wait...
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">
              Payment
            </h2>

            {error && (
              <p className="text-red-500 mt-4">
                {error}
              </p>
            )}
          </>
        )}

      </div>

    </div>
  );
};

export default PaymentPage;