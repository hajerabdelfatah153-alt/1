import React, { useState } from "react";

const OrderTracking = () => {
  const [trackingId, setTrackingId] = useState("ATR-89420");
  const [searchedId, setSearchedId] = useState("ATR-89420");
  const [isSearching, setIsSearching] = useState(false);

  const activeStep = 3;

  const steps = [
    {
      id: 1,
      title: "ORDER PLACED",
      date: "SEP 01 · 10:30 AM",
      desc: "Your order has been confirmed and sent to our atelier.",
    },
    {
      id: 2,
      title: "BOTTLING & SEALING",
      date: "SEP 01 · 02:15 PM",
      desc: "Your fragrance was hand-filled, inspected and sealed.",
    },
    {
      id: 3,
      title: "IN TRANSIT",
      date: "SEP 02 · 09:00 AM",
      desc: "Your package has departed the Paris distribution center.",
    },
    {
      id: 4,
      title: "OUT FOR DELIVERY",
      date: "ESTIMATED TOMORROW",
      desc: "Your local courier will receive the package for final delivery.",
    },
    {
      id: 5,
      title: "DELIVERED",
      date: "PENDING",
      desc: "Your AÊTRE bottle arrives at your door.",
    },
  ];

  const handleTrack = (e) => {
    e.preventDefault();

    if (!trackingId.trim()) return;

    setIsSearching(true);

    setTimeout(() => {
      setSearchedId(trackingId.trim().toUpperCase());
      setIsSearching(false);
    }, 700);
  };

  return (
    <section className="min-h-[90vh] py-16 sm:py-20 px-5 sm:px-8 lg:px-10 max-w-6xl mx-auto">
      {/* HERO */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="w-8 h-px bg-[#6D1F2D]" />
          <span className="text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-[#E58080]">
            PRIVATE LOGISTICS
          </span>
          <span className="w-8 h-px bg-[#6D1F2D]" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-[#FDF8F5] leading-tight">
          Track Your{" "}
          <span className="italic text-[#E58080]">Essence.</span>
        </h1>

        <p className="mt-5 text-xs sm:text-sm text-[#A89292] max-w-lg mx-auto leading-7 font-light">
          Follow every stage of your AÊTRE fragrance journey, from our atelier
          to your door.
        </p>
      </div>

      {/* SEARCH */}
      <div className="max-w-xl mx-auto mb-12 sm:mb-16">
        <form
          onSubmit={handleTrack}
          className="relative flex flex-col sm:flex-row gap-2 sm:gap-0 p-1.5 border border-[#3D141A] bg-[#120305]/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
        >
          <div className="flex-1 flex items-center">
            <span className="hidden sm:block pl-4 pr-2 text-[#6D1F2D] text-sm">
              #
            </span>

            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="ENTER ORDER NUMBER"
              className="w-full bg-transparent px-4 sm:px-2 py-3.5 text-xs font-mono tracking-[0.15em] text-[#FDF8F5] uppercase focus:outline-none placeholder:text-[#594347]"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="sm:w-32 py-3.5 bg-[#2A080C] hover:bg-[#5A1822] border border-[#6D1F2D] text-[#E58080] text-[9px] tracking-[0.3em] uppercase transition-all duration-300 disabled:opacity-60"
          >
            {isSearching ? "SEARCHING" : "TRACK"}
          </button>
        </form>

        <div className="flex justify-between mt-3 px-1">
          <span className="text-[8px] tracking-[0.18em] text-[#594347] uppercase">
            Secure tracking
          </span>

          <span className="text-[8px] tracking-[0.18em] text-[#594347] uppercase">
            AÊTRE / 2026
          </span>
        </div>
      </div>

      {/* TRACKING CARD */}
      <div className="relative overflow-hidden border border-[#3D141A] bg-[#100306]/90 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.4)]">
        {/* Decorative glow */}
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-[#6D1F2D]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E58080]/5 blur-[110px] rounded-full pointer-events-none" />

        {/* Top information */}
        <div className="relative p-6 sm:p-8 md:p-10 border-b border-[#3D141A]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Order number */}
            <div>
              <span className="block text-[8px] tracking-[0.3em] text-[#6E5555] uppercase mb-2">
                ORDER REFERENCE
              </span>

              <div className="flex items-center gap-3">
                <span className="font-mono text-lg sm:text-xl tracking-[0.12em] text-[#FDF8F5]">
                  {searchedId}
                </span>

                <span className="px-2.5 py-1 border border-[#6D1F2D] bg-[#2A080C] text-[7px] tracking-[0.2em] text-[#E58080] uppercase">
                  IN TRANSIT
                </span>
              </div>
            </div>

            {/* Delivery */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-10">
              <div>
                <span className="block text-[8px] tracking-[0.25em] text-[#6E5555] uppercase mb-2">
                  DELIVERY
                </span>
                <span className="text-sm font-serif italic text-[#E58080]">
                  Sep 03, 2026
                </span>
              </div>

              <div>
                <span className="block text-[8px] tracking-[0.25em] text-[#6E5555] uppercase mb-2">
                  CARRIER
                </span>
                <span className="text-[10px] tracking-wider text-[#FDF8F5]">
                  DHL EXPRESS
                </span>
              </div>

              <div className="hidden sm:block">
                <span className="block text-[8px] tracking-[0.25em] text-[#6E5555] uppercase mb-2">
                  DESTINATION
                </span>
                <span className="text-[10px] tracking-wider text-[#FDF8F5]">
                  CAIRO, EGYPT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Current status */}
        <div className="relative p-6 sm:p-8 md:p-10 border-b border-[#3D141A]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[8px] tracking-[0.3em] text-[#6E5555] uppercase">
                CURRENT STATUS
              </span>

              <h2 className="mt-2 font-serif text-2xl sm:text-3xl text-[#FDF8F5]">
                In Transit
              </h2>

              <p className="mt-2 text-xs text-[#A89292]">
                Your fragrance is on its way to you.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E58080] opacity-40" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E58080]" />
              </span>

              <span className="text-[9px] tracking-[0.25em] text-[#E58080] uppercase">
                Live status
              </span>
            </div>
          </div>
        </div>

        {/* Product summary */}
        <div className="relative p-6 sm:p-8 md:p-10 border-b border-[#3D141A]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[8px] tracking-[0.3em] text-[#6E5555] uppercase">
                YOUR AÊTRE ESSENCE
              </span>

              <h3 className="mt-2 font-serif text-lg text-[#FDF8F5]">
                NO. 01 L'OBSESSION
              </h3>
            </div>

            <span className="text-[9px] tracking-[0.2em] text-[#A89292]">
              50 ML
            </span>
          </div>

          <div className="flex items-center gap-5 p-4 border border-[#3D141A] bg-[#0A0203]/50">
            <div className="w-16 h-20 sm:w-20 sm:h-24 bg-[#140407] border border-[#3D141A] flex items-center justify-center overflow-hidden">
              <div className="w-8 h-14 sm:w-10 sm:h-16 border border-[#6D1F2D] bg-[#180508] flex items-center justify-center">
                <span className="text-[5px] tracking-[0.15em] text-[#E58080] rotate-90 whitespace-nowrap">
                  AÊTRE
                </span>
              </div>
            </div>

            <div className="flex-1">
              <p className="text-[10px] sm:text-xs text-[#C5B4B4] leading-6">
                Black Amber, Smoked Cardamom & Vanilla
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
                <span className="text-[8px] tracking-[0.15em] text-[#6E5555] uppercase">
                  QTY · 1
                </span>

                <span className="text-[8px] tracking-[0.15em] text-[#6E5555] uppercase">
                  EDITION 01
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative p-6 sm:p-8 md:p-10">
          <div className="mb-8">
            <span className="text-[8px] tracking-[0.3em] text-[#6E5555] uppercase">
              JOURNEY
            </span>

            <h3 className="mt-2 font-serif text-xl text-[#FDF8F5]">
              Your fragrance, in motion.
            </h3>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] sm:left-[15px] top-3 bottom-3 w-px bg-[#3D141A]" />

            <div
              className="absolute left-[11px] sm:left-[15px] top-3 w-px bg-[#E58080] transition-all duration-1000"
              style={{
                height: `${((activeStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />

            <div className="space-y-8 sm:space-y-10">
              {steps.map((step) => {
                const isDone = step.id <= activeStep;
                const isCurrent = step.id === activeStep;

                return (
                  <div
                    key={step.id}
                    className="relative flex gap-5 sm:gap-7"
                  >
                    {/* Step indicator */}
                    <div
                      className={`relative z-10 flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                        isDone
                          ? "border-[#E58080] bg-[#2A080C] text-[#E58080]"
                          : "border-[#3D141A] bg-[#0A0203] text-[#594347]"
                      } ${
                        isCurrent
                          ? "shadow-[0_0_25px_rgba(229,128,128,0.3)]"
                          : ""
                      }`}
                    >
                      {isDone ? (
                        <span className="text-[10px]">✓</span>
                      ) : (
                        <span className="text-[8px] font-mono">
                          {step.id}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 pb-1 transition-opacity duration-500 ${
                        isDone ? "opacity-100" : "opacity-45"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-3">
                            <h4
                              className={`font-serif text-sm sm:text-base tracking-[0.08em] ${
                                isCurrent
                                  ? "text-[#E58080]"
                                  : isDone
                                  ? "text-[#FDF8F5]"
                                  : "text-[#6E5555]"
                              }`}
                            >
                              {step.title}
                            </h4>

                            {isCurrent && (
                              <span className="hidden sm:inline-block text-[6px] tracking-[0.2em] px-2 py-1 bg-[#2A080C] border border-[#6D1F2D] text-[#E58080]">
                                CURRENT
                              </span>
                            )}
                          </div>

                          <p className="mt-2 text-[10px] sm:text-xs text-[#A89292] leading-6 max-w-xl">
                            {step.desc}
                          </p>
                        </div>

                        <span
                          className={`font-mono text-[8px] tracking-[0.12em] whitespace-nowrap ${
                            isCurrent
                              ? "text-[#E58080]"
                              : "text-[#6E5555]"
                          }`}
                        >
                          {step.date}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="relative px-6 sm:px-8 md:px-10 py-5 border-t border-[#3D141A] bg-[#0A0203]/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-[8px] sm:text-[9px] tracking-[0.12em] text-[#6E5555] uppercase leading-5">
              Estimated delivery may vary depending on local courier conditions.
            </p>

            <span className="text-[8px] tracking-[0.2em] text-[#E58080] uppercase whitespace-nowrap">
              AÊTRE · PRIVATE LOGISTICS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderTracking;