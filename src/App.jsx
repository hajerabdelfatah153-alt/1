import React, { useEffect, useState } from "react";

import Hero from "./components/Hero";
import PerfumeGrid from "./components/PerfumeGrid";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import WishlistDrawer from "./components/WishlistDrawer";
import Newsletter from "./components/Newsletter";
import Feedback from "./components/Feedback";
import ScentQuiz from "./components/ScentQuiz";
import SignatureSection from "./components/SignatureSection";
import BestSellers from "./components/BestSellers";

import OrderTracking from "./pages/OrderTracking";
import Login from "./pages/Login";

import { products } from "./data/products";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [cart, setCart] = useState([]);

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("aetre-wishlist")) || [];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("aetre-recently-viewed")
      );

      if (!Array.isArray(saved)) return [];

      // نحول البيانات القديمة لو كانت مخزنة كـ products كاملة
      return saved
        .map((item) =>
          typeof item === "object" ? item.id : item
        )
        .filter((id) =>
          products.some((product) => product.id === id)
        )
        .slice(0, 4);
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const [cursor, setCursor] = useState({
    x: -100,
    y: -100,
  });

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 1500);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursor({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const elements =
      document.querySelectorAll(".aetre-reveal");

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "aetre-reveal-visible"
            );
          }
        });
      },
      {
        threshold: 0.08,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [isLoading, currentPage]);

  const handleAddToCart = (product) => {
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    showToast(
      `${product.name} ADDED TO COLLECTION`
    );
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );

    showToast("REMOVED FROM COLLECTION");
  };

  const handleIncreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleToggleWishlist = (product) => {
    if (!product) return;

    setWishlist((prev) => {
      const exists = prev.some(
        (item) => item.id === product.id
      );

      if (exists) {
        showToast("REMOVED FROM WISHLIST");

        return prev.filter(
          (item) => item.id !== product.id
        );
      }

      showToast(
        `${product.name} ADDED TO WISHLIST`
      );

      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );

    showToast("REMOVED FROM WISHLIST");
  };

  /*
    Recently Viewed
    بنخزن الـ ID فقط بدل الصورة
    عشان صور Vite imported assets متختفيش بعد Refresh
  */
  const handleViewProduct = (product) => {
    if (!product) return;

    setRecentlyViewed((prev) => {
      const withoutCurrent = prev.filter(
        (id) => id !== product.id
      );

      return [
        product.id,
        ...withoutCurrent,
      ].slice(0, 4);
    });
  };

  useEffect(() => {
    localStorage.setItem(
      "aetre-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(
      "aetre-recently-viewed",
      JSON.stringify(recentlyViewed)
    );
  }, [recentlyViewed]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setCart([]);
    setIsCheckoutOpen(false);
    showToast("ORDER COMPLETED");
  };

  const openProduct = (product) => {
    if (!product) return;

    handleViewProduct(product);
    setSelectedProduct(product);
  };

  const goToCollection = () => {
    setCurrentPage("home");

    setTimeout(() => {
      const shopSection =
        document.getElementById("shop");

      if (shopSection) {
        shopSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);
  };

  const goToTracking = () => {
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsCheckoutOpen(false);
    setSelectedProduct(null);

    setCurrentPage("tracking");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  const goToLogin = () => {
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsCheckoutOpen(false);
    setSelectedProduct(null);

    setCurrentPage("login");

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  const goToHome = () => {
    setCurrentPage("home");

    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsCheckoutOpen(false);
    setSelectedProduct(null);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  const openWishlist = () => {
    setIsCartOpen(false);
    setIsWishlistOpen(true);
  };

  const openCart = () => {
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  if (isLoading) {
    return (
      <div
        className="aetre-loader"
        style={{
          background:
            "radial-gradient(circle at center, #3D141A 0%, #18060A 38%, #080203 78%)",
        }}
      >
        <div className="aetre-loader-inner">
          <div className="aetre-loader-logo">
            AÊTRE
          </div>

          <div className="aetre-loader-line">
            <span></span>
          </div>

          <p>
            created with love ♡ — Hajer Abdelfattah
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#080203] text-[#FDF8F5]">
      {/* Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: `
            radial-gradient(
              circle at 50% 10%,
              rgba(109, 31, 45, 0.45) 0%,
              rgba(61, 20, 26, 0.30) 25%,
              rgba(24, 6, 10, 0.18) 48%,
              transparent 72%
            )
          `,
        }}
      />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: `
            radial-gradient(
              circle at 5% 50%,
              rgba(125, 39, 53, 0.20) 0%,
              transparent 48%
            ),
            radial-gradient(
              circle at 95% 70%,
              rgba(109, 31, 45, 0.20) 0%,
              transparent 50%
            )
          `,
        }}
      />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            "linear-gradient(180deg, rgba(61,20,26,0.18) 0%, rgba(8,2,3,0) 35%, rgba(8,2,3,0.35) 100%)",
        }}
      />

      <div className="relative z-10">
        {/* Cursor */}
        <div
          className="aetre-cursor"
          style={{
            left: cursor.x,
            top: cursor.y,
          }}
        />

        {/* Toast */}
        {toast && (
          <div
            className={`aetre-toast ${
              toast.type === "error"
                ? "aetre-toast-error"
                : ""
            }`}
          >
            <span className="aetre-toast-dot"></span>
            <span>{toast.message}</span>
          </div>
        )}

        {/* Header */}
        {currentPage !== "login" && (
          <header className="sticky top-0 z-50 border-b border-[#3D141A] bg-[#080203]/95 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={goToHome}
                  className="group relative shrink-0 text-xl sm:text-2xl font-serif tracking-[0.25em] sm:tracking-[0.3em] font-light cursor-pointer"
                >
                  <span className="transition-colors duration-300 group-hover:text-[#E58080]">
                    AÊTRE
                  </span>

                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-[#E58080] transition-all duration-500 group-hover:w-full"></span>
                </button>

                <nav className="flex items-center justify-end gap-3 sm:gap-7 md:gap-8 text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.12em] sm:tracking-[0.20em] md:tracking-[0.22em] uppercase">
                  <button
                    onClick={goToCollection}
                    className="whitespace-nowrap text-[#A89292] hover:text-[#E58080] transition-colors duration-300 cursor-pointer"
                  >
                    COLLECTION
                  </button>

                  <button
                    onClick={goToTracking}
                    className={`whitespace-nowrap transition-colors duration-300 cursor-pointer ${
                      currentPage === "tracking"
                        ? "text-[#E58080]"
                        : "text-[#A89292] hover:text-[#E58080]"
                    }`}
                  >
                    TRACK ORDER
                  </button>

                  <button
                    onClick={goToLogin}
                    className="whitespace-nowrap border border-[#6D1F2D] px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-[#E58080] hover:bg-[#6D1F2D] hover:text-[#FDF8F5] transition-all duration-300 cursor-pointer"
                  >
                    LOGIN
                  </button>
                </nav>
              </div>
            </div>
          </header>
        )}

        {/* HOME */}
        {currentPage === "home" && (
          <>
            <div className="aetre-reveal">
              <Hero />
            </div>

            <div className="aetre-reveal">
              <ScentQuiz
                onSelectProduct={openProduct}
              />
            </div>

            <div className="aetre-reveal">
              <SignatureSection />
            </div>

            <div className="aetre-reveal">
              <BestSellers
                onSelectProduct={openProduct}
                onAddToCart={handleAddToCart}
                wishlist={wishlist}
                onToggleWishlist={
                  handleToggleWishlist
                }
              />
            </div>

            <section
              id="shop"
              className="w-full"
            >
              <PerfumeGrid
                onProductClick={openProduct}
                onAddToCart={handleAddToCart}
                wishlist={wishlist}
                onToggleWishlist={
                  handleToggleWishlist
                }
                onViewProduct={
                  handleViewProduct
                }
              />
            </section>

            {/* Recently Viewed */}
            {recentlyViewed.length > 0 && (
              <section className="max-w-7xl mx-auto px-5 sm:px-6 py-20 md:py-24 border-t border-[#3D141A]">
                <div className="text-center mb-10 md:mb-12">
                  <p className="text-[9px] tracking-[0.4em] text-[#E58080] mb-4">
                    YOUR AÊTRE JOURNEY
                  </p>

                  <h2 className="text-3xl md:text-4xl font-serif">
                    Recently{" "}
                    <span className="italic text-[#E58080]">
                      Viewed.
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {recentlyViewed.map((productId) => {
                    const product = products.find(
                      (item) => item.id === productId
                    );

                    if (!product) return null;

                    return (
                      <button
                        key={product.id}
                        onClick={() =>
                          openProduct(product)
                        }
                        className="aetre-product-card text-left border border-[#3D141A] bg-[#100306] p-3 sm:p-4 hover:border-[#6D1F2D] transition-all cursor-pointer"
                      >
                        <div className="h-40 sm:h-48 bg-[#080203] mb-4 flex items-center justify-center overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain aetre-product-image"
                          />
                        </div>

                        <h3 className="font-serif text-xs sm:text-sm text-[#FDF8F5]">
                          {product.name}
                        </h3>

                        <p className="text-[#E58080] text-xs mt-2">
                          EGP {product.price}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            <div className="aetre-reveal">
              <Feedback />
            </div>

            <div className="aetre-reveal">
              <Newsletter />
            </div>

            {/* Footer */}
            <footer className="relative z-20 block w-full border-t border-[#3D141A] bg-[#080203] px-5 sm:px-6 py-14 sm:py-16">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
                  <div className="sm:col-span-2">
                    <h2 className="text-3xl font-serif tracking-[0.3em] mb-5">
                      AÊTRE
                    </h2>

                    <p className="text-xs text-[#806F6F] max-w-sm leading-6">
                      A private anthology of modern
                      fragrances, crafted for those
                      who choose presence over
                      permanence.
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] tracking-[0.3em] text-[#E58080] mb-5">
                      EXPLORE
                    </p>

                    <div className="space-y-3 text-[9px] tracking-widest text-[#806F6F]">
                      <button
                        onClick={goToCollection}
                        className="block hover:text-[#E58080] transition-colors cursor-pointer"
                      >
                        COLLECTION
                      </button>

                      <button
                        onClick={openWishlist}
                        className="block hover:text-[#E58080] transition-colors cursor-pointer"
                      >
                        WISHLIST
                      </button>

                      <button
                        onClick={openCart}
                        className="block hover:text-[#E58080] transition-colors cursor-pointer"
                      >
                        SHOPPING BAG
                      </button>

                      <button
                        onClick={goToTracking}
                        className="block hover:text-[#E58080] transition-colors cursor-pointer"
                      >
                        TRACK ORDER
                      </button>

                      <button
                        onClick={goToLogin}
                        className="block hover:text-[#E58080] transition-colors cursor-pointer"
                      >
                        LOGIN
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-[9px] tracking-[0.3em] text-[#E58080] mb-5">
                      AÊTRE
                    </p>

                    <div className="space-y-3 text-[9px] tracking-widest text-[#806F6F]">
                      <p className="hover:text-[#E58080] transition-colors cursor-pointer">
                        INSTAGRAM
                      </p>

                      <p className="hover:text-[#E58080] transition-colors cursor-pointer">
                        CONTACT
                      </p>

                      <p className="hover:text-[#E58080] transition-colors cursor-pointer">
                        PRIVACY
                      </p>

                      <p className="hover:text-[#E58080] transition-colors cursor-pointer">
                        TERMS
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#3D141A] mt-14 pt-6 flex flex-col md:flex-row items-center md:justify-between gap-3 text-[8px] tracking-[0.15em] text-[#604C4C] text-center md:text-left">
                  <span>
                    © 2026 AÊTRE. ALL RIGHTS RESERVED.
                  </span>

                  <span className="whitespace-nowrap">
                    created with love ♡ — Hajer Abdelfattah
                  </span>
                </div>
              </div>
            </footer>
          </>
        )}

        {/* Tracking */}
        {currentPage === "tracking" && (
          <OrderTracking />
        )}

        {/* Login */}
        {currentPage === "login" && (
          <Login
            onBackHome={goToHome}
          />
        )}

        {/* Product Modal */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() =>
              setSelectedProduct(null)
            }
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={
              handleToggleWishlist
            }
          />
        )}

        {/* Cart */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() =>
            setIsCartOpen(false)
          }
          cart={cart}
          onRemoveFromCart={
            handleRemoveFromCart
          }
          onIncreaseQuantity={
            handleIncreaseQuantity
          }
          onDecreaseQuantity={
            handleDecreaseQuantity
          }
          onCheckout={handleCheckout}
        />

        {/* Wishlist */}
        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() =>
            setIsWishlistOpen(false)
          }
          wishlist={wishlist}
          onRemove={
            handleRemoveFromWishlist
          }
          onAddToCart={handleAddToCart}
        />

        {/* Checkout */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() =>
            setIsCheckoutOpen(false)
          }
          cart={cart}
          onClearCart={handleOrderComplete}
        />

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-[100]">
          <div className="mx-auto w-full">
            <div className="border-t border-[#6D1F2D] bg-[#080203]/98 backdrop-blur-xl shadow-[0_-10px_35px_rgba(0,0,0,0.45)]">
              <div className="mx-auto max-w-2xl flex items-center justify-around px-3 sm:px-8 py-3">

                {/* HOME */}
                <button
                  onClick={goToHome}
                  className={`relative flex flex-col items-center justify-center gap-1 min-w-[70px] py-1 transition-all duration-300 cursor-pointer ${
                    currentPage === "home"
                      ? "text-[#E58080]"
                      : "text-[#806F6F] hover:text-[#E58080]"
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <path d="M3 10.5L12 3l9 7.5" />
                    <path d="M5.5 9.5V21h13V9.5" />
                    <path d="M9.5 21v-6h5v6" />
                  </svg>

                  <span className="text-[7px] sm:text-[8px] tracking-[0.2em]">
                    HOME
                  </span>
                </button>

                {/* WISHLIST */}
                <button
                  onClick={openWishlist}
                  className={`relative flex flex-col items-center justify-center gap-1 min-w-[70px] py-1 transition-all duration-300 cursor-pointer ${
                    isWishlistOpen
                      ? "text-[#E58080]"
                      : "text-[#806F6F] hover:text-[#E58080]"
                  }`}
                >
                  <div className="relative">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    >
                      <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7C3.2 5.6 5.4 3.5 8.2 3.5c1.7 0 3.1.8 3.8 2 0.7-1.2 2.1-2 3.8-2 2.8 0 5 2.1 5 5.2Z" />
                    </svg>

                    {wishlist.length > 0 && (
                      <span className="absolute -top-2 -right-3 min-w-[15px] h-[15px] px-1 rounded-full bg-[#6D1F2D] text-[#FDF8F5] text-[7px] flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                  </div>

                  <span className="text-[7px] sm:text-[8px] tracking-[0.2em]">
                    WISHLIST
                  </span>
                </button>

                {/* CART */}
                <button
                  onClick={openCart}
                  className={`relative flex flex-col items-center justify-center gap-1 min-w-[70px] py-1 transition-all duration-300 cursor-pointer ${
                    isCartOpen
                      ? "text-[#E58080]"
                      : "text-[#806F6F] hover:text-[#E58080]"
                  }`}
                >
                  <div className="relative">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    >
                      <path d="M4 7h16l-1.5 10h-13L4 7Z" />
                      <path d="M8 7a4 4 0 0 1 8 0" />
                    </svg>

                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-3 min-w-[15px] h-[15px] px-1 rounded-full bg-[#6D1F2D] text-[#FDF8F5] text-[7px] flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>

                  <span className="text-[7px] sm:text-[8px] tracking-[0.2em]">
                    CART
                  </span>
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-[76px]"></div>
      </div>
    </div>
  );
}
