// src/app/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../../shared/components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "../../shared/components/ProtectedRoute/AdminRoute";
import SellerRoute from "../../shared/components/ProtectedRoute/SellerRoute";

import PublicLayout from "../../layouts/PublicLayout";

// ===== Public Pages =====
import HomePage from "../../features/home/pages/HomePage";
import SignInPage from "../../features/auth/pages/SignInPage";
import SignUpPage from "../../features/auth/pages/SignUpPages";
import ProductDetails from "../../features/products/pages/ProductDetails";
import ProductList from "../../features/products/pages/ProductList";
import CartPage from "../../features/cart/pages/CartPage";

// ===== About, Contact, FAQ, Policy =====
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import FAQPage from "../../features/faq/FAQPage";
import PrivacyPolicyPage from "../../features/policy/PrivacyPolicyPage";
import TermsPage from "../../features/policy/TermsPage";
import ShippingPolicyPage from "../../features/policy/ShippingPolicyPage";
import ReturnPolicyPage from "../../features/policy/ReturnPolicyPage";

// ===== Checkout =====
import CheckoutPage from "../../features/checkout/pages/CheckoutPage";

// ===== Orders =====
import OrderHistoryPage from "../../features/orders/pages/OrderHistoryPage";
import OrderDetailsPage from "../../features/orders/pages/OrderDetailsPage";
import OrderSuccessPage from "../../features/orders/pages/OrderSuccessPage";

// ===== Payment =====
import PaymentPage from "../../features/payment/pages/PaymentPage";
import PaymentSuccess from "../../features/payment/pages/PaymentSuccess";
import PaymentFailed from "../../features/payment/pages/PaymentFailed";

// ===== Admin =====
import AdminLayout from "../../features/admin/components/AdminLayout";
import Dashboard from "../../features/admin/pages/Dashboard";
import UsersPage from "../../features/admin/pages/UsersPage";
import SellersPage from "../../features/admin/pages/SellersPage";
import ProductsPage from "../../features/admin/pages/ProductsPage";
import OrdersPage from "../../features/admin/pages/OrdersPage";
import CategoriesPage from "../../features/admin/pages/CategoriesPage";
import RevenuePage from "../../features/admin/pages/RevenuePage";
import ReportsPage from "../../features/admin/pages/ReportsPage";

// ===== Seller =====
import SellerLayout from "../../features/seller/components/SellerLayout";
import SellerDashboard from "../../features/seller/pages/SellerDashboard";
import SellerProducts from "../../features/seller/pages/ProductsPage";
import SellerAddProduct from "../../features/seller/pages/AddProductPage";
import SellerEditProduct from "../../features/seller/pages/EditProductPage";
import SellerOrders from "../../features/seller/pages/OrdersPage";
import SellerAnalytics from "../../features/seller/pages/AnalyticsPage";
import SellerReturns from "../../features/seller/pages/ReturnsPage";
import SellerStoreProfile from "../../features/seller/pages/StoreProfilePage";
import SellerBankDetails from "../../features/seller/pages/BankDetailsPage";
import OrderDetails from "../../features/seller/pages/OrderDetails";

// ===== Profile =====
import ProfilePage from "../../features/folder/pages/ProfilePage";

// ===== Banner =====
import BannerManagementPage from "../../features/banner/pages/BannerManagementPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ===== PUBLIC ROUTES ===== */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="cart" element={<CartPage />} />

        {/* About, Contact, FAQ */}
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="faq" element={<FAQPage />} />

        {/* Policy Pages */}
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="shipping" element={<ShippingPolicyPage />} />
        <Route path="returns" element={<ReturnPolicyPage />} />
      </Route>

      {/* ===== AUTH ROUTES ===== */}
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* ===== PROTECTED ROUTES (Logged In Users) ===== */}
      <Route element={<ProtectedRoute />}>
        <Route element={<PublicLayout />}>
          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/payment/:orderId" element={<PaymentPage />} />

          <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/orders/:id" element={<OrderDetailsPage />} />
          <Route path="/orders/success/:id" element={<OrderSuccessPage />} />

          <Route path="/payment/:orderId" element={<PaymentPage />} />
          <Route
            path="/payment/success/:orderId"
            element={<PaymentSuccess />}
          />
          <Route path="/payment/failed/:orderId" element={<PaymentFailed />} />
        </Route>
      </Route>

      {/* ===== ADMIN ROUTES ===== */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="sellers" element={<SellersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="revenue" element={<RevenuePage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="banners" element={<BannerManagementPage />} />
        </Route>
      </Route>

      {/* ===== SELLER ROUTES ===== */}
      <Route element={<SellerRoute />}>
        <Route path="/seller" element={<SellerLayout />}>
          <Route index element={<SellerDashboard />} />
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="products" element={<SellerProducts />} />
          <Route path="products/add" element={<SellerAddProduct />} />
          <Route path="products/edit/:id" element={<SellerEditProduct />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="analytics" element={<SellerAnalytics />} />
          <Route path="returns" element={<SellerReturns />} />
          <Route path="store-profile" element={<SellerStoreProfile />} />
          <Route path="bank-details" element={<SellerBankDetails />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
