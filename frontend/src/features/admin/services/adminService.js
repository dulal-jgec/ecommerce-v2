import apiClient from '../../../shared/services/apiClient';
import { USER, SELLER, ORDERS, PRODUCT, CATEGORY } from '../../../shared/services/apiEndpoints';

// ============ Dashboard Stats ============
export const getDashboardStats = async () => {
  try {
    const [ordersRes, sellersRes, productsRes, usersRes] = await Promise.all([
      apiClient.get(ORDERS.ADMIN_ALL),
      apiClient.get(SELLER.PENDING),
      apiClient.get(PRODUCT.ALL, { params: { page: 0, size: 1 } }),
      apiClient.get(USER.ADMIN_ALL, { params: { page: 0, size: 1 } }),
    ]);

    const orders = ordersRes.data.data?.content || ordersRes.data.data || [];
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    return {
      totalOrders: orders.length,
      totalRevenue: totalRevenue,
      pendingSellers: sellersRes.data.data?.length || 0,
      totalProducts: productsRes.data.data?.totalElements || productsRes.data.data?.length || 0,
      totalUsers: usersRes.data.data?.totalElements || usersRes.data.data?.length || 0,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalOrders: 0,
      totalRevenue: 0,
      pendingSellers: 0,
      totalProducts: 0,
      totalUsers: 0,
    };
  }
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
    const response = await apiClient.get("/api/v1/seller/admin");
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
export const getAllCategories = async () => {
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