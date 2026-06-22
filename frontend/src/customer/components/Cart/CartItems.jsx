import React from "react";
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  if (!item) return null;

  // Robust image handling
  const imageUrl =
    item?.selectedImage ||
    item?.imageUrl ||
    "https://placehold.co/400x400?text=No+Image";

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.cartItemId, item.quantity - 1);
    } else {
      onRemove(item.cartItemId);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.cartItemId, item.quantity + 1);
  };

  const itemTotal = (item.price || 0) * item.quantity;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Image */}
        <div className="w-full sm:w-32 h-48 sm:h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={imageUrl}
            alt={item.name || "Product"}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "https://placehold.co/400x400?text=No+Image";
            }}
          />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {item.productName}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Color:{" "}
              <span className="capitalize">
                {item.selectedColor || item.color || "N/A"}
              </span>
            </p>
            {item.stock && (
              <p className="text-xs text-emerald-600 mt-1">
                Stock: {item.stock}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            {/* Quantity */}
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
              <button
                onClick={handleDecrease}
                className="px-4 py-3 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="px-6 font-semibold text-gray-800 min-w-[40px] text-center">
                {item.quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="px-4 py-3 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                ₹{itemTotal.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                ₹{item.price?.toLocaleString() || 0} each
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => onRemove(item.cartItemId)}
              className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
