import React, { useEffect, useState } from "react";

const CheckoutModal = ({
  isOpen,
  onClose,
  cart,
  onClearCart,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 200 ? 0 : 25;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    setSubmitted(false);
    setIsProcessing(false);
    setPaymentMethod("visa");

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsProcessing(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    setIsProcessing(false);
    setSubmitted(true);

    setTimeout(() => {
      onClearCart?.();
    }, 900);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#080203] flex items-center justify-center px-5">

        <div className="relative max-w-lg w-full text-center border border-[#3D141A] bg-[#100306] p-8 sm:p-12">

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-[#E58080]" />

          <div className="w-20 h-20 mx-auto border border-[#6D1F2D] rounded-full flex items-center justify-center mb-8">
            <span className="text-2xl text-[#E58080]">
              ✓
            </span>
          </div>

          <p className="text-[8px] tracking-[0.5em] text-[#E58080] mb-5">
            AÊTRE
          </p>

          <h2 className="text-3xl sm:text-4xl font-serif text-[#FDF8F5]">
            Order Confirmed.
          </h2>

          <p className="text-sm text-[#A89292] leading-7 mt-5">
            Your fragrance is being prepared with care.
            <br />
            A confirmation has been sent to your email.
          </p>

          <div className="border-t border-[#3D141A] mt-8 pt-6">
            <p className="text-[8px] tracking-[0.3em] text-[#705D5D]">
              TOTAL
            </p>

            <p className="text-2xl font-serif italic text-[#E58080] mt-2">
              ${total}
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-8 w-full py-4 bg-[#6D1F2D] hover:bg-[#7D2735] text-[#FDF8F5] text-[9px] tracking-[0.3em] transition-all cursor-pointer"
          >
            CONTINUE SHOPPING
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md overflow-y-auto">

      <div className="min-h-full flex items-center justify-center p-3 sm:p-6">

        <div className="relative w-full max-w-5xl bg-[#0D0305] border border-[#3D141A] shadow-[0_30px_100px_rgba(0,0,0,.7)]">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-9 h-9 border border-[#3D141A] text-[#806F6F] hover:text-[#E58080] hover:border-[#E58080] transition-all cursor-pointer"
          >
            ✕
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* Order */}
            <div className="lg:col-span-5 bg-[#100306] p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#3D141A]">

              <p className="text-[8px] tracking-[0.5em] text-[#E58080] mb-3">
                AÊTRE
              </p>

              <h2 className="text-2xl sm:text-3xl font-serif text-[#FDF8F5]">
                Your Order
              </h2>

              <div className="w-10 h-[1px] bg-[#6D1F2D] my-6" />

              <div className="space-y-5 max-h-[350px] overflow-y-auto pr-1">

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-5 border-b border-[#3D141A]"
                  >
                    <div className="w-16 h-20 bg-[#080203] border border-[#3D141A] flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="font-serif text-sm text-[#FDF8F5] leading-5">
                        {item.name}
                      </p>

                      <p className="text-[8px] text-[#705D5D] tracking-widest mt-2">
                        QTY × {item.quantity}
                      </p>

                      <p className="text-sm text-[#E58080] mt-3">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}

              </div>

              <div className="space-y-3 mt-7">

                <div className="flex justify-between text-[9px] text-[#705D5D] tracking-widest">
                  <span>SUBTOTAL</span>
                  <span>${subtotal}</span>
                </div>

                <div className="flex justify-between text-[9px] text-[#705D5D] tracking-widest">
                  <span>SHIPPING</span>
                  <span>
                    {shipping === 0 ? "COMPLIMENTARY" : `$${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#3D141A]">
                  <span className="text-[10px] text-[#A89292] tracking-[0.2em]">
                    TOTAL
                  </span>

                  <span className="text-2xl font-serif italic text-[#E58080]">
                    ${total}
                  </span>
                </div>

              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10">

              <div className="mb-8">
                <p className="text-[8px] tracking-[0.4em] text-[#E58080] mb-3">
                  SECURE CHECKOUT
                </p>

                <h3 className="text-2xl sm:text-3xl font-serif text-[#FDF8F5]">
                  Complete Your Order
                </h3>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Personal info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="sm:col-span-2">
                    <label className="checkout-label">
                      FULL NAME
                    </label>

                    <input
                      required
                      value={form.fullName}
                      onChange={(e) =>
                        updateField("fullName", e.target.value)
                      }
                      className="checkout-input"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="checkout-label">
                      EMAIL
                    </label>

                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        updateField("email", e.target.value)
                      }
                      className="checkout-input"
                      placeholder="you@email.com"
                    />
                  </div>

                  <div>
                    <label className="checkout-label">
                      PHONE
                    </label>

                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        updateField("phone", e.target.value)
                      }
                      className="checkout-input"
                      placeholder="+20"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="checkout-label">
                      DELIVERY ADDRESS
                    </label>

                    <textarea
                      required
                      rows="3"
                      value={form.address}
                      onChange={(e) =>
                        updateField("address", e.target.value)
                      }
                      className="checkout-input resize-none"
                      placeholder="Street, building, city..."
                    />
                  </div>

                </div>

                {/* Payment */}
                <div className="pt-4">

                  <label className="checkout-label mb-3">
                    PAYMENT METHOD
                  </label>

                  <div className="grid grid-cols-2 gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        setPaymentMethod("visa")
                      }
                      className={`py-3 border text-[8px] tracking-[0.2em] transition-all cursor-pointer ${
                        paymentMethod === "visa"
                          ? "border-[#E58080] text-[#E58080] bg-[#3D141A]/40"
                          : "border-[#3D141A] text-[#806F6F]"
                      }`}
                    >
                      CARD / VISA
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setPaymentMethod("cash")
                      }
                      className={`py-3 border text-[8px] tracking-[0.2em] transition-all cursor-pointer ${
                        paymentMethod === "cash"
                          ? "border-[#E58080] text-[#E58080] bg-[#3D141A]/40"
                          : "border-[#3D141A] text-[#806F6F]"
                      }`}
                    >
                      CASH ON DELIVERY
                    </button>

                  </div>
                </div>

                {/* Card */}
                {paymentMethod === "visa" && (
                  <div className="grid grid-cols-2 gap-4">

                    <div className="col-span-2">
                      <label className="checkout-label">
                        CARD NUMBER
                      </label>

                      <input
                        required
                        value={form.cardNumber}
                        onChange={(e) =>
                          updateField(
                            "cardNumber",
                            e.target.value
                          )
                        }
                        className="checkout-input"
                        placeholder="•••• •••• •••• ••••"
                        inputMode="numeric"
                      />
                    </div>

                    <div>
                      <label className="checkout-label">
                        EXPIRY
                      </label>

                      <input
                        required
                        value={form.expiry}
                        onChange={(e) =>
                          updateField(
                            "expiry",
                            e.target.value
                          )
                        }
                        className="checkout-input"
                        placeholder="MM / YY"
                      />
                    </div>

                    <div>
                      <label className="checkout-label">
                        CVV
                      </label>

                      <input
                        required
                        value={form.cvv}
                        onChange={(e) =>
                          updateField("cvv", e.target.value)
                        }
                        className="checkout-input"
                        placeholder="•••"
                        inputMode="numeric"
                      />
                    </div>

                  </div>
                )}

                {paymentMethod === "cash" && (
                  <div className="border border-[#3D141A] bg-[#100306] p-4">
                    <p className="text-[9px] text-[#A89292] leading-6">
                      You will pay the total amount of{" "}
                      <span className="text-[#E58080]">
                        ${total}
                      </span>{" "}
                      when your order arrives.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="group relative overflow-hidden w-full mt-3 py-4 bg-[#6D1F2D] hover:bg-[#7D2735] text-[#FDF8F5] text-[9px] tracking-[0.3em] transition-all disabled:opacity-50 cursor-pointer"
                >
                  <span className="relative z-10">
                    {isProcessing
                      ? "PROCESSING..."
                      : `PLACE ORDER — $${total}`}
                  </span>

                  {!isProcessing && (
                    <span className="absolute inset-0 bg-[#8C2A38] translate-y-full group-hover:translate-y-0 transition-transform duration-400" />
                  )}
                </button>

                <p className="text-center text-[7px] tracking-[0.2em] text-[#604C4C]">
                  YOUR INFORMATION IS SECURE & CONFIDENTIAL
                </p>

              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-label {
          display: block;
          font-size: 8px;
          letter-spacing: .25em;
          color: #705D5D;
          margin-bottom: 8px;
        }

        .checkout-input {
          width: 100%;
          background: #100306;
          border: 1px solid #3D141A;
          color: #FDF8F5;
          padding: 13px 14px;
          font-size: 11px;
          outline: none;
          transition: all .3s ease;
        }

        .checkout-input::placeholder {
          color: #604C4C;
        }

        .checkout-input:focus {
          border-color: #E58080;
          background: #120406;
        }
      `}</style>
    </div>
  );
};

export default CheckoutModal;