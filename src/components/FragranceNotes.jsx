import React from 'react';

const FragranceNotes = () => {
  const notes = [
    {
      step: "TOP",
      title: "Cardamom",
      desc: "Spicy, fresh, awakening.",
      img: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=600"
    },
    {
      step: "HEART",
      title: "Smoked Wood",
      desc: "Deep, resinous, mysterious.",
      img: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=600"
    },
    {
      step: "BASE",
      title: "White Musk",
      desc: "Soft, clean, endlessly lingering.",
      img: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600"
    }
  ];

  return (
    <section className="bg-[#121212] text-[#E8E3DD] py-24 px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* العنوان الجانبي */}
        <div className="lg:col-span-4 space-y-6">
          <span className="text-[9px] tracking-[0.35em] uppercase text-gray-400 font-semibold block">
            /03 THE NOTES
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-normal leading-[1.08]">
            A Journey <br />
            in <span className="italic font-light">Three Acts.</span>
          </h2>
          <p className="text-[11px] text-gray-400 leading-relaxed font-light max-w-xs">
            Layers that evolve. A scent that becomes you.
          </p>
          <div className="pt-4">
            <button className="text-[10px] tracking-[0.3em] uppercase border-b border-gray-400 pb-1 hover:text-white transition-colors flex items-center gap-3">
              VIEW FULL INGREDIENTS <span className="text-xs">→</span>
            </button>
          </div>
        </div>

        {/* كروت النوتات الثلاث */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {notes.map((item, index) => (
            <div key={index} className="space-y-4 group cursor-pointer">
              <div className="h-72 overflow-hidden rounded-[2px] bg-gray-900">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-75 group-hover:opacity-100"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[8px] uppercase tracking-[0.25em] text-gray-400 block font-semibold">{item.step}</span>
                <h3 className="font-serif text-xl tracking-wide">{item.title}</h3>
                <p className="text-[11px] text-gray-400 font-light">{item.desc}</p>
                <div className="pt-1 text-gray-500 font-light text-base">+</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FragranceNotes;