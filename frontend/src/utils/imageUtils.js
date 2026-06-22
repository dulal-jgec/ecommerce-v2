export const getImageUrl = (url) => {
  if (!url) {
    return "https://placehold.co/400x400?text=No+Image";
  }

  // Cloudinary URL
  if (url.startsWith("http")) {
    return url;
  }

  // Old local uploads support
  return `https://ecommerce-v2-backend-g92n.onrender.com${url}`;
};