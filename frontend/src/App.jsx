import React from "react";

import Footer from "./customer/components/Footer/Footer";
import Product from "./customer/components/Product/Product";

import ProductDetails from "./customer/components/ProductDetails/ProductDetails";
import Cart from "./customer/components/Cart/Cart";
import CheckOut from "./customer/components/CheckOut/CheckOut";
import Orders from "./customer/components/Order/Orders";
import OrderTracker from "./customer/components/Order/OrderTracker";
import OrderDetails from "./customer/components/Order/OrderDetails";

import { Routes, Route } from "react-router-dom";
import AdminProducts from "./admin/pages/AdminProducts";
import CreateProduct from "./admin/pages/CreateProduct";

import ProductImages from "./admin/pages/ProductImages";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminOrderDetails from "./admin/pages/AdminOrderDetails";
import Home from "./pages/Home";
import Navigation from "./customer/components/HomeSection/Navigation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminSellerRequests from "./admin/pages/AdminSellerRequests";
import SellerOrderDetails from "./customer/seller/pages/SellerOrderDetails";
import SellerOrders from "./customer/seller/pages/SellerOrders";
import SellerProducts from "./customer/seller/pages/SellerProducts";
import SellerLayout from "./customer/seller/layout/SellerLayout";
import SellerDashboard from "./customer/seller/pages/SellerDashboard";
import SellerCreateProduct from "./customer/seller/pages/SellerCreateProduct";
import SellerProfile from "./customer/seller/pages/SellerProfile";
import SellerRoute from "./routes/SellerRoute";
import AdminRoute from "./routes/AdminRoute";
import BuyerRoute from "./routes/BuyerRoute";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/seller"
          element={
            <SellerRoute>
              <SellerLayout />
            </SellerRoute>
          }
        >
          <Route path="dashboard" element={<SellerDashboard />} />

          <Route path="products" element={<SellerProducts />} />

          <Route path="products/create" element={<SellerCreateProduct />} />

          <Route path="orders/:orderItemId" element={<SellerOrderDetails />} />

          <Route
            path="products/:productId/images"
            element={<ProductImages />}
          />

          <Route path="orders" element={<SellerOrders />} />
 

          <Route path="profile" element={<SellerProfile />} />
        </Route>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/products" element={<Product />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route
          path="/cart"
          element={
            <BuyerRoute>
              <Cart />
            </BuyerRoute>
          }
        />

        <Route
          path="/checkout/*"
          element={
            <BuyerRoute>
              <CheckOut />
            </BuyerRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <BuyerRoute>
              <Orders />
            </BuyerRoute>
          }
        />

        <Route
          path="/orders/:orderId"
          element={
            <BuyerRoute>
              <OrderDetails />
            </BuyerRoute>
          }
        />

        <Route
          path="/order-tracker"
          element={
            <BuyerRoute>
              <OrderTracker />
            </BuyerRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/create"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/:productId/images"
          element={
            <AdminRoute>
              <ProductImages />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/orders/:orderId"
          element={
            <AdminRoute>
              <AdminOrderDetails />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/sellers"
          element={
            <AdminRoute>
              <AdminSellerRequests />
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
