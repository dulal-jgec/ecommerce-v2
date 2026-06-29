// src/features/seller/components/ProductImages.jsx
import React, { useState, useRef } from 'react';
import { Upload, X, Star, Image } from 'lucide-react';

const ProductImages = ({ images, setImages }) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newImages = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(file),
        file: file,
        isMain: images.length === 0 && index === 0
      }));
      setImages([...images, ...newImages]);
    }
  };

  const handleRemove = (id) => {
    const newImages = images.filter(img => img.id !== id);
    // If removing main image, set first remaining as main
    if (newImages.length > 0 && !newImages.some(img => img.isMain)) {
      newImages[0].isMain = true;
    }
    setImages(newImages);
  };

  const setMainImage = (id) => {
    setImages(images.map(img => ({
      ...img,
      isMain: img.id === id
    })));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const newImages = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(file),
        file: file,
        isMain: images.length === 0 && index === 0
      }));
      setImages([...images, ...newImages]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition ${
          dragOver ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          multiple
          className="hidden"
        />
        <div className="flex flex-col items-center gap-3">
          <div className="p-4 bg-gray-100 rounded-full">
            <Upload size={32} className="text-gray-400" />
          </div>
          <div>
            <p className="text-gray-600 font-medium">Drop your images here</p>
            <p className="text-sm text-gray-400">or</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-emerald-600 font-medium hover:text-emerald-700 transition"
            >
              Browse Files
            </button>
          </div>
          <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB each</p>
        </div>
      </div>

      {/* Image List */}
      {images.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">
            {images.length} Image{images.length > 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className={`relative group border-2 rounded-xl overflow-hidden ${
                  image.isMain ? 'border-emerald-500 shadow-lg shadow-emerald-100' : 'border-gray-200'
                }`}
              >
                <img
                  src={image.url}
                  alt="Product"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                  <button
                    onClick={() => setMainImage(image.id)}
                    className="p-1.5 bg-white/90 rounded-lg hover:bg-white transition"
                    title="Set as main image"
                  >
                    <Star size={16} className={image.isMain ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} />
                  </button>
                  <button
                    onClick={() => handleRemove(image.id)}
                    className="p-1.5 bg-white/90 rounded-lg hover:bg-red-500 hover:text-white transition"
                    title="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
                {image.isMain && (
                  <span className="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                    Main
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImages;