import React from 'react';
import { products } from '../data/products';

const Hero = () => {
  // استخدام صورة العطر الأول تلقائياً من ملف البيانات
  const heroPerfume = products[0];

  return (
    <section className="relative py-20 md:py-28 px-8 border-b border-[#3D141A]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* النصوص */}
        <div className="lg:col-span-5 space-y-8">
          <span className="text-[9px] tracking-[0.4em] uppercase text-[#E58080] font-light block">
            EAU DE PARFUM / EXTRAIT
          </span>
          
          <h1 className="text-6xl md:text-7xl font-serif leading-[1.02] font-normal text-[#FDF8F5]">
            Liquid <br />
            <span className="italic font-light text-[#E58080]">Emotions.</span>
          </h1>

          <p className="text-base font-serif italic text-[#C5B4B4]">
            Scent of <span className="not-italic text-[#FDF8F5]">Invisible Memories.</span>
          </p>

          <p className="text-xs leading-relaxed text-[#A89292] max-w-xs font-light tracking-wide">
            A genderless olfactory exploration crafted with rare materials and dark amber notes. Designed to linger.
          </p>

          <div className="pt-2">
            <a 
              href="#shop" 
              className="inline-flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase font-semibold text-[#FDF8F5] border-b border-[#E58080] pb-2 hover:text-[#E58080] transition-colors"
            >
              EXPLORE COLLECTION <span className="text-xs">→</span>
            </a>
          </div>

          <div className="flex gap-10 pt-8 border-t border-[#3D141A] text-[9px] tracking-[0.25em] text-[#A89292] uppercase">
            <div>
              <span className="block text-[#6E5555] mb-1">EDP</span>
              <span className="text-[#FDF8F5]">50ML — 1.7 FL.OZ</span>
            </div>
            <div>
              <span className="block text-[#6E5555] mb-1">BATCH NO.</span>
              <span className="text-[#FDF8F5]">042</span>
            </div>
            <div>
              <span className="block text-[#6E5555] mb-1">INGREDIENTS</span>
              <span className="text-[#FDF8F5]">LAB-GROWN</span>
            </div>
          </div>
        </div>

        {/* الصورة الرئيسية */}
        <div className="lg:col-span-7">
          <div className="w-full h-[580px] overflow-hidden rounded-[2px] border border-[#3D141A] shadow-2xl relative bg-[#0A0203]">
            <img 
              src={heroPerfume?.image} 
              alt={heroPerfume?.name || "AÊTRE Signature Perfume"} 
              className="w-full h-full object-cover object-center brightness-90 hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080203] via-transparent to-transparent opacity-80"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;