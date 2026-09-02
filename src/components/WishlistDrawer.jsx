import React, {
  useEffect,
} from "react";

const WishlistDrawer = ({
  isOpen,
  onClose,
  wishlist = [],
  onRemove,
  onAddToCart,
}) => {

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-md"
      onClick={onClose}
    >

      <div
        className="absolute top-0 right-0 w-full sm:max-w-md h-full bg-[#0D0305] border-l border-[#3D141A] shadow-[-20px_0_80px_rgba(0,0,0,0.5)] animate-[wishlistSlide_0.45s_cubic-bezier(0.22,1,0.36,1)]"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="relative p-6 sm:p-7 border-b border-[#3D141A]">

          <div className="absolute top-0 left-0 w-20 h-px bg-[#6D1F2D]" />

          <div className="flex justify-between items-start">

            <div>

              <p className="text-[8px] tracking-[0.4em] text-[#E58080] mb-2">
                AÊTRE / PRIVATE
              </p>

              <h2 className="text-xl sm:text-2xl font-serif tracking-[0.15em] text-[#FDF8F5]">
                MY WISHLIST
              </h2>

              <p className="text-[7px] tracking-[0.2em] text-[#604C4C] mt-3">
                {wishlist.length} {wishlist.length === 1 ? "PIECE" : "PIECES"} SAVED
              </p>

            </div>

            <button
              onClick={onClose}
              aria-label="Close wishlist"
              className="w-10 h-10 border border-[#3D141A] text-[#806F6F] hover:text-[#E58080] hover:border-[#E58080] transition-all cursor-pointer"
            >
              ×
            </button>

          </div>
        </div>

        {/* CONTENT */}

        <div className="h-[calc(100%-105px)] overflow-y-auto p-5 sm:p-6">

          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">

              <div className="relative w-24 h-24 flex items-center justify-center mb-7">

                <div className="absolute inset-0 border border-[#3D141A] rotate-45" />

                <span className="relative text-4xl text-[#6D1F2D]">
                  ♡
                </span>

              </div>

              <p className="text-[9px] tracking-[0.35em] text-[#806F6F]">
                YOUR WISHLIST IS EMPTY
              </p>

              <p className="text-[7px] tracking-[0.2em] text-[#4F3A3A] mt-3 max-w-[220px] leading-5">
                Discover a fragrance that
                feels entirely yours.
              </p>

              <button
                onClick={onClose}
                className="mt-7 border border-[#6D1F2D] px-6 py-3 text-[8px] tracking-[0.25em] text-[#E58080] hover:bg-[#6D1F2D] hover:text-white transition-all cursor-pointer"
              >
                DISCOVER COLLECTION
              </button>

            </div>
          ) : (

            <div className="space-y-4">

              {wishlist.map((item) => (

                <div
                  key={item.id}
                  className="group relative border border-[#3D141A] bg-[#100306] p-4 hover:border-[#6D1F2D] transition-all duration-300"
                >

                  <div className="flex gap-4">

                    <div className="relative w-24 h-24 shrink-0 bg-[#080203] overflow-hidden">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-110"
                      />

                    </div>

                    <div className="flex-1 min-w-0">

                      <p className="text-[7px] tracking-[0.3em] text-[#705D5D] mb-2">
                        {item.category || "UNISEX"}
                      </p>

                      <h3 className="font-serif text-sm text-[#FDF8F5] leading-5">
                        {item.name}
                      </h3>

                      <p className="text-[#E58080] text-sm font-serif mt-2">
                        ${item.price}
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        onRemove(item.id)
                      }
                      aria-label="Remove"
                      className="absolute top-3 right-3 text-[#4F3A3A] hover:text-[#E58080] transition-colors cursor-pointer"
                    >
                      ×
                    </button>

                  </div>

                  <div className="flex gap-3 mt-4 pt-4 border-t border-[#3D141A]">

                    <button
                      onClick={() => {
                        onAddToCart(item);
                        onRemove(item.id);
                      }}
                      className="flex-1 border border-[#6D1F2D] py-2.5 text-[7px] tracking-[0.25em] text-[#E58080] hover:bg-[#6D1F2D] hover:text-[#FDF8F5] transition-all cursor-pointer"
                    >
                      ADD TO BAG
                    </button>

                    <button
                      onClick={() =>
                        onRemove(item.id)
                      }
                      className="px-3 text-[7px] tracking-[0.2em] text-[#604C4C] hover:text-[#E58080] transition-colors cursor-pointer"
                    >
                      REMOVE
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>
      </div>

      <style>{`
        @keyframes wishlistSlide {
          from {
            opacity: 0;
            transform: translateX(100%);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

    </div>
  );
};

export default WishlistDrawer;