import React, { useState } from "react";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !message.trim()) return;

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setMessage("");
    }, 3000);
  };

  return (
    <section className="relative py-28 px-6 overflow-hidden bg-[#080203] border-t border-[#3D141A]">
      <div className="absolute top-10 left-[-180px] w-96 h-96 bg-[#6D1F2D]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="absolute bottom-10 right-[-180px] w-96 h-96 bg-[#6D1F2D]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center">
        <p className="text-[9px] tracking-[0.5em] text-[#E58080] mb-5">
          YOUR EXPERIENCE
        </p>

        <h2 className="text-4xl md:text-5xl font-serif text-[#FDF8F5]">
          Tell us what you
          <br />
          <span className="italic text-[#E58080]">think.</span>
        </h2>

        <p className="text-xs text-[#806F6F] mt-5 mb-10">
          Your experience helps shape the world of AÊTRE.
        </p>

        {submitted ? (
          <div className="border border-[#3D141A] bg-[#100306] py-10">
            <div className="text-3xl text-[#E58080] mb-4">✦</div>

            <p className="text-[#E58080] text-xs tracking-[0.3em]">
              THANK YOU FOR YOUR FEEDBACK.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <p className="text-[9px] tracking-[0.3em] text-[#806F6F] mb-4">
                RATE YOUR EXPERIENCE
              </p>

              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl transition-all duration-300 cursor-pointer ${
                      star <= rating
                        ? "text-[#E58080] scale-110"
                        : "text-[#3D141A] hover:text-[#7D2735]"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="SHARE YOUR EXPERIENCE..."
              rows="5"
              className="w-full resize-none bg-[#100306] border border-[#3D141A] px-5 py-4 text-[10px] tracking-[0.15em] text-[#FDF8F5] placeholder-[#705D5D] focus:outline-none focus:border-[#E58080] transition-colors"
            />

            <button
              type="submit"
              className="w-full bg-[#6D1F2D] hover:bg-[#7D2735] text-[#FDF8F5] py-4 text-[9px] tracking-[0.3em] transition-all cursor-pointer"
            >
              SUBMIT FEEDBACK
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Feedback;