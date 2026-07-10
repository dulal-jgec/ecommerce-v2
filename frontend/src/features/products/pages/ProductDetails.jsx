// src/features/products/pages/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronRight,
  Heart,
  Share2,
  Truck,
  RefreshCw,
  Shield,
  Star,
  Minus,
  Plus,
  Check,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

import ProductGallery from "../components/ProductGallery";
import ProductReviews from "../components/ProductReviews";
import RelatedProducts from "../components/RelatedProducts";
import AddToCartButton from "../components/AddToCartButton";
import { getProductById } from "../services/productService";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
      if (data?.images?.length > 0) {
        setSelectedColor(data.images[0].color || "Default");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
    window.scrollTo(0, 0);
  }, [id]);

  // Get unique colors
  const availableColors = [
    ...new Set(product?.images?.map((img) => img.color).filter(Boolean) || []),
  ];

  //  Get images filtered by selected color
  const getImagesByColor = (color) => {
    return product?.images?.filter((img) => img.color === color) || [];
  };

  //  Handle color click
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading Product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌿</div>
          <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
          <Link to="/shop" className="text-emerald-600 hover:text-emerald-700 mt-4 inline-block">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  //  Get images for selected color
  const filteredImages = getImagesByColor(selectedColor);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-emerald-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-emerald-600 transition">
              Home
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link to="/shop" className="text-gray-500 hover:text-emerald-600 transition">
              Shop
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-800 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductGallery images={filteredImages} />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-1.5 rounded-full border border-emerald-200">
                {product.category || "General"}
              </span>
              {product.isNew && (
                <span className="bg-yellow-50 text-yellow-700 text-sm font-medium px-4 py-1.5 rounded-full border border-yellow-200 flex items-center gap-1">
                  <Sparkles size={14} />
                  New
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-gray-500 text-sm">
              Sold by{" "}
              <span className="text-emerald-600 font-medium">
                {product.seller || "ShopLy"}
              </span>
            </p>

            <div className="flex items-center flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-lg text-gray-800">
                    {product.averageRating || 0}
                  </span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500 text-sm">
                  {product.totalReviews || 0} Reviews
                </span>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-2">
                <Check size={18} className="text-emerald-500" />
                <span className="text-emerald-600 font-medium text-sm">
                  In Stock
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-emerald-100/50 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-emerald-600">
                  ₹{product.price?.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.originalPrice?.toLocaleString()}
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-rose-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm shadow-rose-200">
                    {discount}% OFF
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Inclusive of all taxes
              </p>
            </div>

            {/* Colors */}
            {availableColors.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Color: <span className="text-gray-900 font-semibold">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => {
                    const colorImages = getImagesByColor(color);
                    return (
                      <button
                        key={color}
                        onClick={() => handleColorClick(color)}
                        className={`relative w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                          selectedColor === color
                            ? "border-emerald-500 scale-110 shadow-lg shadow-emerald-200"
                            : "border-gray-200 hover:border-emerald-300"
                        }`}
                        style={{
                          backgroundColor:
                            color?.toLowerCase() === "default"
                              ? "#d1d5db"
                              : color.toLowerCase(),
                        }}
                      >
                        {colorImages.length > 1 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                            {colorImages.length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {filteredImages.length} image{filteredImages.length > 1 ? "s" : ""} available for {selectedColor}
                </p>
              </div>
            )}

            <p className="text-gray-600 leading-relaxed">
              {product.description || "No description available."}
            </p>

            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2.5 hover:bg-gray-50 transition text-gray-600"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2.5 hover:bg-gray-50 transition text-gray-600"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="text-sm text-gray-500">
                Total: <span className="font-bold text-emerald-600">₹{(product.price * quantity).toLocaleString()}</span>
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <AddToCartButton
                productId={product.id}
                product={product}
                quantity={quantity}
                color={selectedColor || "Default"}
                variant="primary"
                className="flex-1"
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-5 py-3.5 border rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  isWishlisted
                    ? "bg-rose-50 border-rose-200 text-rose-500"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-emerald-600"
                }`}
              >
                <Heart
                  size={18}
                  className={isWishlisted ? "fill-rose-500" : ""}
                />
                Wishlist
              </button>
              <button className="px-5 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-gray-600">
                <Share2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-white rounded-xl p-3 text-center border border-emerald-100/50 shadow-sm">
                <Truck size={20} className="mx-auto text-emerald-500 mb-1" />
                <p className="text-xs font-medium text-gray-700">Free Delivery</p>
                <p className="text-[10px] text-gray-400">Above ₹499</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center border border-emerald-100/50 shadow-sm">
                <RefreshCw size={20} className="mx-auto text-emerald-500 mb-1" />
                <p className="text-xs font-medium text-gray-700">Easy Returns</p>
                <p className="text-[10px] text-gray-400">30-day hassle-free</p>
              </div>
              <div className="bg-white rounded-xl p-3 text-center border border-emerald-100/50 shadow-sm">
                <Shield size={20} className="mx-auto text-emerald-500 mb-1" />
                <p className="text-xs font-medium text-gray-700">Secure Payment</p>
                <p className="text-[10px] text-gray-400">100% encrypted</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-100/50 shadow-sm overflow-hidden">
          <div className="border-b border-emerald-100/50">
            <div className="flex overflow-x-auto">
              {["description", "specifications", "reviews", "faq"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium capitalize transition-all duration-200 border-b-2 ${
                    activeTab === tab
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "description" && (
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {product.description || "No description available."}
                </p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="space-y-3">
                <div className="flex py-2 border-b border-gray-100">
                  <span className="w-40 text-sm font-medium text-gray-500">
                    Brand
                  </span>
                  <span className="text-sm text-gray-800">
                    {product.brand || "ShopLy"}
                  </span>
                </div>
                <div className="flex py-2 border-b border-gray-100">
                  <span className="w-40 text-sm font-medium text-gray-500">
                    Category
                  </span>
                  <span className="text-sm text-gray-800">
                    {product.category || "General"}
                  </span>
                </div>
                <div className="flex py-2 border-b border-gray-100">
                  <span className="w-40 text-sm font-medium text-gray-500">
                    SKU
                  </span>
                  <span className="text-sm text-gray-800">
                    {product.sku || "N/A"}
                  </span>
                </div>
                <div className="flex py-2">
                  <span className="w-40 text-sm font-medium text-gray-500">
                    Stock
                  </span>
                  <span className="text-sm text-emerald-600 font-medium">
                    In Stock ({product.stock || 0} units)
                  </span>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <ProductReviews productId={product.id} />
            )}

            {activeTab === "faq" && (
              <div className="space-y-4">
                <div className="border border-gray-100 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800">
                    Is this product authentic?
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Yes, all products are verified and sourced from trusted sellers.
                  </p>
                </div>
                <div className="border border-gray-100 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800">
                    What is the warranty?
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    6 months manufacturer warranty on all products.
                  </p>
                </div>
                <div className="border border-gray-100 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800">
                    Can I return it if I'm not satisfied?
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Yes, 30-day hassle-free returns available.
                  </p>
                </div>
                <div className="border border-gray-100 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800">
                    How long does delivery take?
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Usually 3-5 business days depending on location.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <RelatedProducts
            category={product.category}
            currentProductId={product.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;