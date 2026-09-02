import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="relative bg-[#180508] text-[#EAE5DF] py-20 sm:py-24 px-5 sm:px-8 overflow-hidden border-t border-[#3D141A]">

      {/* Background */}
      <div className="absolute top-1/2 left-[-180px] -translate-y-1/2 w-80 h-80 bg-[#6D1F2D]/20 rounded-full blur-[110px]" />

      <div className="absolute top-0 right-[-100px] w-72 h-72 bg-[#E58080]/5 rounded-full blur-[100px]" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[#E58080] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

        {/* Text */}
        <div className="lg:col-span-6 space-y-4">

          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#E58080]" />

            <span className="text-[8px] tracking-[0.4em] uppercase text-[#D49A9A]">
              /05 STAY INSPIRED
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-tight text-[#FDF8F5]">
            Stories, offers
            <br />
            <span className="italic text-[#E58080]">
              & early access.
            </span>
          </h2>

          <p className="text-xs text-[#A89292] leading-6 max-w-md pt-2">
            Enter the private world of AÊTRE. Receive new scent stories,
            limited editions, and exclusive access before anyone else.
          </p>

        </div>

        {/* Form */}
        <div className="lg:col-span-6">

          {subscribed ? (
            <div className="border border-[#6D1F2D] bg-[#100306]/60 p-7 sm:p-9 text-center">

              <div className="w-12 h-12 mx-auto rounded-full border border-[#E58080] flex items-center justify-center mb-5">
                <span className="text-[#E58080]">
                  ✓
                </span>
              </div>

              <p className="font-serif text-xl text-[#FDF8F5]">
                Welcome to AÊTRE.
              </p>

              <p className="text-[9px] tracking-[0.2em] text-[#806F6F] mt-3">
                YOUR JOURNEY BEGINS HERE
              </p>

              <button
                onClick={() => setSubscribed(false)}
                className="mt-5 text-[8px] tracking-[0.25em] text-[#E58080] hover:text-[#FDF8F5] transition-colors cursor-pointer"
              >
                SUBSCRIBE ANOTHER EMAIL
              </button>

            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="border border-[#3D141A] bg-[#100306]/50 p-6 sm:p-8 backdrop-blur-sm"
            >

              <label className="text-[8px] tracking-[0.3em] text-[#A89292] uppercase block mb-5">
                Subscribe for inspiration and exclusive offers.
              </label>

              <div className="relative flex items-center border-b border-[#6D1F2D] pb-3 group">

                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-transparent text-xs w-full focus:outline-none placeholder-[#604C4C] text-[#FDF8F5] tracking-wide"
                />

                <button
                  type="submit"
                  className="group/arrow relative flex items-center justify-center w-10 h-10 text-[#E58080] hover:text-[#FDF8F5] transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <span className="text-xl group-hover/arrow:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </button>

                <span className="absolute bottom-[-1px] left-0 h-[1px] bg-[#E58080] w-0 group-focus-within:w-full transition-all duration-700" />

              </div>

              <div className="flex justify-between items-center mt-5">

                <p className="text-[7px] tracking-[0.18em] text-[#604C4C]">
                  NO NOISE. ONLY AÊTRE.
                </p>

                <span className="text-[7px] tracking-[0.2em] text-[#604C4C]">
                  PRIVATE / 01
                </span>

              </div>

            </form>
          )}

        </div>
      </div>
    </section>
  );
};

export default Newsletter;