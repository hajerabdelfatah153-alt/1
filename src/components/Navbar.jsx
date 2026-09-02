import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, onOpenCart }) => {
  return (
    <nav className="w-full bg-[#E8E3DD] text-[#1A1A1A] border-b border-[#D8D2C9] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center text-[10px] tracking-[0.25em] font-medium">
        
        {/* اليسار: روابط التنقل */}
        <div className="flex gap-8 items-center">
          <Link to="/" className="hover:opacity-40 transition-opacity uppercase">SHOP</Link>
          <Link to="/contact" className="hover:opacity-40 transition-opacity uppercase">ABOUT</Link>
        </div>

        {/* المنتصف: الشعار الفاخر */}
        <Link to="/" className="text-2xl font-serif tracking-[0.35em] font-normal uppercase pl-4">
          AÊTRE
        </Link>

        {/* اليمين: البحث والحقيبة */}
        <div className="flex gap-8 items-center">
          <button className="hover:opacity-40 transition-opacity uppercase cursor-pointer">
            SEARCH
          </button>
          <button 
            onClick={onOpenCart} 
            className="hover:opacity-40 transition-opacity uppercase cursor-pointer"
          >
            CART ({cartCount})
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;