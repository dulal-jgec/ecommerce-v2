// src/features/banner/components/BannerTable.jsx

import React from "react";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";

const BannerTable = ({
  banners,
  onEdit,
  onDelete,
  onToggle,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Subtitle</th>
              <th className="px-6 py-4 text-center">Order</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {banners.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500"
                >
                  No Banner Found
                </td>
              </tr>
            )}

            {banners.map((banner) => (

              <tr
                key={banner.id}
                className="border-b hover:bg-gray-50 transition"
              >

                {/* Image */}

                <td className="px-6 py-4">

                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="w-28 h-16 rounded-lg object-cover border"
                  />

                </td>

                {/* Title */}

                <td className="px-6 py-4 font-semibold">
                  {banner.title}
                </td>

                {/* Subtitle */}

                <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                  {banner.subtitle}
                </td>

                {/* Order */}

                <td className="px-6 py-4 text-center">
                  {banner.displayOrder}
                </td>

                {/* Status */}

                <td className="px-6 py-4 text-center">

                  {banner.active ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      Inactive
                    </span>
                  )}

                </td>

                {/* Actions */}

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onEdit(banner)}
                      className="p-2 rounded-lg hover:bg-blue-100"
                    >
                      <Edit
                        size={18}
                        className="text-blue-600"
                      />
                    </button>

                    <button
                      onClick={() => onToggle(banner.id)}
                      className="p-2 rounded-lg hover:bg-yellow-100"
                    >
                      {banner.active ? (
                        <EyeOff
                          size={18}
                          className="text-orange-600"
                        />
                      ) : (
                        <Eye
                          size={18}
                          className="text-green-600"
                        />
                      )}
                    </button>

                    <button
                      onClick={() => onDelete(banner.id)}
                      className="p-2 rounded-lg hover:bg-red-100"
                    >
                      <Trash2
                        size={18}
                        className="text-red-600"
                      />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
};

export default BannerTable;