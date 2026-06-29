// src/features/products/components/ProductReviews.jsx
import { useEffect, useState } from "react";
import { Star, User, ThumbsUp, MessageCircle } from "lucide-react";
import { getProductReviews } from "../services/productService";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    try {
      const data = await getProductReviews(productId);
      setReviews(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [productId]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">💬</div>
        <h3 className="text-xl font-semibold text-gray-700">No Reviews Yet</h3>
        <p className="text-gray-400 mt-2">Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Customer Reviews</h3>
        <div className="flex items-center gap-2">
          <Star size={18} className="fill-yellow-400 text-yellow-400" />
          <span className="font-bold">{reviews[0]?.rating || 0}</span>
          <span className="text-gray-400">|</span>
          <span className="text-sm text-gray-500">{reviews.length} reviews</span>
        </div>
      </div>

      {reviews.map((review) => (
        <div key={review.reviewId} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <User size={18} className="text-indigo-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{review.userName || "Anonymous"}</h4>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-indigo-600 transition">
              <ThumbsUp size={14} />
              Helpful
            </button>
          </div>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;