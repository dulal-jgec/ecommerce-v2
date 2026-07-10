// src/features/profile/components/PersonalInfoCard.jsx
import React from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  Edit2,
  Building,
  MapPin
} from "lucide-react";

const PersonalInfoCard = ({ user }) => {
  const infoFields = [
    { label: "First Name", value: user?.firstName || "-", icon: User },
    { label: "Last Name", value: user?.lastName || "-", icon: User },
    { label: "Email Address", value: user?.email || "-", icon: Mail },
    { label: "Phone Number", value: user?.phoneNumber || "Not added", icon: Phone },
    { label: "Role", value: user?.role || "-", icon: Shield },
    { label: "Joined On", value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }) : "-", icon: Calendar },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Personal Information</h2>
        <button
          disabled
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-400 rounded-xl text-sm font-medium cursor-not-allowed"
        >
          <Edit2 size={16} />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {infoFields.map((field, index) => {
          const Icon = field.icon;
          return (
            <div key={index} className="group">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Icon size={14} />
                {field.label}
              </label>
              <div className="mt-1.5 px-4 py-3 bg-slate-50/80 border border-slate-200/60 rounded-xl text-slate-700 font-medium text-sm group-hover:border-slate-300 transition">
                {field.value}
              </div>
            </div>
          );
        })}
      </div>

      {user?.address && (
        <div className="mt-6 pt-6 border-t border-slate-200/60">
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin size={14} />
            Address
          </label>
          <div className="mt-1.5 px-4 py-3 bg-slate-50/80 border border-slate-200/60 rounded-xl text-slate-700 font-medium text-sm">
            {user.address}
          </div>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-slate-200/60">
        <p className="text-xs text-slate-400 flex items-center gap-1.5">
          <Building size={14} />
          Account status: <span className="text-emerald-600 font-medium">Active</span>
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoCard;