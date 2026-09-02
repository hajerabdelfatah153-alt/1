import React from "react";
import { products } from "../data/products";

const BestSellers = ({
  onSelectProduct,
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
}) => {
  const bestSellers = products.slice(0, 4);

  return (
    <>
      <style>{`
        @keyframes bestsellerGlow {
          0%, 100% { opacity: .15; }
          50% { opacity: .28; }
        }

        .aetre-best-glow {
          animation: bestsellerGlow 5s ease-in-out infinite;
        }
      `}</style>

      <section className="relative py-24 sm:py-28 px-5 sm:px-6 bg-[#100306] overflow-hidden">

        <div className="aetre-best-glow absolute left-[-180px] top-1/2 -translate-y-1/2 w-96 h-96 bg-[#6D1F2D] rounded-full blur-[130px] pointer-events-none" />

        <div className="absolute right-[-200px] top-[-100px] w-80 h-80 bg-[#E58080]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-[#E58080]" />

                <p className="text-[8px] tracking-[0.5em] text-[#E58080]">
                  MOST DESIRED
                </p>
              </div>

              <h2 className="text-4xl sm:text-5xl font-serif text-[#FDF8F5]">
                The{" "}
                <span className="italic text-[#E58080]">
                  AÊTRE Icons.
                </span>
              </h2>
            </div>

            <p className="text-xs text-[#705D5D] max-w-sm leading-6 md:text-right">
              The fragrances that define the AÊTRE signature and continue to
              be discovered again and again.
            </p>

          </div>

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {bestSellers.map((product, index) => {

              const isWishlisted = wishlist.some(
                (item) => item.id === product.id
              );

              return (
                <article
                  key={product.id}
                  className="group relative border border-[#3D141A] bg-[#080203] overflow-hidden hover:border-[#6D1F2D] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(61,20,26,.35)]"
                >

                  {/* Number */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="text-[8px] tracking-[0.2em] text-[#705D5D]">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => onToggleWishlist?.(product)}
                    aria-label={
                      isWishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    className={`absolute top-4 right-4 z-20 w-9 h-9 border transition-all duration-300 cursor-pointer ${
                      isWishlisted
                        ? "border-[#E58080] text-[#E58080] bg-[#3D141A]"
                        : "border-[#3D141A] text-[#806F6F] hover:border-[#E58080] hover:text-[#E58080]"
                    }`}
                  >
                    {isWishlisted ? "♥" : "♡"}
                  </button>

                  {/* Image */}
                  <button
                    onClick={() => onSelectProduct?.(product)}
                    className="w-full cursor-pointer text-left"
                  >
                    <div className="relative h-[300px] sm:h-[320px] bg-[#0A0203] flex items-center justify-center overflow-hidden">

                      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(109,31,45,.15),transparent_65%)]" />

                      <img
                        src={product.image}
                        alt={product.name}
                        className="relative z-10 w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-1000 ease-out drop-shadow-[0_20px_20px_rgba(0,0,0,.7)]"
                      />

                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#080203] to-transparent opacity-80" />

                      {/* Hover label */}
                      <div className="absolute inset-x-0 bottom-5 flex justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20 pointer-events-none">
                        <span className="border border-[#6D1F2D] bg-[#100306]/90 backdrop-blur-md px-4 py-2 text-[7px] tracking-[0.3em] text-[#E58080]">
                          DISCOVER
                        </span>
                      </div>

                    </div>

                    {/* Info */}
                    <div className="p-5">

                      <p className="text-[8px] tracking-[0.3em] text-[#E58080] mb-3">
                        {product.category || "UNISEX"}
                      </p>

                      <h3 className="font-serif text-base text-[#FDF8F5] leading-5 group-hover:text-[#E58080] transition-colors duration-500">
                        {product.name}
                      </h3>

                      <p className="text-[10px] text-[#705D5D] mt-3 leading-5">
                        {product.notes}
                      </p>

                      <div className="flex items-end justify-between mt-5">
                        <span className="text-sm font-serif italic text-[#E58080]">
                          ${product.price}
                        </span>

                        <span className="text-[7px] tracking-[0.2em] text-[#604C4C]">
                          50 ML
                        </span>
                      </div>

                    </div>
                  </button>

                  {/* Add */}
                  <div className="px-5 pb-5">
                    <button
                      onClick={() => onAddToCart?.(product)}
                      className="group/btn relative overflow-hidden w-full py-3 border border-[#3D141A] text-[#A89292] text-[8px] tracking-[0.25em] hover:border-[#E58080] hover:text-[#FDF8F5] transition-all cursor-pointer"
                    >
                      <span className="relative z-10">
                        ADD TO COLLECTION
                      </span>

                      <span className="absolute inset-0 bg-[#3D141A] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    </button>
                  </div>

                </article>
              );
            })}

          </div>
        </div>
      </section>
    </>
  );
};

export default BestSellers;