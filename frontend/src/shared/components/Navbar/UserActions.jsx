// UserActions.jsx
import React from 'react';
import { User, ShoppingBag, Heart } from 'lucide-react';

const UserActions = ({ mobile = false }) => {
  return (
    <div className={`
      flex items-center 
      ${mobile ? 'space-x-2' : 'space-x-4'}
    `}>
      {/* Wishlist Icon */}
      <button className="relative text-gray-600 hover:text-green-600 transition-colors">
        <Heart size={mobile ? 20 : 22} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
          3
        </span>
      </button>

      {/* Cart Icon */}
      <button className="relative text-gray-600 hover:text-green-600 transition-colors">
        <ShoppingBag size={mobile ? 20 : 22} />
        <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
          2
        </span>
      </button>

      {/* Sign In / Profile */}
      <button className={`
        flex items-center gap-1 
        text-gray-600 hover:text-green-600 transition-colors
        ${mobile ? 'text-sm' : 'font-medium'}
      `}>
        <User size={mobile ? 18 : 20} />
        {!mobile && <span>Sign In</span>}
      </button>
    </div>
  );
};

export default UserActions;