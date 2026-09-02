import React from 'react';

const Ritual = () => {
  return (
    <section className="bg-[#EAE5DF] text-[#1C1B1A] py-20 border-t border-[#D5CE8]/60">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* الصورة جهة اليسار */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="h-[420px] rounded-sm overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800" 
              alt="AETRE Bottle" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-[420px] rounded-sm overflow-hidden bg-[#1C1B1A] flex flex-col justify-center items-center text-[#EAE5DF] p-6 text-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">LIMITED EDITION</span>
            <h3 className="text-3xl font-serif mb-2">AÊTRE</h3>
            <p className="text-xl font-serif italic text-[#D5CE8]">NO. 042</p>
          </div>
        </div>

        {/* معلومات التجربة جهة اليمين */}
        <div className="lg:col-span-6 space-y-8 pl-0 lg:pl-8">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500 font-medium block mb-2">
              /04 THE RITUAL
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-normal">
              More Than <br />
              a <span className="italic text-[#8C2A1C]">Fragrance.</span>
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed font-light mt-4 max-w-sm">
              A ritual of the unseen. An intimate moment that stays long after you've gone.
            </p>
          </div>

          {/* المميزات الرئيسية */}
          <div className="space-y-6 border-t border-b border-[#D5CE8]/80 py-6">
            <div className="flex items-start gap-4">
              <div className="text-sm">⊙</div>
              <div>
                <h4 className="text-xs tracking-wider uppercase font-medium">LONG-LASTING</h4>
                <p className="text-[11px] text-gray-500 font-light">Formulated to last all day and into the night.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-sm">⊛</div>
              <div>
                <h4 className="text-xs tracking-wider uppercase font-medium">CLEAN & CONSCIOUS</h4>
                <p className="text-[11px] text-gray-500 font-light">Lab-grown ingredients. Vegan, Cruelty-free.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-sm">◈</div>
              <div>
                <h4 className="text-xs tracking-wider uppercase font-medium">UNIQUELY YOURS</h4>
                <p className="text-[11px] text-gray-500 font-light">Each batch is crafted in limited quantities.</p>
              </div>
            </div>
          </div>

          <div>
            <a 
              href="#shop" 
              className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-medium border-b border-black pb-1 hover:opacity-50 transition-opacity"
            >
              SHOP THE COLLECTION <span className="text-sm">→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Ritual;