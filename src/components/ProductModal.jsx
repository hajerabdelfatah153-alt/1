import React, {
  useEffect,
  useState,
} from "react";

const ProductModal = ({
  product,
  onClose,
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = wishlist.some(
    (item) => item.id === product?.id
  );

  useEffect(() => {
    if (product) {
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [product, onClose]);

  useEffect(() => {
    if (!product) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-xl p-0 sm:p-4 animate-[fadeIn_0.35s_ease-out]"
      onClick={onClose}
    >

      <div
        className="relative w-full max-w-6xl h-full sm:h-auto sm:max-h-[94vh] overflow-y-auto bg-[#0D0305] border-0 sm:border border-[#3D141A] shadow-[0_0_120px_rgba(109,31,45,0.35)] animate-[modalLuxury_0.55s_cubic-bezier(0.22,1,0.36,1)]"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* CLOSE */}

        <button
          onClick={onClose}
          aria-label="Close product"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 border border-[#3D141A] bg-[#100306]/90 backdrop-blur-md text-[#806F6F] hover:text-[#FDF8F5] hover:border-[#E58080] hover:bg-[#3D141A] transition-all duration-300 cursor-pointer"
        >
          <span className="text-lg">
            ×
          </span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* IMAGE */}

          <div className="relative min-h-[430px] sm:min-h-[560px] lg:min-h-[700px] bg-[#080203] flex items-center justify-center overflow-hidden">

            <div className="absolute w-[260px] h-[260px] sm:w-[460px] sm:h-[460px] rounded-full bg-[#6D1F2D]/20 blur-[110px] animate-[luxuryGlow_5s_ease-in-out_infinite]" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(109,31,45,0.16),transparent_62%)]" />

            <div className="absolute top-8 left-8 w-20 h-20 border-l border-t border-[#3D141A]" />

            <div className="absolute bottom-8 right-8 w-20 h-20 border-r border-b border-[#3D141A]" />

            <div className="absolute top-10 right-10 text-[7px] tracking-[0.35em] text-[#604C4C] [writing-mode:vertical-rl]">
              AÊTRE / PRIVATE COLLECTION
            </div>

            <img
              src={product.image}
              alt={product.name}
              className="relative z-10 w-full h-full max-h-[680px] object-contain p-10 sm:p-14 lg:p-16 transition-transform duration-[1500ms] ease-out hover:scale-[1.06] drop-shadow-[0_30px_55px_rgba(0,0,0,0.8)]"
            />

            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080203] to-transparent pointer-events-none" />

            <div className="absolute bottom-7 left-7 z-20 border border-[#3D141A] bg-[#100306]/85 backdrop-blur-md px-4 py-3">

              <p className="text-[7px] tracking-[0.35em] text-[#705D5D] mb-1">
                EXTRAIT DE PARFUM
              </p>

              <p className="text-[8px] tracking-[0.25em] text-[#E58080]">
                50 ML — EDP
              </p>

            </div>
          </div>

          {/* DETAILS */}

          <div className="p-6 sm:p-9 md:p-11 lg:p-14 flex flex-col bg-[#0D0305]">

            <div className="mb-7">

              <div className="flex items-center gap-3">

                <span className="w-1.5 h-1.5 rounded-full bg-[#E58080] shadow-[0_0_14px_rgba(229,128,128,0.7)]" />

                <span className="text-[8px] tracking-[0.45em] text-[#E58080] uppercase">
                  AÊTRE / {product.category || "UNISEX"}
                </span>

              </div>

              <div className="w-16 h-px bg-[#6D1F2D] mt-5" />

            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-wide text-[#FDF8F5] leading-[1.05]">
              {product.name}
            </h2>

            <div className="flex items-end gap-3 mt-5">

              <p className="text-2xl sm:text-3xl font-serif italic text-[#E58080]">
                ${product.price}
              </p>

              <span className="text-[8px] tracking-[0.25em] text-[#604C4C] mb-1">
                50 ML
              </span>

            </div>

            <p className="text-xs sm:text-sm text-[#806F6F] leading-7 mt-6 max-w-xl">
              A meticulously crafted composition
              designed to leave an unforgettable
              presence. Every note unfolds slowly,
              revealing a deeply personal signature
              on the skin.
            </p>

            {/* NOTES */}

            <div className="mt-8 border-y border-[#3D141A] py-7">

              <div className="flex items-center justify-between mb-6">

                <p className="text-[8px] tracking-[0.4em] text-[#E58080]">
                  FRAGRANCE NOTES
                </p>

                <span className="text-[7px] tracking-[0.25em] text-[#604C4C]">
                  COMPOSITION 01
                </span>

              </div>

              <div className="flex items-start gap-4">

                <div className="w-1 h-11 bg-[#6D1F2D]" />

                <div>

                  <p className="text-[7px] tracking-[0.3em] text-[#705D5D] mb-2">
                    SIGNATURE NOTES
                  </p>

                  <p className="text-sm sm:text-base font-serif italic text-[#C5B4B4] leading-6">
                    {product.notes}
                  </p>

                </div>

              </div>
            </div>

            {/* PERFORMANCE */}

            <div className="grid grid-cols-2 gap-3 mt-6">

              <div className="border border-[#3D141A] bg-[#100306] p-5 hover:border-[#6D1F2D] hover:-translate-y-1 transition-all duration-300">

                <p className="text-[7px] tracking-[0.3em] text-[#705D5D] mb-3">
                  LONGEVITY
                </p>

                <div className="flex items-end justify-between">

                  <p className="text-sm font-serif text-[#FDF8F5]">
                    12+ HOURS
                  </p>

                  <span className="text-[7px] text-[#E58080]">
                    ●●●●
                  </span>

                </div>
              </div>

              <div className="border border-[#3D141A] bg-[#100306] p-5 hover:border-[#6D1F2D] hover:-translate-y-1 transition-all duration-300">

                <p className="text-[7px] tracking-[0.3em] text-[#705D5D] mb-3">
                  SILLAGE
                </p>

                <div className="flex items-end justify-between">

                  <p className="text-sm font-serif text-[#FDF8F5]">
                    HEAVY
                  </p>

                  <span className="text-[7px] text-[#E58080]">
                    ●●●●
                  </span>

                </div>
              </div>

            </div>

            {/* QUANTITY */}

            <div className="flex items-center justify-between mt-7">

              <div>

                <p className="text-[8px] tracking-[0.3em] text-[#806F6F]">
                  QUANTITY
                </p>

                <p className="text-[7px] tracking-[0.2em] text-[#4F3A3A] mt-1">
                  SELECT YOUR EDITION
                </p>

              </div>

              <div className="flex items-center border border-[#3D141A] bg-[#100306]">

                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.max(1, prev - 1)
                    )
                  }
                  className="w-11 h-11 text-[#A89292] hover:text-[#E58080] hover:bg-[#180508] transition-all cursor-pointer"
                >
                  −
                </button>

                <span className="w-11 text-center text-sm font-serif text-[#FDF8F5]">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(
                      (prev) => prev + 1
                    )
                  }
                  className="w-11 h-11 text-[#A89292] hover:text-[#E58080] hover:bg-[#180508] transition-all cursor-pointer"
                >
                  +
                </button>

              </div>
            </div>

            {/* ACTIONS */}

            <div className="flex gap-3 mt-7">

              <button
                onClick={handleAddToCart}
                className="relative overflow-hidden flex-1 py-4 bg-[#6D1F2D] hover:bg-[#7D2735] text-[#FDF8F5] border border-[#7D2735] text-[8px] sm:text-[9px] tracking-[0.3em] uppercase transition-all duration-300 cursor-pointer hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(61,20,26,0.25)]"
              >
                ADD TO COLLECTION
              </button>

              <button
                onClick={() =>
                  onToggleWishlist?.(
                    product
                  )
                }
                className={`w-14 sm:w-16 border flex items-center justify-center text-xl transition-all duration-300 cursor-pointer ${
                  isWishlisted
                    ? "border-[#E58080] text-[#E58080] bg-[#3D141A]"
                    : "border-[#3D141A] text-[#806F6F] hover:border-[#E58080] hover:text-[#E58080] hover:bg-[#180508]"
                }`}
              >
                {isWishlisted
                  ? "♥"
                  : "♡"}
              </button>

            </div>

            {/* TRUST */}

            <div className="grid grid-cols-3 gap-3 mt-7 pt-6 border-t border-[#3D141A]">

              <div className="text-center">

                <p className="text-[7px] tracking-[0.2em] text-[#E58080] mb-2">
                  50 ML
                </p>

                <p className="text-[7px] tracking-[0.15em] text-[#604C4C]">
                  EDP
                </p>

              </div>

              <div className="text-center border-x border-[#3D141A]">

                <p className="text-[7px] tracking-[0.2em] text-[#E58080] mb-2">
                  PREMIUM
                </p>

                <p className="text-[7px] tracking-[0.15em] text-[#604C4C]">
                  FORMULA
                </p>

              </div>

              <div className="text-center">

                <p className="text-[7px] tracking-[0.2em] text-[#E58080] mb-2">
                  AÊTRE
                </p>

                <p className="text-[7px] tracking-[0.15em] text-[#604C4C]">
                  SIGNATURE
                </p>

              </div>

            </div>

            <div className="mt-7 text-center">

              <p className="text-[7px] tracking-[0.35em] text-[#4F3A3A]">
                CRAFTED FOR THOSE WHO CHOOSE PRESENCE
              </p>

            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalLuxury {
          from {
            opacity: 0;
            transform: translateY(35px) scale(0.96);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes luxuryGlow {
          0%, 100% {
            transform: scale(0.95);
            opacity: 0.55;
          }

          50% {
            transform: scale(1.08);
            opacity: 0.9;
          }
        }
      `}</style>

    </div>
  );
};

export default ProductModal;