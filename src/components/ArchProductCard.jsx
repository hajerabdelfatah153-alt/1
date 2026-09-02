import React from 'react';

const ArchProductCard = ({ product, onSelectProduct, onAddToCart }) => {
  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="bg-[var(--bg-card)] border border-[#D4AF37]/20 rounded-t-[140px] rounded-b-2xl p-5 flex flex-col items-center group hover:border-[#D4AF37] transition-all duration-500 cursor-pointer relative shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
    >
      {/* إطار الصورة المقوس */}
      <div className="w-full h-72 rounded-t-[120px] rounded-b-lg overflow-hidden mb-5 bg-[#0A0A0A] relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
          <span className="text-[10px] tracking-[0.2em] uppercase bg-[#D4AF37] text-black font-bold px-4 py-2 rounded-full">
            استكشاف العطر
          </span>
        </div>
      </div>

      {/* تفاصيل العطر */}
      <span className="text-[10px] uppercase text-[#D4AF37] tracking-[0.25em] mb-1 font-semibold">Parfum De Luxe</span>
      <h3 className="text-[var(--text-primary)] font-serif text-xl tracking-wide mb-1 font-bold text-center">{product.name}</h3>
      <p className="text-gray-400 text-xs text-center mb-3 line-clamp-1 italic px-2">{product.notes}</p>
      <p className="text-[#D4AF37] font-bold text-lg mb-4">${product.price}</p>

      {/* زر إضافة للسلة */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
        }}
        className="w-full border border-[#D4AF37] text-[#D4AF37] py-2.5 rounded-lg uppercase text-[11px] tracking-[0.2em] font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300 cursor-pointer shadow-md"
      >
        أضف إلى الحقيبة
      </button>
    </div>
  );
};

export default ArchProductCard;