import React from "react";

const CartDrawer = ({
  isOpen,
  onClose,
  cart,
  onRemoveFromCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-black/75 backdrop-blur-sm">

      {/* Overlay */}
      <button
        onClick={onClose}
        aria-label="Close shopping bag"
        className="absolute inset-0 cursor-default"
      />

      {/* Drawer */}
      <div className="relative z-10 bg-[#0D0305] border-l border-[#3D141A] w-full max-w-md h-full flex flex-col shadow-[-20px_0_80px_rgba(0,0,0,.6)] animate-[cartSlide_.45s_cubic-bezier(.22,1,.36,1)]">

        <style>{`
          @keyframes cartSlide {
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

        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#3D141A]">

          <div className="flex justify-between items-start">

            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-[1px] bg-[#E58080]" />

                <p className="text-[8px] tracking-[0.4em] text-[#E58080]">
                  AÊTRE
                </p>
              </div>

              <h2 className="text-xl font-serif text-[#FDF8F5] tracking-[0.15em]">
                SHOPPING BAG
              </h2>

              <p className="text-[8px] text-[#705D5D] tracking-[0.25em] mt-2">
                {totalItems} ITEM{totalItems !== 1 ? "S" : ""}
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="w-9 h-9 border border-[#3D141A] text-[#806F6F] hover:border-[#E58080] hover:text-[#E58080] transition-all cursor-pointer"
            >
              ✕
            </button>

          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">

          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">

              <div className="relative w-20 h-20 border border-[#3D141A] flex items-center justify-center mb-7">
                <span className="text-3xl text-[#6D1F2D]">
                  ♡
                </span>
              </div>

              <p className="font-serif text-xl text-[#FDF8F5] mb-3">
                YOUR BAG IS EMPTY
              </p>

              <p className="text-[8px] text-[#705D5D] tracking-[0.25em]">
                DISCOVER YOUR SIGNATURE SCENT
              </p>

            </div>
          ) : (
            <div className="space-y-4">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="group bg-[#120406] p-3 sm:p-4 border border-[#3D141A] hover:border-[#6D1F2D] transition-all duration-400"
                >

                  <div className="flex gap-4">

                    {/* Image */}
                    <div className="w-20 h-24 bg-[#0A0203] border border-[#3D141A] flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-grow min-w-0">

                      <div className="flex justify-between gap-2">
                        <h4 className="text-[#FDF8F5] font-serif text-sm leading-5">
                          {item.name}
                        </h4>

                        <button
                          onClick={() =>
                            onRemoveFromCart(item.id)
                          }
                          className="text-[#604C4C] hover:text-[#E58080] text-[7px] uppercase tracking-widest cursor-pointer"
                        >
                          REMOVE
                        </button>
                      </div>

                      <p className="text-[#E58080] text-xs mt-2">
                        ${item.price}
                      </p>

                      {/* Quantity */}
                      <div className="flex items-center gap-3 mt-4">

                        <button
                          onClick={() =>
                            onDecreaseQuantity(item.id)
                          }
                          className="w-7 h-7 border border-[#3D141A] text-[#A89292] hover:border-[#E58080] hover:text-[#E58080] transition-all cursor-pointer"
                        >
                          −
                        </button>

                        <span className="text-xs text-[#FDF8F5] min-w-[20px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            onIncreaseQuantity(item.id)
                          }
                          className="w-7 h-7 border border-[#3D141A] text-[#A89292] hover:border-[#E58080] hover:text-[#E58080] transition-all cursor-pointer"
                        >
                          +
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#3D141A] p-5 sm:p-6 bg-[#100306]">

          <div className="flex justify-between items-center mb-3">
            <span className="text-[#705D5D] text-[9px] tracking-[0.25em]">
              SUBTOTAL
            </span>

            <span className="text-[#A89292] text-sm font-serif">
              ${totalPrice}
            </span>
          </div>

          <div className="flex justify-between items-center mb-5">
            <span className="text-[#806F6F] text-xs tracking-widest">
              TOTAL
            </span>

            <span className="text-[#E58080] text-2xl font-serif">
              ${totalPrice}
            </span>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={onCheckout}
            className="group relative overflow-hidden w-full bg-[#6D1F2D] text-[#FDF8F5] py-4 uppercase text-[9px] tracking-[0.3em] hover:bg-[#7D2735] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="relative z-10">
              PROCEED TO CHECKOUT
            </span>

            <span className="absolute inset-0 bg-[#8C2A38] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-400" />
          </button>

          <p className="text-center text-[7px] tracking-[0.2em] text-[#604C4C] mt-4">
            COMPLIMENTARY SHIPPING ON ORDERS OVER $200
          </p>

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;