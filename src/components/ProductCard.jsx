import React from 'react';

const ProductCard = ({ product, onSelectProduct, onAddToCart }) => {
  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="bg-[#141414] border border-[#262626] rounded-md p-4 flex flex-col items-center group hover:border-[#D4AF37] transition-all duration-300 cursor-pointer"
    >
      <div className="w-full h-80 overflow-hidden rounded mb-4 bg-[#0A0A0A] relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-xs tracking-widest uppercase bg-black/80 text-[#D4AF37] px-4 py-2 border border-[#D4AF37]">
            عرض التفاصيل
          </span>
        </div>
      </div>
      <h3 className="text-[#E5E5E5] font-serif text-lg tracking-wider mb-2">{product.name}</h3>
      <p className="text-[#D4AF37] font-semibold mb-4">${product.price}</p>
      <button 
        onClick={(e) => {
          e.stopPropagation(); // منع فتح الـ Modal عند الضغط على الزر مباشرة
          onAddToCart(product);
        }}
        className="w-full border border-[#D4AF37] text-[#D4AF37] py-2 uppercase text-xs tracking-widest hover:bg-[#D4AF37] hover:text-black transition-colors duration-300"
      >
        أضف للسلة
      </button>
    </div>
  );
};

export default ProductCard;