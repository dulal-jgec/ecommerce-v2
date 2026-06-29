// src/features/products/pages/ProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ChevronRight, Heart, Share2, Truck, RefreshCw, Shield, 
  Star, Minus, Plus, ShoppingCart, Check, MessageCircle 
} from "lucide-react";

import ProductGallery from "../components/ProductGallery";
import ProductReviews from "../components/ProductReviews";
import RelatedProducts from "../components/RelatedProducts";
import AddToCartButton from "../components/AddToCartButton"; // ✅ Import যোগ করুন
import { getProductById } from "../services/productService";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null); // ✅ যোগ করুন

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
      // ✅ Default color set করুন
      if (data?.images?.length > 0) {
        setSelectedColor(data.images[0].color || 'Default');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading Product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
          <Link to="/shop" className="text-indigo-600 hover:underline mt-4 inline-block">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // ✅ Available colors extract করুন
  const availableColors = product.images?.map(img => img.color).filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-indigo-600 transition">Home</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link to="/shop" className="text-gray-500 hover:text-indigo-600 transition">Shop</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-800 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Gallery */}
          <div>
            <ProductGallery product={product} />
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-3">
              <span className="bg-indigo-50 text-indigo-700 text-sm font-medium px-4 py-1.5 rounded-full">
                {product.category || "General"}
              </span>
              {product.isNew && (
                <span className="bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-1.5 rounded-full">
                  New
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Seller */}
            <p className="text-gray-500 text-sm">
              Sold by <span className="text-gray-700 font-medium">{product.seller || "ShopLy"}</span>
            </p>

            {/* Rating & Stock */}
            <div className="flex items-center flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-lg">{product.averageRating || 0}</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500 text-sm">{product.totalReviews || 0} Reviews</span>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-2">
                <Check size={18} className="text-green-600" />
                <span className="text-green-600 font-medium text-sm">In Stock</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-indigo-600">
                  ₹{product.price?.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.originalPrice?.toLocaleString()}
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                    {discount}% OFF
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
            </div>

            {/* ✅ Color Selection - নতুন যোগ */}
            {availableColors.length > 1 && (
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Color: <span className="font-semibold">{selectedColor || 'Select'}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`
                        px-4 py-2 rounded-xl text-sm font-medium transition-all
                        ${selectedColor === color 
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'}
                      `}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description || "No description available."}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2.5 hover:bg-gray-50 transition"
                >
                  <Minus size={16} className="text-gray-600" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2.5 hover:bg-gray-50 transition"
                >
                  <Plus size={16} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* ✅ Action Buttons - AddToCartButton ব্যবহার করুন */}
            <div className="flex flex-wrap gap-3">
              <AddToCartButton 
                productId={product.id}
                product={product}
                quantity={quantity}
                color={selectedColor || 'Default'}  // ✅ color পাঠান
              />
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-5 py-3.5 border rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  isWishlisted 
                    ? "bg-red-50 border-red-200 text-red-500" 
                    : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Heart size={18} className={isWishlisted ? "fill-red-500" : ""} />
                Wishlist
              </button>
              <button className="px-5 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-gray-600">
                <Share2 size={18} />
              </button>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <Truck size={20} className="mx-auto text-indigo-600 mb-1" />
                <p className="text-xs font-medium text-gray-700">Free Delivery</p>
                <p className="text-[10px] text-gray-400">Above ₹499</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <RefreshCw size={20} className="mx-auto text-indigo-600 mb-1" />
                <p className="text-xs font-medium text-gray-700">Easy Returns</p>
                <p className="text-[10px] text-gray-400">30-day hassle-free</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <Shield size={20} className="mx-auto text-indigo-600 mb-1" />
                <p className="text-xs font-medium text-gray-700">Secure Payment</p>
                <p className="text-[10px] text-gray-400">100% encrypted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section - আগের মতো */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100">
            <div className="flex overflow-x-auto">
              {["description", "specifications", "reviews", "faq"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium capitalize transition-all duration-200 border-b-2 ${
                    activeTab === tab
                      ? "border-indigo-600 text-indigo-600"
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                    <span className="text-2xl block">🌱</span>
                    <p className="text-sm font-medium text-green-700">100% Organic</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                    <span className="text-2xl block">♻️</span>
                    <p className="text-sm font-medium text-blue-700">Recyclable</p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
                    <span className="text-2xl block">⭐</span>
                    <p className="text-sm font-medium text-yellow-700">Top Rated</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="space-y-3">
                <div className="flex py-2 border-b border-gray-100">
                  <span className="w-40 text-sm font-medium text-gray-500">Brand</span>
                  <span className="text-sm text-gray-800">{product.brand || "ShopLy"}</span>
                </div>
                <div className="flex py-2 border-b border-gray-100">
                  <span className="w-40 text-sm font-medium text-gray-500">Category</span>
                  <span className="text-sm text-gray-800">{product.category || "General"}</span>
                </div>
                <div className="flex py-2 border-b border-gray-100">
                  <span className="w-40 text-sm font-medium text-gray-500">SKU</span>
                  <span className="text-sm text-gray-800">{product.sku || "N/A"}</span>
                </div>
                <div className="flex py-2">
                  <span className="w-40 text-sm font-medium text-gray-500">Stock</span>
                  <span className="text-sm text-green-600 font-medium">In Stock ({product.stock || 0} units)</span>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <ProductReviews productId={product.id} />
            )}

            {activeTab === "faq" && (
              <div className="space-y-4">
                <div className="border border-gray-100 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800">Is this product authentic?</h4>
                  <p className="text-sm text-gray-500 mt-1">Yes, all products are verified and sourced from trusted sellers.</p>
                </div>
                <div className="border border-gray-100 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800">What is the warranty?</h4>
                  <p className="text-sm text-gray-500 mt-1">6 months manufacturer warranty on all products.</p>
                </div>
                <div className="border border-gray-100 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800">Can I return it if I'm not satisfied?</h4>
                  <p className="text-sm text-gray-500 mt-1">Yes, 30-day hassle-free returns available.</p>
                </div>
                <div className="border border-gray-100 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800">How long does delivery take?</h4>
                  <p className="text-sm text-gray-500 mt-1">Usually 3-5 business days depending on location.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <RelatedProducts category={product.category} currentProductId={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;