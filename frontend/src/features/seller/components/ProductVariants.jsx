// src/features/seller/components/ProductVariants.jsx
import React, { useState } from "react";
import { Plus, Trash2, X, ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { addVariant, getVariants } from "../services/productService";

const ProductVariants = ({ productId, variants, setVariants }) => {
  const [showAddVariant, setShowAddVariant] = useState(false);
  const [newVariant, setNewVariant] = useState({
    color: "",
    size: "",
    price: "",
    stock: "",
  });
  const handleAddVariant = async () => {
    if (
      !newVariant.color ||
      !newVariant.size ||
      !newVariant.price ||
      !newVariant.stock
    ) {
      return;
    }
    try {
      const savedVariant = await addVariant(productId, {
        color: newVariant.color,
        size: newVariant.size,
        price: Number(newVariant.price),
        stock: Number(newVariant.stock),
      });

      setVariants([...variants, savedVariant]);

      setNewVariant({
        color: "",
        size: "",
        price: "",
        stock: "",
      });

      setShowAddVariant(false);
    } catch (error) {
      console.error(error);
      alert("Failed to add variant");
    }
  };

  const removeVariant = (id) => {
    setVariants(variants.filter((v) => v.id !== id));
  };
  useEffect(() => {
    loadVariants();
  }, [productId]);

  const loadVariants = async () => {
    if (!productId) return;

    try {
      const data = await getVariants(productId);
      setVariants(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Variant List */}
      {variants.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variant
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {variants.map((variant) => (
                <tr key={variant.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-4 py-3 font-medium text-sm text-gray-800">
                    {variant.color} / {variant.size}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    ₹{variant.price}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {variant.stock}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => removeVariant(variant.id)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-xl">
          <p className="text-gray-400">No variants added yet</p>
        </div>
      )}

      {/* Add Variant Button */}
      {!showAddVariant ? (
        <button
          onClick={() => setShowAddVariant(true)}
          className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition"
        >
          <Plus size={16} />
          Add Variant
        </button>
      ) : (
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Color"
              value={newVariant.color}
              onChange={(e) =>
                setNewVariant({
                  ...newVariant,
                  color: e.target.value,
                })
              }
              className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-sm"
            />
            <input
              type="text"
              placeholder="Size"
              value={newVariant.size}
              onChange={(e) =>
                setNewVariant({
                  ...newVariant,
                  size: e.target.value,
                })
              }
              className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-sm"
            />
            <input
              type="number"
              placeholder="Price"
              value={newVariant.price}
              onChange={(e) =>
                setNewVariant({ ...newVariant, price: e.target.value })
              }
              className="w-full sm:w-32 px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-sm"
            />
            <input
              type="number"
              placeholder="Stock"
              value={newVariant.stock}
              onChange={(e) =>
                setNewVariant({ ...newVariant, stock: e.target.value })
              }
              className="w-full sm:w-32 px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddVariant}
                className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddVariant(false)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
        <p className="font-medium">💡 Variants</p>
        <p className="text-blue-600 mt-1">
          Add size, color, weight, or other options for your product.
        </p>
      </div>
    </div>
  );
};

export default ProductVariants;
