// src/features/products/components/ProductGallery.jsx
import { useState } from "react";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const ProductGallery = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0]?.imageUrl || "/images/placeholder.png"
  );
  const [isZoomed, setIsZoomed] = useState(false);

  const images = product.images || [];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div 
        className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <img
          src={selectedImage}
          alt={product.name}
          className={`w-full h-[500px] object-contain p-8 transition-transform duration-500 ${
            isZoomed ? "scale-110" : "scale-100"
          }`}
        />
        <button className="absolute bottom-4 right-4 p-2.5 bg-white rounded-full shadow-md hover:shadow-lg transition">
          <ZoomIn size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id || index}
              onClick={() => setSelectedImage(image.imageUrl)}
              className={`border-2 rounded-xl p-2 transition-all duration-200 flex-shrink-0 hover:border-indigo-400 ${
                selectedImage === image.imageUrl
                  ? "border-indigo-600 shadow-lg shadow-indigo-100"
                  : "border-gray-200"
              }`}
            >
              <img
                src={image.imageUrl}
                alt={image.color || `View ${index + 1}`}
                className="w-20 h-20 object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;