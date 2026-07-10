// src/features/profile/components/ProfileHeader.jsx
import React from "react";
import { User, Mail, Shield } from "lucide-react";

const ProfileHeader = ({ user }) => {
  const getInitials = () => {
    const first = user?.firstName?.charAt(0) || "";
    const last = user?.lastName?.charAt(0) || "";
    return `${first}${last}`.toUpperCase() || "U";
  };

  const getRoleColor = (role) => {
    const colors = {
      ADMIN: "bg-indigo-100 text-indigo-700",
      SELLER: "bg-blue-100 text-blue-700",
      BUYER: "bg-emerald-100 text-emerald-700",
    };
    return colors[role] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.firstName}
              className="w-28 h-28 rounded-full object-cover border-2 border-slate-200 shadow-sm"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center text-3xl font-semibold text-indigo-700 border-2 border-slate-200 shadow-sm">
              {getInitials()}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-2">
            <Mail size={16} className="text-slate-400" />
            {user?.email}
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium ${getRoleColor(user?.role)}`}>
              <Shield size={14} />
              {user?.role || "User"}
            </span>
            <span className="text-sm text-slate-400 flex items-center gap-1">
              <User size={14} />
              Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : "2025"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;