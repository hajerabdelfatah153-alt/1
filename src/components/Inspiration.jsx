import React from 'react';

const Inspiration = () => {
  return (
    <section className="bg-[#E8E3DD] text-[#1A1A1A] py-20 border-b border-[#D8D2C9]">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* النص الجانبي */}
        <div className="lg:col-span-4 flex flex-col justify-between py-2 space-y-6">
          <div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-gray-500 font-semibold block mb-6">
              /02 THE INSPIRATION
            </span>
            <h2 className="text-4xl md:text-5xl font-serif leading-[1.08] font-normal mb-6">
              Born from <br />
              <span className="italic">Contradictions.</span>
            </h2>
            <p className="text-[11px] text-gray-600 leading-relaxed font-light max-w-xs">
              Where raw earth meets delicate bloom. Each note a memory — intangible, yet unforgettable.
            </p>
          </div>

          <div className="pt-4">
            <a 
              href="#philosophy" 
              className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-semibold border-b border-[#1A1A1A] pb-1 hover:opacity-40 transition-opacity"
            >
              OUR PHILOSOPHY <span className="text-xs">→</span>
            </a>
          </div>
        </div>

        {/* شبكة الصور الثلاث المتتالية */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="h-[360px] overflow-hidden rounded-[2px] bg-black">
            <img 
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600" 
              alt="Floral Detail" 
              className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="h-[360px] overflow-hidden rounded-[2px] bg-black">
            <img 
              src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600" 
              alt="Stone Texture" 
              className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="h-[360px] overflow-hidden rounded-[2px] bg-black">
            <img 
              src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=600" 
              alt="Smoke Texture" 
              className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Inspiration;