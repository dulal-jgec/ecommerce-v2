import { Trash2 } from "lucide-react";

const CartItem = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex gap-5 items-center">

      <img
        src={item.imageUrl}
        alt={item.productName}
        className="w-28 h-28 object-contain rounded-lg bg-gray-100"
      />

      <div className="flex-1">

        <h3 className="text-lg font-semibold">
          {item.productName}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Color : {item.color}
        </p>

        <p className="text-indigo-600 font-bold mt-2">
          ₹{Number(item.price).toLocaleString()}
        </p>

        <div className="flex items-center gap-3 mt-4">

          <button className="border rounded-lg px-3 py-1">
            -
          </button>

          <span className="font-semibold">
            {item.quantity}
          </span>

          <button className="border rounded-lg px-3 py-1">
            +
          </button>

        </div>

      </div>

      <div className="text-right">

        <button className="text-red-500 hover:text-red-600">

          <Trash2 size={20} />

        </button>

        <p className="font-bold text-lg mt-8">

          ₹{(
            Number(item.price) * item.quantity
          ).toLocaleString()}

        </p>

      </div>

    </div>
  );
};

export default CartItem;