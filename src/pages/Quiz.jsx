import React, { useState, useEffect, useRef } from "react";

const questions = [
  {
    id: 1,
    question: "Hangi tür bir proje için yardım arıyorsunuz?",
    type: "text",
    options: [
      { text: "Konut: Ev, Villa, Stüdyo Daire, Yazlık", value: "konut" },
      {
        text: "Ticari: Kafe/Restoran, Ofis/Çalışma Alanı, Mağaza/Perakende, Otel/AirBnB",
        value: "ticari",
      },
      { text: "Diğer: lütfen belirtiniz", value: "diger" },
    ],
  },
  {
    id: 2,
    question: "Projenizin tahmini başlangıç/teslim tarihi nedir?",
    type: "text",
    options: [
      { text: "Hemen/1 Ay İçinde", value: "hemen" },
      { text: "1-3 Ay İçinde", value: "1-3ay" },
      { text: "3-6 Ay İçinde", value: "3-6ay" },
      { text: "6 Aydan Daha Uzun", value: "6ay+" },
    ],
  },
  {
    id: 3,
    question:
      "Tasarım ve uygulama için ayırdığınız ortalama bütçe aralığı nedir?",
    type: "text",
    options: [
      { text: "100.000 TL'ye Kadar", value: "100k" },
      { text: "100.000 - 300.000 TL", value: "100-300k" },
      { text: "300.000 - 600.000 TL", value: "300-600k" },
      { text: "600.000 TL ve Üzeri", value: "600k+" },
    ],
  },
  {
    id: 4,
    question:
      "Bu dört oturma alanından hangisi size 'sıcak bir karşılama' hissi veriyor?",
    type: "image",
    options: [
      {
        text: "Minimalist",
        value: "minimalist",
        image: "/assets/anket/4)minimalist living room.jpg",
      },
      {
        text: "Mid-Century Modern",
        value: "midcentury",
        image: "/assets/anket/4)midcenturymodern living room.jpg",
      },
      {
        text: "Neoclassical",
        value: "neoclassical",
        image: "/assets/anket/4)neoclassical living.jpg",
      },
      {
        text: "Industrial",
        value: "industrial",
        image: "/assets/anket/4)industurial living.jpg",
      },
    ],
  },
  {
    id: 5,
    question:
      "Çalışma veya yemek yeme alanınızda hangi doku ve renk paleti sizi daha motive eder?",
    type: "image",
    options: [
      {
        text: "Minimalist",
        value: "minimalist",
        image: "/assets/anket/5)minimalist color palette.jpg",
      },
      {
        text: "Mid-Century Modern",
        value: "midcentury",
        image: "/assets/anket/5)midcenturymodern color palette.jpg",
      },
      {
        text: "Neoclassical",
        value: "neoclassical",
        image: "/assets/anket/5)neoclasical color palette.jpg",
      },
      {
        text: "Industrial",
        value: "industrial",
        image: "/assets/anket/5)industrial color palette.jpg",
      },
    ],
  },
  {
    id: 6,
    question:
      "Günün yorgunluğunu atmak için hangi yatak odası atmosferini tercih ederdiniz?",
    type: "image",
    options: [
      {
        text: "Minimalist",
        value: "minimalist",
        image: "/assets/anket/6)minimalist bedroom.jpg",
      },
      {
        text: "Mid-Century Modern",
        value: "midcentury",
        image: "/assets/anket/6)midcenturymodern bedroom.jpg",
      },
      {
        text: "Neoclassical",
        value: "neoclassical",
        image: "/assets/anket/6)neoclassical bedroom.jpg",
      },
      {
        text: "Industrial",
        value: "industrial",
        image: "/assets/anket/6)industrial bedroom.jpg",
      },
    ],
  },
];

export default function Quiz({ onNavigate }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherText, setOtherText] = useState("");
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const refsArray = sectionRefs.current;
    refsArray.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refsArray.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [currentQuestion]);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const handleAnswer = (option) => {
    const question = questions[currentQuestion];

    // "Diğer" seçeneğine tıklandığında input göster
    if (option.value === "diger" && !showOtherInput) {
      setShowOtherInput(true);
      return;
    }

    // Input'tan gelen cevabı kaydet
    const answerValue = option.value === "diger" ? otherText : option.text;

    if (option.value === "diger" && !otherText.trim()) {
      return; // Boş bırakılamaz
    }

    setAnswers({
      ...answers,
      [question.id]: {
        question: question.question,
        answer: answerValue,
      },
    });

    setShowOtherInput(false);
    setOtherText("");

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 400);
    } else {
      // Anket tamamlandı
      setTimeout(() => {
        handleSubmit();
      }, 400);
    }
  };

  const handleSubmit = () => {
    const emailBody = `
Anket Sonuçları:

${Object.entries(answers)
  .map(([id, data]) => `${id}. ${data.question}\n   Cevap: ${data.answer}`)
  .join("\n\n")}
    `.trim();

    const mailtoLink = `mailto:baarchmimarlik@gmail.com?subject=Tarzını Keşfet Anketi&body=${encodeURIComponent(
      emailBody
    )}`;
    window.location.href = mailtoLink;
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowOtherInput(false);
      setOtherText("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isComplete = Object.keys(answers).length === questions.length;

  return (
    <section className="quiz-page-section">
      <div className="container">
        <div className="quiz-page-header" ref={addToRefs}>
          <h1 className="quiz-page-title">Tarzını Keşfet</h1>
          <p className="quiz-page-subtitle">
            Birkaç soruya cevap verin, size özel tasarım önerileri sunalım
          </p>
        </div>

        <div className="quiz-page-progress" ref={addToRefs}>
          <div className="quiz-page-progress-bar">
            <div
              className="quiz-page-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="quiz-page-progress-text">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        {!isComplete && (
          <div className="quiz-page-content" ref={addToRefs}>
            <div className="quiz-page-question">
              <h2 className="quiz-question-title">{currentQ.question}</h2>
            </div>

            <div
              className={`quiz-page-options ${
                currentQ.type === "image"
                  ? "quiz-options-image"
                  : "quiz-options-text"
              }`}
            >
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  className={`quiz-page-option ${
                    currentQ.type === "image"
                      ? "quiz-option-image"
                      : "quiz-option-text"
                  }`}
                  onClick={() => handleAnswer(option)}
                >
                  {currentQ.type === "image" && (
                    <div className="quiz-option-image-wrapper">
                      <img
                        src={option.image}
                        alt={option.text}
                        className="quiz-option-image"
                      />
                    </div>
                  )}
                  <span className="quiz-option-label">{option.text}</span>
                </button>
              ))}
            </div>

            {showOtherInput && (
              <div className="quiz-other-input-wrapper" ref={addToRefs}>
                <input
                  type="text"
                  className="quiz-other-input"
                  placeholder="Lütfen belirtiniz..."
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && otherText.trim()) {
                      handleAnswer({ value: "diger", text: otherText.trim() });
                    }
                  }}
                />
                <button
                  className="quiz-other-submit"
                  onClick={() => {
                    if (otherText.trim()) {
                      handleAnswer({ value: "diger", text: otherText.trim() });
                    }
                  }}
                >
                  Devam Et
                </button>
              </div>
            )}

            <div className="quiz-page-navigation">
              {currentQuestion > 0 && (
                <button
                  className="quiz-nav-button quiz-nav-back"
                  onClick={handleBack}
                >
                  ← Geri
                </button>
              )}
            </div>
          </div>
        )}

        {isComplete && (
          <div className="quiz-page-complete" ref={addToRefs}>
            <div className="quiz-complete-icon">✓</div>
            <h2 className="quiz-complete-title">Anket Tamamlandı!</h2>
            <p className="quiz-complete-text">
              Cevaplarınız e-posta ile gönderiliyor...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
