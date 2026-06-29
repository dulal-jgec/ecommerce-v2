const CartSummary = ({ cart }) => {

  const shipping = 0;

  const total = Number(cart.totalPrice) + shipping;

  return (

    <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">

      <h2 className="text-xl font-bold mb-6">
        Order Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">

          <span>Subtotal</span>

          <span>₹{Number(cart.totalPrice).toLocaleString()}</span>

        </div>

        <div className="flex justify-between">

          <span>Shipping</span>

          <span>FREE</span>

        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">

          <span>Total</span>

          <span>₹{total.toLocaleString()}</span>

        </div>

      </div>

      <button
        className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
      >
        Proceed to Checkout
      </button>

    </div>

  );
};

export default CartSummary;