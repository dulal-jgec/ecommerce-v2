
export const API_BASE_URL = 'https://ecommerce-v2-backend-g92n.onrender.com';

export const AUTH = {
  REGISTER: '/api/v1/auth/register',
  LOGIN: '/api/v1/auth/login',
  REFRESH: '/api/v1/auth/refresh',
  LOGOUT: '/api/v1/auth/logout',
};

export const USER = {
  PROFILE: '/api/v1/users/profile',
  UPDATE: '/api/v1/users/update',
};

export const REVIEW = {
    TESTIMONIALS: "/api/v1/reviews/testimonials",
};
export const PRODUCT = {
  FEATURED: "/api/v1/products/featured",
  BEST_SELLERS: "/api/v1/products/best-sellers",
  NEW_ARRIVALS: "/api/v1/products/new-arrivals",
  TRENDING: "/api/v1/products/trending",
};