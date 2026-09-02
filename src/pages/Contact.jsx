import React from 'react';

const Contact = () => {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen px-8 md:px-16 py-16 text-[var(--text-primary)]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs uppercase text-[#D4AF37] tracking-[0.3em]">GET IN TOUCH</span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#F4E07B] tracking-widest uppercase mt-2">
            تواصل معنا
          </h1>
          <p className="text-gray-400 text-sm mt-4 font-light">
            فريق خدمة العملاء متواجد لمساعدتك في اختيار المنتجات والرد على كافة استفساراتك.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="bg-[var(--bg-card)] border border-[var(--border-color)] p-8 rounded-lg shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase text-[#D4AF37] tracking-wider mb-2">الاسم الكامل</label>
              <input 
                type="text" 
                placeholder="أدخل اسمك"
                className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] px-4 py-3 text-sm rounded focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-[#D4AF37] tracking-wider mb-2">البريد الإلكتروني</label>
              <input 
                type="email" 
                placeholder="example@domain.com"
                className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] px-4 py-3 text-sm rounded focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase text-[#D4AF37] tracking-wider mb-2">موضوع الرسالة</label>
            <input 
              type="text" 
              placeholder="عن أي قسم تستفسر؟"
              className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] px-4 py-3 text-sm rounded focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-[#D4AF37] tracking-wider mb-2">الرسالة</label>
            <textarea 
              rows="5"
              placeholder="اكتب رسالتك هنا..."
              className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] px-4 py-3 text-sm rounded focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#D4AF37] text-black font-bold py-3.5 uppercase text-xs tracking-widest hover:bg-[#F4E07B] transition-colors duration-300 cursor-pointer"
          >
            إرسال الرسالة
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;