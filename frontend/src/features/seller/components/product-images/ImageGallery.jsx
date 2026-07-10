// src/features/seller/components/product-images/ImageGallery.jsx

import ImageCard from "./ImageCard";

const ImageGallery = ({
  loading,
  images,
  selectedColor,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading images...
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="border rounded-xl p-10 text-center text-gray-500">
        No images uploaded yet.
      </div>
    );
  }

  // show only selected color images
  const filteredImages = selectedColor
    ? images.filter((img) => img.color === selectedColor)
    : images;

  return (
    <div className="space-y-5">

      <div className="flex justify-between items-center">

        <h3 className="text-lg font-semibold">

          {selectedColor
            ? `${selectedColor} Images`
            : "Product Images"}

        </h3>

        <span className="text-sm text-gray-500">

          {filteredImages.length} Image
          {filteredImages.length !== 1 && "s"}

        </span>

      </div>

      {filteredImages.length === 0 ? (
        <div className="border rounded-xl p-8 text-center text-gray-500">

          No images available for this color.

        </div>
      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {filteredImages.map((image) => (

            <ImageCard
              key={image.id}
              image={image}
              onDelete={onDelete}
            />

          ))}

        </div>

      )}

    </div>
  );
};

export default ImageGallery;