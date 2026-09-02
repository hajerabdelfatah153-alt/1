
import { useState } from "react";
import { products } from "../data/products";

function PerfumeGrid({
  onProductClick,
  onAddToCart,
  wishlist = [],
  onToggleWishlist,
}) {
  const [filter, setFilter] = useState("ALL");
  const [animationKey, setAnimationKey] = useState(0);

  const shuffleProducts = (items) => {
    const shuffled = [...items];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[i],
      ];
    }

    return shuffled;
  };

  const getFilteredProducts = (selectedFilter) => {
    const filtered =
      selectedFilter === "ALL"
        ? products
        : products.filter(
            (product) =>
              String(product.category).toUpperCase() ===
              selectedFilter
          );

    return shuffleProducts(filtered);
  };

  const [displayedProducts, setDisplayedProducts] = useState(() =>
    shuffleProducts(products)
  );

  const handleFilterChange = (item) => {
    setFilter(item);
    setDisplayedProducts(getFilteredProducts(item));
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <section
      id="shop"
      className="bg-[#080203] px-5 py-24 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[10px] tracking-[0.45em] text-[#E58080]">
              THE COLLECTION
            </p>

            <h2 className="font-serif text-4xl text-[#FDF8F5] md:text-5xl">
              Discover Your Scent
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#A89292]">
              A collection of carefully crafted fragrances designed to leave
              an unforgettable impression.
            </p>
          </div>

          <div className="flex w-fit gap-1 rounded-full border border-[#6D1F2D]/40 bg-[#100306] p-1">
            {["ALL", "UNISEX"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleFilterChange(item)}
                className={`rounded-full px-6 py-3 text-[10px] tracking-[0.25em] transition-all duration-300 ${
                  filter === item
                    ? "bg-[#6D1F2D] text-[#FDF8F5] shadow-lg shadow-[#6D1F2D]/30"
                    : "text-[#A89292] hover:text-[#FDF8F5]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div
          key={animationKey}
          className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-[fadeIn_0.6s_ease-out]"
        >
          {displayedProducts.map((product, index) => {
            const isWishlisted = wishlist.some(
              (item) => item.id === product.id
            );

            return (
              <article
                key={`${product.id}-${animationKey}`}
                className="group relative overflow-hidden rounded-2xl border border-[#6D1F2D]/25 bg-[#100306] transition-all duration-500 hover:-translate-y-2 hover:border-[#7D2735]/70 hover:shadow-2xl hover:shadow-black/50"
                style={{
                  animation: `productReveal 0.6s ease-out ${index * 0.07}s both`,
                }}
              >
                <button
                  type="button"
                  onClick={() => onToggleWishlist(product)}
                  className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-lg backdrop-blur-md transition-all duration-300 hover:scale-110"
                  aria-label="Wishlist"
                >
                  <span
                    className={
                      isWishlisted
                        ? "text-[#E58080]"
                        : "text-white/60 hover:text-[#E58080]"
                    }
                  >
                    {isWishlisted ? "♥" : "♡"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onProductClick(product)}
                  className="block w-full text-left"
                >
                  <div className="relative flex h-[360px] items-center justify-center overflow-hidden bg-[#18060A]">

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,39,53,0.25),transparent_65%)]" />

                    <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6D1F2D]/10 blur-3xl" />

                    <img
                      src={product.image}
                      alt={product.name}
                      className="relative z-10 block h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/3 bg-gradient-to-t from-[#100306] to-transparent" />
                  </div>

                  <div className="p-6">
                    <p className="mb-2 text-[9px] tracking-[0.4em] text-[#E58080]">
                      {product.category}
                    </p>

                    <h3 className="mb-3 text-sm tracking-[0.12em] text-[#FDF8F5]">
                      {product.name}
                    </h3>

                    <p className="mb-5 min-h-[40px] text-xs leading-5 text-[#A89292]">
                      {product.notes}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-lg text-[#FDF8F5]">
                        EGP {product.price}
                      </span>

                      <span className="text-[9px] tracking-[0.25em] text-[#E58080]">
                        VIEW →
                      </span>
                    </div>
                  </div>
                </button>

                <div className="px-6 pb-6">
                  <button
                    type="button"
                    onClick={() => onAddToCart(product)}
                    className="w-full rounded-full border border-[#6D1F2D] py-3 text-[10px] tracking-[0.25em] text-[#FDF8F5] transition-all duration-300 hover:bg-[#6D1F2D]"
                  >
                    ADD TO CART
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {displayedProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-sm tracking-[0.2em] text-[#A89292]">
              NO UNISEX FRAGRANCES FOUND
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes productReveal {
          from {
            opacity: 0;
            transform: translateY(35px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}

export default PerfumeGrid;
