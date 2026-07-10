// src/features/profile/pages/ProfilePage.jsx
import React, { useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import ProfileHeader from "../components/ProfileHeader";
import PersonalInfoCard from "../components/PersonalInfoCard";
import { Loader } from "lucide-react";

const ProfilePage = () => {
  const { user, loadProfile, isLoading } = useAuth();

  useEffect(() => {
    loadProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="text-center">
          <Loader size={40} className="animate-spin text-indigo-600 mx-auto" />
          <p className="mt-4 text-slate-500 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileHeader user={user} />
        <div className="mt-8">
          <PersonalInfoCard user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;