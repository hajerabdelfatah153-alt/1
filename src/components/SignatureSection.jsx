import React from "react";

const SignatureSection = () => {
  return (
    <>
      <style>{`
        @keyframes signatureRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes signaturePulse {
          0%, 100% { opacity: .15; }
          50% { opacity: .35; }
        }

        .aetre-signature-ring {
          animation: signatureRotate 25s linear infinite;
        }

        .aetre-signature-glow {
          animation: signaturePulse 5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .aetre-signature-ring,
          .aetre-signature-glow {
            animation: none;
          }
        }
      `}</style>

      <section className="relative py-24 sm:py-28 md:py-36 px-5 sm:px-6 overflow-hidden bg-[#080203] border-y border-[#3D141A]">

        {/* Background */}
        <div className="aetre-signature-glow absolute top-1/2 left-[-220px] -translate-y-1/2 w-[500px] h-[500px] bg-[#6D1F2D] rounded-full blur-[140px] pointer-events-none" />

        <div className="aetre-signature-glow absolute top-1/2 right-[-220px] -translate-y-1/2 w-[500px] h-[500px] bg-[#6D1F2D] rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24 items-center">

          {/* TEXT */}
          <div>

            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#E58080]" />

              <p className="text-[8px] tracking-[0.5em] text-[#E58080]">
                THE AÊTRE SIGNATURE
              </p>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight text-[#FDF8F5]">
              More than
              <br />
              <span className="italic text-[#E58080]">
                a fragrance.
              </span>
            </h2>

            <div className="w-16 h-[1px] bg-[#6D1F2D] my-8" />

            <p className="text-sm md:text-base text-[#A89292] leading-8 max-w-lg">
              AÊTRE was created around a simple belief: fragrance should feel
              like an extension of who you are.
            </p>

            <p className="text-sm md:text-base text-[#806F6F] leading-8 max-w-lg mt-5">
              Every composition is designed to evolve slowly on the skin —
              revealing different layers, different moods, and a different
              version of you.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 pt-8 border-t border-[#3D141A]">

              <div>
                <p className="text-xl font-serif text-[#E58080]">01</p>
                <p className="text-[7px] sm:text-[8px] tracking-[0.2em] text-[#705D5D] mt-2">
                  PRESENCE
                </p>
              </div>

              <div>
                <p className="text-xl font-serif text-[#E58080]">02</p>
                <p className="text-[7px] sm:text-[8px] tracking-[0.2em] text-[#705D5D] mt-2">
                  MEMORY
                </p>
              </div>

              <div>
                <p className="text-xl font-serif text-[#E58080]">03</p>
                <p className="text-[7px] sm:text-[8px] tracking-[0.2em] text-[#705D5D] mt-2">
                  IDENTITY
                </p>
              </div>

            </div>
          </div>

          {/* VISUAL */}
          <div className="relative">

            <div className="relative border border-[#3D141A] bg-[#100306] p-3 sm:p-5">

              <div className="relative border border-[#3D141A] min-h-[420px] sm:min-h-[500px] md:min-h-[520px] flex flex-col items-center justify-center text-center px-6 sm:px-8 overflow-hidden">

                {/* Rotating ring */}
                <div className="aetre-signature-ring absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-[#3D141A]/60">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#E58080] rounded-full" />
                </div>

                <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-[#6D1F2D]/40" />

                {/* Logo */}
                <div className="relative z-10 w-20 h-20 rounded-full border border-[#6D1F2D] bg-[#100306] flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(109,31,45,.2)]">
                  <span className="font-serif italic text-3xl text-[#E58080]">
                    A
                  </span>
                </div>

                <p className="relative z-10 text-[8px] tracking-[0.5em] text-[#705D5D] mb-5">
                  A PRIVATE ANTHOLOGY
                </p>

                <h3 className="relative z-10 text-3xl md:text-4xl font-serif text-[#FDF8F5] tracking-[0.15em]">
                  AÊTRE
                </h3>

                <p className="relative z-10 text-xs text-[#806F6F] leading-6 max-w-sm mt-6">
                  Crafted in darkness.
                  <br />
                  Remembered in light.
                </p>

                <div className="relative z-10 mt-10 text-[7px] sm:text-[8px] tracking-[0.35em] text-[#E58080]">
                  EXTRACT • ELEVATE • EXIST
                </div>

              </div>
            </div>

            <div className="absolute -bottom-5 -right-3 sm:-right-5 border border-[#3D141A] bg-[#180508] px-5 py-3">
              <span className="text-[7px] tracking-[0.3em] text-[#E58080]">
                EST. 2026
              </span>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default SignatureSection;