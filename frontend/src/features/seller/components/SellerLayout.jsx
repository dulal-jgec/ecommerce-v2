// src/features/seller/components/SellerLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SellerSidebar from './SellerSidebar';
import SellerHeader from './SellerHeader';

const SellerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SellerSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 min-w-0">
        <SellerHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;