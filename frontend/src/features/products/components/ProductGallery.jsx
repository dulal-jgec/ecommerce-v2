// src/features/products/components/ProductGallery.jsx
import { useState, useEffect } from "react";
import { ZoomIn } from "lucide-react";
import { motion } from "framer-motion";

const ProductGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(
    images[0]?.imageUrl || "/images/placeholder.png"
  );
  const [isZoomed, setIsZoomed] = useState(false);

  //  Update main image when images array changes (color filter)
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0].imageUrl);
    } else {
      setSelectedImage("/images/placeholder.png");
    }
  }, [images]);

  // Handle thumbnail click
  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  if (images.length === 0) {
    return (
      <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-[500px] flex items-center justify-center">
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div
        key={selectedImage}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <img
          src={selectedImage}
          alt="Product"
          className="w-full h-[500px] object-contain p-8"
        />
        <button className="absolute bottom-4 right-4 p-2.5 bg-white rounded-full shadow-md hover:shadow-lg transition">
          <ZoomIn size={18} className="text-gray-600" />
        </button>
      </motion.div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={image.id || index}
              onClick={() => handleThumbnailClick(image.imageUrl)}
              className={`border-2 rounded-xl p-2 transition-all duration-300 flex-shrink-0 ${
                selectedImage === image.imageUrl
                  ? "border-emerald-500 shadow-lg shadow-emerald-100"
                  : "border-gray-200 hover:border-gray-300"
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