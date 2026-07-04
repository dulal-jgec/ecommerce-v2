export const API_BASE_URL = 'https://ecommerce-v2-backend-g92n.onrender.com';

export const AUTH = {
  REGISTER: '/api/v1/auth/register',
  LOGIN: '/api/v1/auth/login',
  REFRESH: '/api/v1/auth/refresh',
  LOGOUT: '/api/v1/auth/logout',
  ME: '/api/v1/auth/me',  
};

export const USER = {
  PROFILE: '/api/v1/users/profile',
  UPDATE: '/api/v1/users/update',

  ADMIN_ALL: '/api/v1/users/admin',
  ADMIN_DETAILS: (id) => `/api/v1/users/admin/${id}`,
  ADMIN_TOGGLE: (id) => `/api/v1/users/admin/${id}/toggle-status`,
  ADMIN_ROLE: (id) => `/api/v1/users/admin/${id}/role`,
  ADMIN_DELETE: (id) => `/api/v1/users/admin/${id}`,
};

export const SELLER = {
  PENDING: '/api/v1/seller/pending',
  APPROVE: (id) => `/api/v1/seller/${id}/approve`,
  REJECT: (id) => `/api/v1/seller/${id}/reject`,
  SELLER_USERS: "/api/v1/users/admin/sellers",
};

export const ORDERS = {
  
  CREATE: '/api/v1/orders',
  MY_ORDERS: '/api/v1/orders',
  DETAILS: (id) => `/api/v1/orders/${id}`,


  ADMIN_ALL: '/api/v1/orders/admin',
  ADMIN_DETAILS: (id) => `/api/v1/orders/admin/${id}`,
  ADMIN_STATUS: (id) => `/api/v1/orders/admin/${id}/status`,
   

  SELLER_ALL: '/api/v1/orders/seller/orders',
  SELLER_DETAILS: (id) => `/api/v1/orders/seller/orders/${id}`,
  SELLER_STATUS: (id) => `/api/v1/orders/seller/orders/${id}/status`,
};

export const PRODUCT = {
  FEATURED: '/api/v1/products/featured',
  BEST_SELLERS: '/api/v1/products/best-sellers',
  NEW_ARRIVALS: '/api/v1/products/new-arrivals',
  TRENDING: '/api/v1/products/trending',
  ALL: '/api/v1/products',
  DETAILS: (id) => `/api/v1/products/${id}`,
  CREATE: '/api/v1/products',
  UPDATE: (id) => `/api/v1/products/${id}`,
  DELETE: (id) => `/api/v1/products/${id}`,
  MY_PRODUCTS: '/api/v1/products/my-products',
  SEARCH: '/api/v1/products/search',
  IMAGES: (productId) => `/api/v1/products/${productId}/images`,
  DELETE_IMAGE: (imageId) => `/api/v1/products/images/${imageId}`,
};

export const CATEGORY = {
  ALL: '/api/v1/categories',
  CREATE: '/api/v1/categories',
};

export const CART = {
  GET: '/api/v1/cart',
  ADD: '/api/v1/cart',
  UPDATE: '/api/v1/cart/quantity',
  REMOVE: (id) => `/api/v1/cart/items/${id}`,
  CLEAR: '/api/v1/cart/clear',
};

export const PAYMENT = {
  CREATE: '/api/v1/payments',
  VERIFY: '/api/v1/payments/verify',
};

export const ADDRESS = {
  ALL: '/api/v1/addresses',
  CREATE: '/api/v1/addresses',
  UPDATE: (id) => `/api/v1/addresses/${id}`,
  DELETE: (id) => `/api/v1/addresses/${id}`,
  DEFAULT: (id) => `/api/v1/addresses/${id}/default`,
};

export const REVIEW = {
  TESTIMONIALS: '/api/v1/reviews/testimonials',
  PRODUCT: (productId) => `/api/v1/reviews/products/${productId}`,
  CREATE: (productId) => `/api/v1/reviews/products/${productId}`,
  UPDATE: (id) => `/api/v1/reviews/${id}`,
  FEATURE: (id) => `/api/v1/reviews/${id}/feature`,
  UNFEATURE: (id) => `/api/v1/reviews/${id}/unfeature`,
};