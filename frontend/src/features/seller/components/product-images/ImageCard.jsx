// src/features/seller/components/product-images/ImageCard.jsx

import { Trash2, Star } from "lucide-react";

const ImageCard = ({
  image,
  onDelete,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-white shadow-sm">

      {/* Image */}

      <img
        src={image.imageUrl}
        alt="Product"
        className="h-52 w-full object-cover"
      />

      {/* Main Badge */}

      {image.mainImage && (
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold text-white">
          <Star size={12} fill="white" />
          Main
        </div>
      )}

      {/* Hover */}

      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">

        <button
          onClick={() => onDelete(image.id)}
          className="rounded-lg bg-red-600 p-3 text-white transition hover:bg-red-700"
        >
          <Trash2 size={18} />
        </button>

      </div>

      {/* Footer */}

      <div className="space-y-1 p-3">

        <div className="flex items-center justify-between">

          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">

            {image.color}

          </span>

          <span className="text-xs text-gray-500">

            #{image.id}

          </span>

        </div>

      </div>

    </div>
  );
};

export default ImageCard;