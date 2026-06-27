// src/app/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import HomePage from "../../features/home/pages/HomePage";
import SignInPage from "../../features/auth/pages/SignInPage";
import SignUpPage from "../../features/auth/pages/SignUpPages";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes with Navbar */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      
      {/* Auth Routes */}
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export default AppRoutes;