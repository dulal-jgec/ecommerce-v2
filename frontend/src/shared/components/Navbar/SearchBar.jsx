// SearchBar.jsx
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ mobile = false }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const clearSearch = () => setQuery('');

  return (
    <div className={`
      relative flex items-center w-full
      ${mobile ? 'bg-gray-100' : 'bg-gray-50'}
      rounded-full transition-all duration-300
      ${isFocused ? 'ring-2 ring-green-400 bg-white shadow-sm' : ''}
    `}>
      <Search className="absolute left-3 text-gray-400" size={18} />
      
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full py-2 pl-10 pr-10 
          bg-transparent 
          rounded-full 
          outline-none 
          text-gray-700 placeholder-gray-400
          ${mobile ? 'text-sm' : 'text-base'}
        `}
      />

      {query && (
        <button
          onClick={clearSearch}
          className="absolute right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;