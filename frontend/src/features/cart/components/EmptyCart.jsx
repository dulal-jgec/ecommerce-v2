// src/features/cart/components/EmptyCart.jsx

import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

      <ShoppingCart
        size={70}
        className="mx-auto text-gray-400"
      />

      <h2 className="text-2xl font-bold mt-6">
        Your Cart is Empty
      </h2>

      <p className="text-gray-500 mt-3">
        Looks like you haven't added anything to your cart yet.
      </p>

      <Link
        to="/products"
        className="inline-block mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition"
      >
        Continue Shopping
      </Link>

    </div>
  );
};

export default EmptyCart;