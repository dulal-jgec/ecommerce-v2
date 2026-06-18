import { StarIcon } from "@heroicons/react/20/solid";
import {
  ShoppingBagIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import ProductReviewCard from "./ProductReviewCard";

import { useParams } from "react-router-dom";
import { getProductById } from "../../../services/productService";

import { useCart } from "../../../context/CartContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  const reviewsData = {
    average: 4,
    totalCount: 117,
    list: [
      {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        comment:
          "Absolutely love these tees! The fabric is incredibly soft and the fit is perfect. Best basic tees I have ever owned.",
        date: "March 15, 2024",
      },
      {
        id: 2,
        name: "Michael Chen",
        rating: 4,
        comment:
          "Great quality shirts. The colors are exactly as shown. Would recommend sizing up if you prefer a looser fit.",
        date: "March 10, 2024",
      },
      {
        id: 3,
        name: "Emma Williams",
        rating: 5,
        comment:
          "Perfect everyday tees! Washed them multiple times and they still look brand new. No shrinking or fading.",
        date: "March 5, 2024",
      },
    ],
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0].imageUrl);
      setSelectedColor(product.images[0].color);
    }
  }, [product]);

  const filteredImages =
    product?.images?.filter((img) => img.color === selectedColor) || [];

  const images = product?.images || [];
  const colors = [...new Set(images.map((img) => img.color))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-gray-900 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Product Not Found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div className="pt-6 pb-16">
        {/* Breadcrumb */}
        <nav className="border-b border-gray-100">
          <ol className="mx-auto flex max-w-7xl items-center space-x-2 px-4 sm:px-6 lg:px-8 py-3">
            <li>
              <div className="flex items-center">
                <a
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  Home
                </a>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  className="h-5 w-4 text-gray-300 ml-2"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <a
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
                >
                  {product.category || "Shop"}
                </a>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  className="h-5 w-4 text-gray-300 ml-2"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <span className="font-medium text-gray-900">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Main Image */}
                <div className="col-span-2">
                  <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
                    <img
                      src={`http://localhost:5454${selectedImage}`}
                      alt="product"
                      className="h-full w-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="col-span-2 grid grid-cols-4 gap-4">
                  {filteredImages.map((img) => (
                    <div
                      key={img.id}
                      className="aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm cursor-pointer ring-1 ring-offset-2 hover:ring-indigo-500 transition-all"
                      onClick={() => setSelectedImage(img.imageUrl)}
                    >
                      <img
                        src={`http://localhost:5454${img.imageUrl}`}
                        alt={img.color}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:pl-8">
              {/* Title & Actions */}
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {product.name}
                  </h1>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              reviewsData.average > rating
                                ? "text-yellow-400"
                                : "text-gray-200",
                              "h-5 w-5 shrink-0",
                            )}
                          />
                        ))}
                      </div>
                      <a
                        href="#reviews"
                        className="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {reviewsData.totalCount} reviews
                      </a>
                    </div>
                    <span className="text-sm text-gray-500">|</span>
                    <span className="text-sm text-green-600 font-medium">
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-gray-50 text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all">
                    <HeartIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-full bg-gray-50 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {/* Price */}
              <div className="mt-6">
                <p className="text-4xl font-bold tracking-tight text-gray-900">
                  ₹{product.price?.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Free shipping on orders over ₹1000
                </p>
              </div>
              {/* Colors */}
              {colors.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Color
                    </h3>
                    <span className="text-xs text-gray-500">
                      {selectedColor}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          const firstImage = product.images.find(
                            (img) => img.color === color,
                          );
                          if (firstImage) setSelectedImage(firstImage.imageUrl);
                        }}
                        className={`px-5 py-2 text-sm font-medium rounded-lg border transition-all ${
                          selectedColor === color
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* Quantity */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 text-xl hover:bg-gray-100 active:bg-gray-200 transition-colors"
                  >
                    -
                  </button>

                  <span className="text-lg font-semibold w-8 text-center">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.min(product.stock, prev + 1))
                    }
                    className="w-10 h-10 rounded-lg border border-gray-300 text-xl hover:bg-gray-100 active:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Available Stock: {product.stock}
                </p>
              </div>
              {/* Add to Cart */}

              <button
                onClick={() => {
                  addToCart({
                    id: product.id,
                    quantity: quantity,
                    color: selectedColor,
                  });
                }}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-8 py-4 text-base font-semibold text-white"
              >
                <ShoppingBagIcon className="h-5 w-5" />
                Add to bag • {quantity} item{quantity > 1 ? "s" : ""}
              </button>
              {/* Description & Details */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">
                  Description
                </h3>
                <p className="mt-3 text-base text-gray-600 leading-relaxed">
                  {product.description || "No description available"}
                </p>
              </div>
              <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Product Details
                </h3>
                <div className="mt-2 space-y-1 text-sm text-gray-700">
                  <p>Category: {product.category || "N/A"}</p>
                  <p>Stock: {product.stock} units available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div id="reviews" className="mt-20 pt-8 border-t border-gray-100">
            {/* ... Reviews section remains same ... */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Customer Reviews
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviewsData.average > rating
                            ? "text-yellow-400"
                            : "text-gray-200",
                          "h-5 w-5",
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {reviewsData.average} out of 5 stars
                  </span>
                  <span className="text-sm text-gray-500">
                    ({reviewsData.totalCount} reviews)
                  </span>
                </div>
              </div>
              <button className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200">
                Write a review
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                {reviewsData.list.map((review) => (
                  <ProductReviewCard key={review.id} review={review} />
                ))}
              </div>
              {/* Review form remains unchanged */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
