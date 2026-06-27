// src/shared/components/Logo/Logo.jsx

import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ className = "", size = "xl" }) => {
  const sizeClasses = {
    sm: "h-14 w-auto",
    md: "h-20 w-auto",
    lg: "h-24 w-auto",
    xl: "h-28 w-auto",
  };

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <img
        src="/src/assets/logos/logo.png"
        alt="Logo"
        className={`${sizeClasses[size]} object-contain select-none`}
        draggable="false"
      />
    </Link>
  );
};

export default Logo;