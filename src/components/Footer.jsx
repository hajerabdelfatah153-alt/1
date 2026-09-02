import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#EAE5DF] text-[#1C1B1A] py-12 border-t border-[#D5CE8]/60 text-xs font-light">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex gap-8 tracking-[0.2em] text-[10px] uppercase">
          <Link to="/" className="hover:opacity-50">SHOP</Link>
          <Link to="/contact" className="hover:opacity-50">ABOUT</Link>
          <button className="hover:opacity-50 uppercase">SEARCH</button>
          <button className="hover:opacity-50 uppercase">CART</button>
        </div>

        <div className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">
          © AÊTRE PARFUMS 2026. ALL RIGHTS RESERVED.
        </div>

      </div>
    </footer>
  );
};

export default Footer;