// src/app/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import HomePage from "../../features/home/pages/HomePage";
import SignInPage from "../../features/auth/pages/SignInPage";
import SignUpPage from "../../features/auth/pages/SignUpPages";
import ProductDetails from "../../features/products/pages/ProductDetails";
import ProductList from "../../features/products/pages/ProductList";
import CartPage from "../../features/cart/pages/CartPage";

// ========== Checkout Imports ==========
import CheckoutPage from "../../features/checkout/pages/CheckoutPage";

// ========== Orders Imports ==========
import OrderHistoryPage from "../../features/orders/pages/OrderHistoryPage";
import OrderDetailsPage from "../../features/orders/pages/OrderDetailsPage";
import OrderSuccessPage from "../../features/orders/pages/OrderSuccessPage";

// ========== Payment Imports ==========
import PaymentPage from "../../features/payment/pages/PaymentPage";
import PaymentSuccess from "../../features/payment/pages/PaymentSuccess";
import PaymentFailed from "../../features/payment/pages/PaymentFailed";

// ========== Admin Imports ==========
import AdminLayout from "../../features/admin/components/AdminLayout";
import Dashboard from "../../features/admin/pages/Dashboard";
import UsersPage from "../../features/admin/pages/UsersPage";
import SellersPage from "../../features/admin/pages/SellersPage";
import ProductsPage from "../../features/admin/pages/ProductsPage";
import OrdersPage from "../../features/admin/pages/OrdersPage";
import CategoriesPage from "../../features/admin/pages/CategoriesPage";
import RevenuePage from "../../features/admin/pages/RevenuePage";
import ReportsPage from "../../features/admin/pages/ReportsPage";

// ========== Seller Imports ==========
import SellerLayout from "../../features/seller/components/SellerLayout";
import SellerDashboard from "../../features/seller/pages/Dashboard";
import SellerProducts from "../../features/seller/pages/ProductsPage";
import SellerAddProduct from "../../features/seller/pages/AddProductPage";
import SellerEditProduct from "../../features/seller/pages/EditProductPage";
import SellerOrders from "../../features/seller/pages/OrdersPage";
import SellerAnalytics from "../../features/seller/pages/AnalyticsPage";
import SellerReturns from "../../features/seller/pages/ReturnsPage";
import SellerStoreProfile from "../../features/seller/pages/StoreProfilePage";
import SellerBankDetails from "../../features/seller/pages/BankDetailsPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ===== Public Routes with Navbar ===== */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="cart" element={<CartPage />} />
      </Route>

      {/* ===== Auth Routes ===== */}
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* ===== Checkout Routes ===== */}
      <Route path="/checkout" element={<CheckoutPage />} />

      {/* ===== Orders Routes ===== */}
      <Route path="/orders" element={<OrderHistoryPage />} />
      <Route path="/orders/:id" element={<OrderDetailsPage />} />
      <Route path="/orders/success/:id" element={<OrderSuccessPage />} />

      {/* ===== Payment Routes ===== */}
      <Route path="/payment/:orderId" element={<PaymentPage />} />
      <Route path="/payment/success/:orderId" element={<PaymentSuccess />} />
      <Route path="/payment/failed/:orderId" element={<PaymentFailed />} />

      {/* ===== Admin Routes ===== */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="sellers" element={<SellersPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="revenue" element={<RevenuePage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>

      {/* ===== Seller Routes ===== */}
      <Route path="/seller" element={<SellerLayout />}>
        <Route index element={<SellerDashboard />} />
        <Route path="products" element={<SellerProducts />} />
        <Route path="products/add" element={<SellerAddProduct />} />
        <Route path="products/edit/:id" element={<SellerEditProduct />} />
        <Route path="orders" element={<SellerOrders />} />
        <Route path="analytics" element={<SellerAnalytics />} />
        <Route path="returns" element={<SellerReturns />} />
        <Route path="store-profile" element={<SellerStoreProfile />} />
        <Route path="bank-details" element={<SellerBankDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;