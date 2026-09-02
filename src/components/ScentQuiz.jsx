import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { products } from "../data/products";

function ScentQuiz({ onSelectProduct }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const questions = [
    {
      question: "What kind of presence do you want?",
      options: [
        { text: "Dark & Mysterious", type: "dark" },
        { text: "Soft & Feminine", type: "soft" },
        { text: "Bold & Powerful", type: "bold" },
        { text: "Warm & Sensual", type: "warm" },
      ],
    },
    {
      question: "Which atmosphere speaks to you?",
      options: [
        { text: "Midnight", type: "dark" },
        { text: "Rose Garden", type: "soft" },
        { text: "Velvet Lounge", type: "bold" },
        { text: "Candlelit Room", type: "warm" },
      ],
    },
    {
      question: "Choose a signature note.",
      options: [
        { text: "Amber & Smoke", type: "dark" },
        { text: "Rose & Musk", type: "soft" },
        { text: "Saffron & Leather", type: "bold" },
        { text: "Vanilla & Cacao", type: "warm" },
      ],
    },
    {
      question: "How should your fragrance feel?",
      options: [
        { text: "Intriguing", type: "dark" },
        { text: "Elegant", type: "soft" },
        { text: "Commanding", type: "bold" },
        { text: "Addictive", type: "warm" },
      ],
    },
  ];

  /*
    كل شخصية ليها أكتر من برفيوم.
    بالتالي النتيجة مش هتكون مرتبطة ببرفيوم واحد ثابت.
  */
  const perfumeMatches = {
    dark: [4, 6, 11],
    soft: [3, 5, 9],
    bold: [2, 7, 10],
    warm: [1, 8, 6],
  };

  const openQuiz = (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    setStep(0);
    setAnswers([]);
    setResult(null);
    setIsOpen(true);
  };

  const closeQuiz = (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    setIsOpen(false);
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  const handleAnswer = (type) => {
    const newAnswers = [...answers, type];

    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }

    /*
      نحسب الشخصية الأكثر تكرارًا.
    */
    const scores = {
      dark: 0,
      soft: 0,
      bold: 0,
      warm: 0,
    };

    newAnswers.forEach((answer) => {
      scores[answer] += 1;
    });

    /*
      نجيب أعلى شخصية.
    */
    const highestScore = Math.max(...Object.values(scores));

    const winningTypes = Object.keys(scores).filter(
      (type) => scores[type] === highestScore
    );

    /*
      لو حصل تعادل، نستخدم آخر إجابة لكسر التعادل.
    */
    let winningType = winningTypes[0];

    for (let i = newAnswers.length - 1; i >= 0; i--) {
      if (winningTypes.includes(newAnswers[i])) {
        winningType = newAnswers[i];
        break;
      }
    }

    /*
      البرفيومات المناسبة للشخصية.
    */
    const possibleProducts = perfumeMatches[winningType];

    /*
      نختار برفيوم مختلف من المجموعة
      بناءً على مجموع الإجابات.
    */
    const answerNumber = newAnswers.reduce((total, answer) => {
      return total + answer.length;
    }, 0);

    const selectedIndex = answerNumber % possibleProducts.length;

    const selectedProductId = possibleProducts[selectedIndex];

    const recommendedProduct = products.find(
      (product) => product.id === selectedProductId
    );

    setResult(recommendedProduct);
  };

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const quizSection = (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#6D1F2D]/10 blur-[140px]" />

        <div className="absolute top-0 left-0 w-40 h-40 bg-[#3D141A]/20 blur-[100px]" />

        <div className="absolute bottom-0 right-0 w-52 h-52 bg-[#7D2735]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span className="block text-[#E58080] text-[9px] tracking-[0.45em] mb-5">
          DISCOVER YOUR SCENT
        </span>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#FDF8F5] mb-6">
          Find Your Signature
        </h2>

        <p className="max-w-xl mx-auto text-[#A89292] text-sm leading-7 mb-10">
          Answer a few questions and discover the AÊTRE fragrance
          that was made for your personality.
        </p>

        <button
          type="button"
          onClick={openQuiz}
          className="relative z-20 inline-flex items-center justify-center px-9 py-4 border border-[#E58080] text-[#E58080] text-[9px] tracking-[0.3em] hover:bg-[#E58080] hover:text-[#080203] transition-all duration-500 cursor-pointer"
        >
          FIND MY SCENT
        </button>
      </div>
    </section>
  );

  const quizModal = isOpen ? (
    <div
      className="fixed inset-0 z-[999999] w-screen h-screen bg-[#080203]/95 backdrop-blur-md overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8">
        <div
          className="relative w-full max-w-2xl bg-[#0D0305] border border-[#6D1F2D] shadow-[0_0_80px_rgba(61,20,26,0.6)]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={closeQuiz}
            className="absolute top-5 right-5 z-30 w-9 h-9 flex items-center justify-center border border-[#3D141A] text-[#A89292] hover:text-[#FDF8F5] hover:border-[#E58080] transition-all"
          >
            ×
          </button>

          {!result ? (
            <div className="p-7 sm:p-12">
              <div className="text-center mb-10">
                <span className="text-[#E58080] text-[8px] tracking-[0.4em]">
                  AÊTRE SCENT QUIZ
                </span>

                <div className="flex justify-center gap-2 mt-6">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`h-[2px] transition-all duration-500 ${
                        index <= step
                          ? "w-10 bg-[#E58080]"
                          : "w-5 bg-[#3D141A]"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center">
                <span className="block text-[#A89292] text-[9px] tracking-[0.3em] mb-5">
                  QUESTION {step + 1} / {questions.length}
                </span>

                <h3 className="text-2xl sm:text-3xl font-serif text-[#FDF8F5] mb-10">
                  {questions[step].question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {questions[step].options.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleAnswer(option.type)}
                      className="group relative text-left p-5 border border-[#3D141A] bg-[#100306] hover:border-[#E58080] hover:bg-[#18060A] transition-all duration-500"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[#FDF8F5] text-sm group-hover:text-[#E58080] transition-colors">
                          {option.text}
                        </span>

                        <span className="text-[#6D1F2D] group-hover:text-[#E58080] transition-colors">
                          →
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-7 sm:p-12">
              <div className="text-center mb-8">
                <span className="text-[#E58080] text-[8px] tracking-[0.4em]">
                  YOUR SIGNATURE SCENT
                </span>

                <h3 className="text-3xl sm:text-4xl font-serif text-[#FDF8F5] mt-4">
                  We Found Your Match
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* الصورة كاملة بدون قص */}
                <div className="relative aspect-square bg-[#100306] border border-[#3D141A] overflow-hidden flex items-center justify-center p-5 sm:p-8">
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-full h-full object-contain object-center"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#080203]/20 to-transparent pointer-events-none" />
                </div>

                <div>
                  <span className="text-[#E58080] text-[8px] tracking-[0.3em]">
                    {result.category}
                  </span>

                  <h4 className="text-2xl sm:text-3xl font-serif text-[#FDF8F5] mt-3 mb-4">
                    {result.name}
                  </h4>

                  <p className="text-[#A89292] text-sm leading-7 mb-6">
                    {result.notes}
                  </p>

                  <div className="text-[#FDF8F5] text-xl mb-7">
                    ${result.price}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      closeQuiz();

                      setTimeout(() => {
                        if (onSelectProduct) {
                          onSelectProduct(result);
                        }
                      }, 100);
                    }}
                    className="w-full py-4 bg-[#E58080] text-[#080203] text-[9px] tracking-[0.25em] hover:bg-[#FDF8F5] transition-all duration-500"
                  >
                    DISCOVER THIS FRAGRANCE
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(0);
                      setAnswers([]);
                      setResult(null);
                    }}
                    className="w-full mt-3 py-4 border border-[#3D141A] text-[#A89292] text-[9px] tracking-[0.25em] hover:border-[#E58080] hover:text-[#E58080] transition-all"
                  >
                    TAKE THE QUIZ AGAIN
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {quizSection}

      {typeof document !== "undefined" &&
        createPortal(quizModal, document.body)}
    </>
  );
}

export default ScentQuiz;