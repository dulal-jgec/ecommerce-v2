// src/features/seller/components/ProductTable.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  Edit,
  Trash2,
  Star,
  MoreVertical,
  Image as ImageIcon,
} from "lucide-react";

const ProductTable = ({ products, onDelete }) => {
  const getStatusBadge = (stock) => {
    if (stock === 0) {
      return {
        label: "Out of Stock",
        color: "bg-red-100 text-red-700",
        icon: "🔴",
      };
    } else if (stock <= 5) {
      return {
        label: "Low Stock",
        color: "bg-yellow-100 text-yellow-700",
        icon: "🟡",
      };
    } else {
      return {
        label: "In Stock",
        color: "bg-emerald-100 text-emerald-700",
        icon: "🟢",
      };
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => {
              const status = getStatusBadge(product.stock);
              const discount =
                product.originalPrice && product.originalPrice > product.price
                  ? Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100,
                    )
                  : 0;

              return (
                <tr key={product.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                        {product.images?.[0]?.imageUrl ? (
                          <img
                            src={product.images[0].imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={20} className="text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-800 line-clamp-1">
                          {product.name}
                        </p>
                        {discount > 0 && (
                          <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                            {discount}% OFF
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.category || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">
                        ₹{product.price?.toLocaleString()}
                      </p>
                      {product.originalPrice &&
                        product.originalPrice > product.price && (
                          <p className="text-xs text-gray-400 line-through">
                            ₹{product.originalPrice?.toLocaleString()}
                          </p>
                        )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="text-sm font-medium">
                        {product.averageRating || 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}
                    >
                      <span>{status.icon}</span>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/product/${product.id}`}>
                        <button
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-emerald-600"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                      </Link>
                      <Link to={`/seller/products/edit/${product.id}`}>
                        <button
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-blue-600"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => onDelete && onDelete(product)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
