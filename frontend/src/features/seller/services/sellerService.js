import apiClient from "../../../shared/services/apiClient";
import { CATEGORY } from "../../../shared/services/apiEndpoints";
import { PRODUCT, ORDERS } from "../../../shared/services/apiEndpoints";

export const getCategories = async () => {
  const response = await apiClient.get(CATEGORY.GET_ALL);

  return response.data.data;
};
export const getDashboardStats = async () => {
  try {
    const [productsRes, ordersRes] = await Promise.all([
      apiClient.get(PRODUCT.MY_PRODUCTS),
      apiClient.get(ORDERS.SELLER_ALL),
    ]);

    const products = productsRes.data || [];
    const orders = ordersRes.data || [];

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue: orders.reduce(
        (sum, order) => sum + order.price * order.quantity,
        0
      ),
 pendingOrders: orders.filter(
  order =>
    order.status === "PLACED" ||
    order.status === "PAID"
).length,

deliveredOrders: orders.filter(
  order => order.status === "DELIVERED"
).length,

deliveredOrders: orders.filter(
  order => order.status === "DELIVERED"
).length,
      recentOrders: orders.slice(0, 5),
    };
  } catch (error) {
    console.error("Seller Dashboard Error:", error);

    return {
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      deliveredOrders: 0,
      recentOrders: [],
    };
  }
};