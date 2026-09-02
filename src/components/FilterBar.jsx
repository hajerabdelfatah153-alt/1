import React from 'react';

const FilterBar = ({ sortBy, onSortChange, searchQuery, onSearchChange }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b border-[#262626]">
      {/* حقل البحث */}
      <input 
        type="text"
        placeholder="بحث عن منتج..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="bg-[#141414] border border-[#262626] text-white px-4 py-2 text-sm rounded focus:outline-none focus:border-[#D4AF37] w-full md:w-64"
      />

      {/* القائمة المنسدلة للترتيب */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <span className="text-xs text-gray-400 uppercase tracking-wider">ترتيب حسب:</span>
        <select 
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-[#141414] border border-[#262626] text-[#D4AF37] px-3 py-2 text-sm rounded focus:outline-none focus:border-[#D4AF37]"
        >
          <option value="default">الافتراضي</option>
          <option value="low-high">السعر: من الأقل للأعلى</option>
          <option value="high-low">السعر: من الأعلى للأقل</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;