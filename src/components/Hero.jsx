import React from "react";
import { products } from "../data/products";

const Hero = () => {
  const heroPerfume = products[0];

  return (
    <>
      <style>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(0.5deg); }
        }

        @keyframes heroGlow {
          0%, 100% { opacity: .18; transform: scale(1); }
          50% { opacity: .35; transform: scale(1.12); }
        }

        @keyframes heroLine {
          0% { transform: scaleX(0); transform-origin: left; }
          100% { transform: scaleX(1); transform-origin: left; }
        }

        @keyframes heroText {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .aetre-hero-text {
          animation: heroText 1s cubic-bezier(.22,1,.36,1) both;
        }

        .aetre-hero-bottle {
          animation: heroFloat 5s ease-in-out infinite;
        }

        .aetre-hero-glow {
          animation: heroGlow 5s ease-in-out infinite;
        }

        .aetre-hero-line {
          animation: heroLine 1.2s cubic-bezier(.22,1,.36,1) .4s both;
        }

        @media (prefers-reduced-motion: reduce) {
          .aetre-hero-text,
          .aetre-hero-bottle,
          .aetre-hero-glow,
          .aetre-hero-line {
            animation: none;
          }
        }
      `}</style>

      <section className="relative w-full min-h-[85vh] flex items-center justify-center py-16 sm:py-20 px-5 sm:px-12 border-b border-[#3D141A] overflow-hidden bg-[#080203]">

        {/* Ambient light */}
        <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#6D1F2D]/10 blur-[130px] pointer-events-none" />

        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* TEXT */}
          <div className="lg:col-span-6 space-y-7 sm:space-y-8 text-left order-2 lg:order-1 aetre-hero-text">

            <div className="inline-flex items-center gap-3">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-[#E58080] opacity-50 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[#E58080]" />
              </span>

              <span className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] uppercase text-[#D49A9A] font-light">
                EXTRAIT DE PARFUM / EDITION 01
              </span>
            </div>

            <div className="relative">
              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-serif leading-[.98] text-[#FDF8F5] tracking-wide">
                Sculpted in
                <br />
                <span className="italic font-light text-[#E58080]">
                  Shadows & Silk.
                </span>
              </h1>

              <div className="aetre-hero-line mt-5 w-24 h-[1px] bg-[#E58080]" />
            </div>

            <p className="text-base sm:text-xl font-serif italic text-[#C5B4B4] font-light leading-relaxed border-l border-[#E58080]/50 pl-4 max-w-xl">
              "A scent doesn’t just fill the air — it captures the essence of
              memories left behind."
            </p>

            <p className="text-xs sm:text-sm text-[#A89292] font-light leading-7 max-w-lg tracking-wide">
              An intoxicating blend of dark amber, smoked cardamom, and rare
              Madagascar vanilla. Designed to melt onto the skin and reveal a
              lingering, deeply personal aura throughout the day.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-5 sm:gap-6">

              <a
                href="#shop"
                className="group relative overflow-hidden px-7 sm:px-8 py-3.5 bg-[#2A080C] text-[#FDF8F5] border border-[#E58080]/50 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase transition-all duration-500 font-medium"
              >
                <span className="relative z-10">
                  EXPLORE THE SCENT
                </span>

                <span className="absolute inset-0 bg-[#6D1F2D] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </a>

              <span className="text-sm font-serif italic text-[#E58080]">
                $340
                <span className="text-[9px] uppercase font-sans text-[#6E5555] not-italic ml-1">
                  / 50ML
                </span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-7 sm:pt-8 border-t border-[#3D141A] text-[8px] sm:text-[9px] tracking-[0.2em] text-[#A89292] uppercase">

              <div>
                <span className="block text-[#6E5555] mb-1 font-semibold">
                  TOP NOTE
                </span>
                <span className="text-[#FDF8F5] font-light">
                  Cardamom
                </span>
              </div>

              <div>
                <span className="block text-[#6E5555] mb-1 font-semibold">
                  HEART
                </span>
                <span className="text-[#FDF8F5] font-light">
                  Smoked Amber
                </span>
              </div>

              <div>
                <span className="block text-[#6E5555] mb-1 font-semibold">
                  BASE
                </span>
                <span className="text-[#FDF8F5] font-light">
                  Bourbon Vanilla
                </span>
              </div>

            </div>
          </div>

          {/* PERFUME */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">

            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none h-[430px] sm:h-[560px] lg:h-[600px]">

              {/* glow */}
              <div className="aetre-hero-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full bg-[#6D1F2D]/25 blur-[100px]" />

              <div className="relative w-full h-full rounded-[2px] border border-[#3D141A] p-2 sm:p-3 bg-[#120305]/70 backdrop-blur-md shadow-[0_30px_100px_rgba(0,0,0,.5)]">

                <div className="w-full h-full overflow-hidden relative bg-[#0A0203] flex items-center justify-center">

                  {/* Decorative frame */}
                  <div className="absolute inset-5 border border-[#3D141A]/70 pointer-events-none z-10" />

                  <div className="absolute top-8 left-8 text-[7px] tracking-[0.3em] text-[#6E5555] z-20">
                    AÊTRE / 001
                  </div>

                  <div className="absolute bottom-8 right-8 text-[7px] tracking-[0.3em] text-[#6E5555] z-20">
                    PARFUM EXTRAIT
                  </div>

                  {heroPerfume?.image ? (
                    <img
                      src={heroPerfume.image}
                      alt={heroPerfume.name || "AÊTRE Perfume"}
                      className="aetre-hero-bottle relative z-[5] w-full h-full object-contain p-10 sm:p-14 drop-shadow-[0_30px_35px_rgba(0,0,0,.8)]"
                    />
                  ) : (
                    <div className="text-xs text-[#A89292] font-light tracking-widest uppercase">
                      AÊTRE NO. 01 L'OBSESSION
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#080203] via-transparent to-transparent opacity-70 pointer-events-none" />

                </div>

                {/* Limited badge */}
                <div className="absolute -bottom-4 -left-4 bg-[#180508] border border-[#3D141A] px-4 sm:px-5 py-3 backdrop-blur-md">
                  <span className="block text-[7px] uppercase tracking-[0.3em] text-[#E58080]">
                    LIMITED BATCH
                  </span>

                  <span className="text-[10px] sm:text-xs font-serif text-[#FDF8F5]">
                    100 BOTTLES PRODUCED
                  </span>
                </div>

                {/* Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 border border-[#3D141A] bg-[#100306] flex items-center justify-center">
                  <span className="font-serif italic text-[#E58080]">
                    01
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;