// src/features/seller/components/product-images/ProductImages.jsx

import { useEffect, useMemo, useState } from "react";

import ColorSelector from "./ColorSelector";
import UploadArea from "./UploadArea";
import ImageGallery from "./ImageGallery";

import {
  getProductById,
  uploadProductImage,
  deleteProductImage,
} from "../../services/productService";

const ProductImages = ({ productId }) => {
  const [images, setImages] = useState([]);

  const [selectedColor, setSelectedColor] = useState("");

  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Load Product Images
  // -----------------------------

  const loadImages = async () => {
    try {
      setLoading(true);

      const product = await getProductById(productId);

      setImages(product.images || []);

      if (product.images?.length > 0) {
        setSelectedColor(product.images[0].color);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      loadImages();
    }
  }, [productId]);

  // -----------------------------
  // Colors
  // -----------------------------

  const colors = useMemo(() => {
    return [...new Set(images.map((img) => img.color))];
  }, [images]);

  // -----------------------------
  // Upload
  // -----------------------------

  const handleUpload = async (file) => {
    if (!selectedColor) {
      alert("Select a color first.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("file", file);

      formData.append("color", selectedColor);

      await uploadProductImage(productId, formData);

      await loadImages();
    } catch (err) {
      console.error(err);

      alert("Upload failed");
    }
  };

  // -----------------------------
  // Delete
  // -----------------------------

  const handleDelete = async (imageId) => {
    try {
      await deleteProductImage(imageId);

      await loadImages();
    } catch (err) {
      console.error(err);

      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <ColorSelector
        colors={colors}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      <UploadArea selectedColor={selectedColor} onUpload={handleUpload} />

      <ImageGallery
        loading={loading}
        images={images}
        selectedColor={selectedColor}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ProductImages;
