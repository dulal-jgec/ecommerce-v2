import apiClient from '../../../shared/services/apiClient';
import { USER, SELLER, ORDERS, PRODUCT, CATEGORY } from '../../../shared/services/apiEndpoints';

// ============ Dashboard Stats ============
export const getDashboardStats = async () => {
  const stats = {
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  };

  // ===== Users =====
  try {
    const res = await apiClient.get(USER.ADMIN_ALL, {
      params: {
        role: "BUYER",
        page: 0,
        size: 1,
      },
    });

    stats.totalUsers = res.data.data?.totalElements || 0;
  } catch (err) {
     
  }

  // ===== Sellers =====
  try {
    const res = await apiClient.get(USER.ADMIN_ALL, {
      params: {
        role: "SELLER",
        page: 0,
        size: 1,
      },
    });

    stats.totalSellers = res.data.data?.totalElements || 0;
  } catch (err) {
    
  }

  // ===== Products =====
  try {
    const res = await apiClient.get(PRODUCT.ALL, {
      params: {
        page: 0,
        size: 1,
      },
    });

    stats.totalProducts = res.data.data?.totalElements || 0;
  } catch (err) {
     
  }

  // ===== Orders =====
  try {
    const res = await apiClient.get(ORDERS.ADMIN_ALL);

    const orders =
      res.data.data?.content ||
      res.data.data ||
      [];

    stats.totalOrders = orders.length;

    stats.totalRevenue = orders.reduce(
      (sum, order) => sum + (order.total || 0),
      0
    );
  } catch (err) {
     
  }

   

  return stats;
};

// ============ Users ============
export const getAllUsers = async (role ,page = 0, size = 10) => {
  try {
    const response = await apiClient.get(USER.ADMIN_ALL, {
      params: {role, page, size },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return { content: [], totalPages: 0, totalElements: 0 };
  }
};

export const toggleUserStatus = async (userId) => {
  const response = await apiClient.patch(USER.ADMIN_TOGGLE(userId));
  return response.data.data;
};

export const changeUserRole = async (userId, role) => {
  const response = await apiClient.patch(USER.ADMIN_ROLE(userId), null, {
    params: { role }
  });
  return response.data.data;
};

export const deleteUser = async (userId) => {
  const response = await apiClient.delete(USER.ADMIN_DELETE(userId));
  return response.data;
};

// ============ Sellers ============
export const getAllSellers = async () => {
    const response = await apiClient.get(SELLER.ALL);
    return response.data;
};
export const getPendingSellers = async () => {
    const response = await apiClient.get("/api/v1/seller/pending");
    return response.data;
};

export const approveSeller = async (id) => {
  const response = await apiClient.put(SELLER.APPROVE(id));
  return response.data;
};

export const rejectSeller = async (id) => {
  const response = await apiClient.put(SELLER.REJECT(id));
  return response.data;
};

// ============ Orders ============
export const getAllOrders = async (page = 0, size = 10) => {
  const response = await apiClient.get(ORDERS.ADMIN_ALL, {
    params: { page, size }
  });
  return response.data.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await apiClient.put(ORDERS.ADMIN_STATUS(orderId), { status });
  return response.data.data;
};

export const getOrderDetails = async (orderId) => {
  const response = await apiClient.get(ORDERS.ADMIN_DETAILS(orderId));
  return response.data.data;
};

// ============ Products ============
export const getAllProducts = async (page = 0, size = 10) => {
  const response = await apiClient.get(PRODUCT.ALL, {
    params: { page, size }
  });
  return response.data.data;
};

export const deleteProduct = async (id) => {
  const response = await apiClient.delete(PRODUCT.DELETE(id));
  return response.data;
};

// ============ Categories ============
export const getCategories = async () => {
  const response = await apiClient.get(CATEGORY.ALL);
  return response.data.data || [];
};

// ============ Revenue ============
export const getRevenueData = async () => {
  try {
    const response = await apiClient.get(ORDERS.ADMIN_ALL, {
      params: { page: 0, size: 100 }
    });
    const orders = response.data.data?.content || response.data.data || [];
    
    // Group by month
    const monthlyData = {};
    orders.forEach(order => {
      if (order.createdAt) {
        const date = new Date(order.createdAt);
        const month = date.toLocaleString('default', { month: 'short' });
        if (!monthlyData[month]) {
          monthlyData[month] = { revenue: 0, orders: 0 };
        }
        monthlyData[month].revenue += order.total || 0;
        monthlyData[month].orders += 1;
      }
    });

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(m => ({
      month: m,
      revenue: monthlyData[m]?.revenue || 0,
      orders: monthlyData[m]?.orders || 0,
    }));
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    return [];
  }
};


export const updateMarketing = async (productId, data) => {
  const response = await apiClient.patch(
    PRODUCT.MARKETING(productId),  
    data
  );

  return response.data.data;
};