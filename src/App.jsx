
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
      return (
        JSON.parse(localStorage.getItem("aetre-recently-viewed")) || []
      );
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

  /* =====================================================
     SPLASH SCREEN
  ===================================================== */

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  /* =====================================================
     TOAST
  ===================================================== */

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 1000);
  };

  /* =====================================================
     CUSTOM CURSOR
  ===================================================== */

  const [cursor, setCursor] = useState({
    x: -100,
    y: -100,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursor({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  useEffect(() => {
    if (isLoading) return;

    const elements = document.querySelectorAll(".aetre-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aetre-reveal-visible");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isLoading, currentPage]);

  /* =====================================================
     AMBIENT SOUND
  ===================================================== */

  const [soundOn, setSoundOn] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [oscillators, setOscillators] = useState([]);

  const toggleAmbientSound = () => {
    if (soundOn) {
      oscillators.forEach((osc) => {
        try {
          osc.stop();
        } catch {}
      });

      if (audioContext) {
        audioContext.close();
      }

      setOscillators([]);
      setAudioContext(null);
      setSoundOn(false);

      showToast("AMBIENT SOUND OFF");

      return;
    }

    const AudioCtx =
      window.AudioContext || window.webkitAudioContext;

    if (!AudioCtx) {
      showToast("AMBIENT SOUND NOT SUPPORTED", "error");
      return;
    }

    const ctx = new AudioCtx();

    const frequencies = [110, 164.81, 220];

    const newOscillators = [];

    frequencies.forEach((frequency, index) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = frequency;

      gain.gain.value = index === 0 ? 0.018 : 0.008;

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start();

      newOscillators.push(oscillator);
    });

    setAudioContext(ctx);
    setOscillators(newOscillators);
    setSoundOn(true);

    showToast("AMBIENT SOUND ON");
  };

  /* =====================================================
     CART
  ===================================================== */

  const handleAddToCart = (product) => {
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

    showToast(`${product.name} ADDED TO COLLECTION`);
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

  /* =====================================================
     WISHLIST
  ===================================================== */

  const handleToggleWishlist = (product) => {
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

      showToast(`${product.name} ADDED TO WISHLIST`);

      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );

    showToast("REMOVED FROM WISHLIST");
  };

  /* =====================================================
     RECENTLY VIEWED
  ===================================================== */

  const handleViewProduct = (product) => {
    setRecentlyViewed((prev) => {
      const withoutCurrent = prev.filter(
        (item) => item.id !== product.id
      );

      return [
        product,
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

  /* =====================================================
     CHECKOUT
  ===================================================== */

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  /* =====================================================
     PRODUCT
  ===================================================== */

  const openProduct = (product) => {
    handleViewProduct(product);
    setSelectedProduct(product);
  };

  /* =====================================================
     COLLECTION
  ===================================================== */

  const goToCollection = () => {
    setCurrentPage("home");

    setTimeout(() => {
      document
        .getElementById("shop")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  /* =====================================================
     LOADING SCREEN
  ===================================================== */

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
            CRAFTED WITH INTENTION
          </p>

        </div>
      </div>
    );
  }

  /* =====================================================
     MAIN
  ===================================================== */

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#080203] text-[#FDF8F5]">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

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

        {/* =====================================================
            CURSOR
        ===================================================== */}

        <div
          className="aetre-cursor"
          style={{
            left: cursor.x,
            top: cursor.y,
          }}
        />

        {/* =====================================================
            TOAST
        ===================================================== */}

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

        {/* =====================================================
            HEADER
        ===================================================== */}

        {currentPage !== "login" && (
          <header className="sticky top-0 z-40 border-b border-[#3D141A] bg-[#080203]/90 backdrop-blur-xl">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">

              {/* LOGO */}

              <button
                onClick={() => {
                  setCurrentPage("home");

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="group relative text-xl sm:text-2xl font-serif tracking-[0.25em] sm:tracking-[0.3em] font-light cursor-pointer"
              >
                <span className="transition-colors duration-300 group-hover:text-[#E58080]">
                  AÊTRE
                </span>

                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-[#E58080] transition-all duration-500 group-hover:w-full"></span>
              </button>

              {/* DESKTOP NAV */}

              <div className="hidden md:flex items-center gap-8 text-[9px] tracking-[0.22em] uppercase">

                <button
                  onClick={goToCollection}
                  className="text-[#A89292] hover:text-[#E58080] transition-colors cursor-pointer"
                >
                  COLLECTION
                </button>

                <button
                  onClick={() =>
                    setCurrentPage("tracking")
                  }
                  className={`transition-colors cursor-pointer ${
                    currentPage === "tracking"
                      ? "text-[#E58080]"
                      : "text-[#A89292] hover:text-[#E58080]"
                  }`}
                >
                  TRACK ORDER
                </button>

                <button
                  onClick={() =>
                    setCurrentPage("login")
                  }
                  className="group relative border border-[#6D1F2D] px-5 py-2.5 text-[#E58080] hover:bg-[#6D1F2D] hover:text-[#FDF8F5] transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <span className="relative z-10">
                    LOGIN
                  </span>
                </button>

              </div>

              {/* MOBILE HEADER */}

              <div className="flex md:hidden items-center">

                <button
                  onClick={goToCollection}
                  className="text-[8px] tracking-[0.2em] uppercase text-[#A89292] hover:text-[#E58080] transition-colors"
                >
                  SHOP
                </button>

              </div>

            </div>
          </header>
        )}

        {/* =====================================================
            HOME
        ===================================================== */}

        {currentPage === "home" && (
          <>

            <div className="aetre-reveal">
              <Hero />
            </div>

            <div className="aetre-reveal">
              <ScentQuiz
                onSelectProduct={(product) =>
                  openProduct(product)
                }
              />
            </div>

            <div className="aetre-reveal">
              <SignatureSection />
            </div>

            <div className="aetre-reveal">
              <BestSellers
                onSelectProduct={(product) =>
                  openProduct(product)
                }
                onAddToCart={handleAddToCart}
                wishlist={wishlist}
                onToggleWishlist={
                  handleToggleWishlist
                }
              />
            </div>

            <div
              id="shop"
              className="aetre-reveal"
            >
              <PerfumeGrid
                onProductClick={(product) =>
                  openProduct(product)
                }
                onAddToCart={handleAddToCart}
                wishlist={wishlist}
                onToggleWishlist={
                  handleToggleWishlist
                }
                onViewProduct={
                  handleViewProduct
                }
              />
            </div>

            {/* RECENTLY VIEWED */}

            {recentlyViewed.length > 0 && (
              <section className="aetre-reveal max-w-7xl mx-auto px-5 sm:px-6 py-20 md:py-24 border-t border-[#3D141A]">

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

                  {recentlyViewed.map(
                    (product) => (
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
                    )
                  )}

                </div>

              </section>
            )}

            {/* FEEDBACK */}

            <div className="aetre-reveal">
              <Feedback />
            </div>

            {/* NEWSLETTER */}

            <div className="aetre-reveal">
              <Newsletter />
            </div>

            {/* =================================================
                FOOTER
            ================================================= */}

            <footer className="aetre-reveal border-t border-[#3D141A] bg-[#080203]/95 px-6 py-16">

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
                        className="block hover:text-[#E58080] cursor-pointer"
                      >
                        COLLECTION
                      </button>

                      <button
                        onClick={() =>
                          setIsWishlistOpen(true)
                        }
                        className="block hover:text-[#E58080] cursor-pointer"
                      >
                        WISHLIST
                      </button>

                      <button
                        onClick={() =>
                          setIsCartOpen(true)
                        }
                        className="block hover:text-[#E58080] cursor-pointer"
                      >
                        SHOPPING BAG
                      </button>

                      <button
                        onClick={() =>
                          setCurrentPage("tracking")
                        }
                        className="block hover:text-[#E58080] cursor-pointer"
                      >
                        TRACK ORDER
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

                <div className="border-t border-[#3D141A] mt-14 pt-6 flex flex-col md:flex-row justify-between gap-3 text-[8px] tracking-[0.2em] text-[#604C4C]">

                  <span>
                    © 2026 AÊTRE. ALL RIGHTS RESERVED.
                  </span>

                  <span>
                    CRAFTED WITH INTENTION.
                  </span>

                </div>

              </div>

            </footer>

          </>
        )}

        {/* =====================================================
            TRACKING
        ===================================================== */}

        {currentPage === "tracking" && (
          <OrderTracking />
        )}

        {/* =====================================================
            LOGIN
        ===================================================== */}

        {currentPage === "login" && (
          <Login
            onBackHome={() =>
              setCurrentPage("home")
            }
          />
        )}

        {/* =====================================================
            PRODUCT MODAL
        ===================================================== */}

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

        {/* =====================================================
            CART
        ===================================================== */}

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

        {/* =====================================================
            WISHLIST
        ===================================================== */}

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

        {/* =====================================================
            CHECKOUT
        ===================================================== */}

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() =>
            setIsCheckoutOpen(false)
          }
          cart={cart}
          onClearCart={() => {
            setCart([]);
            showToast("ORDER COMPLETED");
          }}
        />

        {/* =====================================================
            SOUND
        ===================================================== */}

        {currentPage === "home" && (
          <button
            onClick={toggleAmbientSound}
            className={`aetre-sound-button ${
              soundOn
                ? "aetre-sound-active"
                : ""
            }`}
            aria-label="Toggle ambient sound"
          >

            <span className="aetre-sound-icon">
              {soundOn ? "◼" : "◉"}
            </span>

            <span className="hidden sm:inline">
              {soundOn
                ? "SOUND ON"
                : "AMBIENT"}
            </span>

          </button>
        )}

        {/* =====================================================
            MOBILE BOTTOM NAV
        ===================================================== */}

        {currentPage !== "login" && (
          <nav className="aetre-mobile-nav md:hidden">

            <button
              onClick={() => {
                setCurrentPage("home");

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <span>⌂</span>
              HOME
            </button>

            <button onClick={goToCollection}>
              <span>◇</span>
              SHOP
            </button>

            <button
              onClick={() =>
                setIsWishlistOpen(true)
              }
            >
              <span>♡</span>
              {wishlist.length}
            </button>

            <button
              onClick={() =>
                setIsCartOpen(true)
              }
            >
              <span>□</span>
              {cartCount}
            </button>

          </nav>
        )}

      </div>
    </div>
  );
}
