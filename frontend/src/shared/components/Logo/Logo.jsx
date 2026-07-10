// src/shared/components/Logo/Logo.jsx
import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "h-16 w-auto",
    md: "h-24 w-auto",
    lg: "h-28 w-auto",
    xl: "h-32 w-auto",
  };

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <img
        src="/src/assets/logos/logo.png"
        alt="ShopLy"
        className={`${sizeClasses[size]} object-contain select-none`}
        draggable="false"
      />
    </Link>
  );
};

export default Logo;