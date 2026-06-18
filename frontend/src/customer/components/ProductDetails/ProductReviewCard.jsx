// ProductReviewCard.tsx
import { StarIcon } from "@heroicons/react/20/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";

/**
 * ProductReviewCard
 * Displays a single user review with modern, clean styling
 */
const ProductReviewCard = ({ review }) => {
  if (!review) return null;

  const { name, rating, comment, date, avatar } = review;

  return (
    <div className="flex gap-4 py-5 transition-all duration-200 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 -mx-2 px-2 rounded-xl">
      {/* Avatar */}
      <div className="shrink-0">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-100 shadow-sm"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center">
            <UserCircleIcon className="w-6 h-6 text-indigo-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Name + Date */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-sm font-semibold text-gray-900">
            {name}
          </span>
          {date && (
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {date}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center mt-1 gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`w-4 h-4 transition-colors ${
                star <= rating ? "text-amber-400 drop-shadow-sm" : "text-gray-200"
              }`}
            />
          ))}
          <span className="ml-2 text-xs font-medium text-gray-500">
            {rating}.0 / 5
          </span>
        </div>

        {/* Comment */}
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          {comment}
        </p>
      </div>
    </div>
  );
};

export default ProductReviewCard;