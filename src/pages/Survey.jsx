import React, { useState, useEffect } from "react";

const styleDescriptions = {
  industrial: {
    title: "Cesur ve Özgün Endüstriyel Loft",
    keywords: "Ham, Dürüst, Karakterli, Fonksiyonel.",
    description:
      "Sen, hikayesi olan mekanları seviyorsun. Sıvaları dökülmüş bir tuğla duvar ya da görünürdeki tesisat boruları senin için bir kusur değil, tasarımın kendisi. Metal, beton ve işlenmemiş ahşabın soğuk-sıcak dengesiyle ruhunu besliyorsun. Yaşam alanında maksimum işlevsellik ve minimum gösteriş arayanlardansın.",
  },
  midcentury: {
    title: "Sıcak ve Zamansız Mid-Century Modern",
    keywords: "Organik, Retro, Oyunbaz, Akışkan.",
    description:
      "Seni en iyi 1950'lerin neşesi ve İskandinav sadeliğinin birleşimi tanımlar. Eğrilerin hakim olduğu sehpa ayakları, teak ağacının sıcaklığı ve hardal sarısı, zeytin yeşili gibi doğadan ilham alan renkler sana huzur verir. Mekanlarında form ile fonksiyonun kusursuz uyumunu arayan, zamansız ve samimi bir ruha sahipsin.",
  },
  minimalist: {
    title: "Sakin ve Seçici Minimalist",
    keywords: "Nötr, Sade, Düzenli, Huzurlu.",
    description:
      '"Az, çoktur" felsefesi senin tasarım rehberin. Göz yoran karmaşadan uzaksın; her eşyanın bir anlamı ve işlevi olmalı. Siyah, beyaz ve bej gibi nötr renk paletleri, düz çizgiler ve geniş boş alanlar sana nefes aldırır. Tasarımda dinginliği, ferahlığı ve mükemmel düzeni arayan bir vizyonun var.',
  },
  neoclassical: {
    title: "Görkemli ve Zarif Neoklasik",
    keywords: "Lüks, Asil, Simetrik, Göz Alıcı.",
    description:
      "Sen, lüksü seven ancak bunu abartıdan uzak, dengeli bir zarafetle sunan bir ruha sahipsin. Simetri, mermer dokular, kadife kumaşlar ve altın/pirinç detaylar senin mekanlarında olmazsa olmaz. Klasik mimarinin gücünü, modern dokunuşlarla birleştirerek ihtişamlı ve sofistike bir yaşam alanı yaratmayı seviyorsun.",
  },
};

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
      'Bu dört oturma alanından hangisi size "sıcak bir karşılama" hissi veriyor?',
    type: "image",
    options: [
      {
        text: "Industrial",
        value: "industrial",
        image: "/assets/anket/4)industurial living.jpg",
      },
      {
        text: "Mid-Century Modern",
        value: "midcentury",
        image: "/assets/anket/4)midcenturymodernliving.jpg",
      },
      {
        text: "Minimalist",
        value: "minimalist",
        image: "/assets/anket/4)minimalistliving.jpg",
      },
      {
        text: "Neoclassical",
        value: "neoclassical",
        image: "/assets/anket/4)neoclassicalliving.jpg",
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
        text: "Industrial",
        value: "industrial",
        image: "/assets/anket/5)industrialcolorpalette.jpg",
      },
      {
        text: "Mid-Century Modern",
        value: "midcentury",
        image: "/assets/anket/5)midcenturymoderncolorpalette.jpg",
      },
      {
        text: "Minimalist",
        value: "minimalist",
        image: "/assets/anket/5)minimalistcolorpalette.jpg",
      },
      {
        text: "Neoclassical",
        value: "neoclassical",
        image: "/assets/anket/5)neoclasicalcolorpalette.jpg",
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
        text: "Industrial",
        value: "industrial",
        image: "/assets/anket/6)industrialbedroom.jpg",
      },
      {
        text: "Mid-Century Modern",
        value: "midcentury",
        image: "/assets/anket/6)midcenturymodernbedroom.jpg",
      },
      {
        text: "Minimalist",
        value: "minimalist",
        image: "/assets/anket/6)minimalistbedroom.jpg",
      },
      {
        text: "Neoclassical",
        value: "neoclassical",
        image: "/assets/anket/6)neoclassicalbedroom.jpg",
      },
    ],
  },
];

export default function Survey({ onNavigate }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherText, setOtherText] = useState("");
  const [contactData, setContactData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [detectedStyle, setDetectedStyle] = useState(null);

  useEffect(() => {
    // 4, 5, 6. sorulardaki seçimlere göre stil belirle
    if (answers[4] && answers[5] && answers[6]) {
      const styles = [answers[4].value, answers[5].value, answers[6].value];
      const styleCounts = {};
      styles.forEach((style) => {
        styleCounts[style] = (styleCounts[style] || 0) + 1;
      });
      const mostCommon = Object.keys(styleCounts).reduce((a, b) =>
        styleCounts[a] > styleCounts[b] ? a : b
      );
      setDetectedStyle(mostCommon);
    }
  }, [answers]);

  const handleBack = () => {
    if (currentQuestion > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setShowOtherInput(false);
        setOtherText("");
        setSelectedOption(null);
        setIsAnimating(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    }
  };

  const handleAnswer = (option) => {
    if (isAnimating) return;

    const question = questions[currentQuestion];

    if (option.value === "diger" && !showOtherInput) {
      setShowOtherInput(true);
      return;
    }

    const answerValue = option.value === "diger" ? otherText : option.text;

    if (option.value === "diger" && !otherText.trim()) {
      return;
    }

    setIsAnimating(true);
    setSelectedOption(option.value);

    setAnswers({
      ...answers,
      [question.id]: {
        question: question.question,
        answer: answerValue,
        value: option.value,
      },
    });

    setTimeout(() => {
      setShowOtherInput(false);
      setOtherText("");
      setSelectedOption(null);
      setIsAnimating(false);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Son soruya geçildi, iletişim formuna geç
        setCurrentQuestion(questions.length);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 500);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!contactData.name.trim()) {
      newErrors.name = "Ad Soyad gereklidir";
    }
    if (!contactData.phone.trim()) {
      newErrors.phone = "Telefon numarası gereklidir";
    }
    if (
      contactData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)
    ) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // answers objesini array formatına dönüştür
      const answersArray = Object.values(answers).map((answer) => ({
        question: answer.question,
        answer: answer.answer,
      }));

      const response = await fetch("https://baarchmimarlik.com/api/save.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: contactData,
          answers: answersArray,
          detectedStyle: detectedStyle,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Sonuç ekranına geç
        setCurrentQuestion(questions.length + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error(result.error || "Kayıt başarısız");
      }
    } catch (error) {
      console.error("API kayıt hatası:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const currentQ = questions[currentQuestion];
  const progress =
    currentQuestion < questions.length
      ? ((currentQuestion + 1) / (questions.length + 1)) * 100
      : 100;
  const isContactForm = currentQuestion === questions.length;
  const isResult = currentQuestion > questions.length;

  if (isResult && detectedStyle) {
    const styleInfo = styleDescriptions[detectedStyle];
    return (
      <section className="survey-section survey-result-section">
        <div className="survey-container">
          <div className="survey-result-content">
            <div className="survey-result-header">
              <h1 className="survey-result-title">İşte Senin Tarzın</h1>
              <h2 className="survey-result-style">{styleInfo.title}</h2>
            </div>
            {styleInfo.keywords && (
              <div className="survey-result-keywords">
                <h3 className="survey-keywords-title">
                  Senin Tarzını Anlatan Kelimeler
                </h3>
                <p className="survey-keywords-text">{styleInfo.keywords}</p>
              </div>
            )}
            <p className="survey-result-description">{styleInfo.description}</p>
            <button
              className="survey-cta-button"
              onClick={() => onNavigate("/contact")}
            >
              Ücretsiz Ön Görüşme Planla
            </button>
            <div className="survey-logo-placeholder">
              <img
                src="/assets/logo.png"
                alt="BAARCH Mimarlık"
                className="survey-logo-image"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isContactForm) {
    return (
      <section className="survey-section">
        <div className="survey-container">
          {/* Premium Hero Başlık */}
          <div className="survey-hero-header">
            <h1 className="survey-hero-title">
              <span className="survey-hero-title-accent">Stil Analizi:</span>
              <br />
              Yaşam Alanınızın Kimliğini Keşfedin
            </h1>
          </div>

          <div
            className={`survey-question-card ${
              isAnimating ? "fade-out" : "fade-in"
            }`}
          >
            {/* Geri Butonu */}
            <button
              className="survey-back-button"
              onClick={() => setCurrentQuestion(questions.length - 1)}
              type="button"
            >
              ← Geri
            </button>

            <div className="survey-progress-bar">
              <div
                className="survey-progress-fill"
                style={{ width: "100%" }}
              ></div>
            </div>
            <div className="survey-question-number">
              {questions.length + 1} / {questions.length + 1}
            </div>
            <h2 className="survey-question-title">
              Tasarım tarzınızı ve size özel hazırladığımız örnek görseli görmek
              için iletişim bilgilerinizi giriniz:
            </h2>
            <form
              className="survey-contact-form"
              onSubmit={handleContactSubmit}
            >
              <div className="survey-form-group">
                <label className="survey-form-label">
                  Ad Soyad <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className={`survey-form-input ${errors.name ? "error" : ""}`}
                  value={contactData.name}
                  onChange={handleInputChange}
                  placeholder="Adınız ve Soyadınız"
                />
                {errors.name && (
                  <span className="survey-error">{errors.name}</span>
                )}
              </div>
              <div className="survey-form-group">
                <label className="survey-form-label">
                  Telefon No <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  className={`survey-form-input ${errors.phone ? "error" : ""}`}
                  value={contactData.phone}
                  onChange={handleInputChange}
                  placeholder="05XX XXX XX XX"
                />
                {errors.phone && (
                  <span className="survey-error">{errors.phone}</span>
                )}
              </div>
              <div className="survey-form-group">
                <label className="survey-form-label">
                  E-posta (isteğe bağlı)
                </label>
                <input
                  type="email"
                  name="email"
                  className={`survey-form-input ${errors.email ? "error" : ""}`}
                  value={contactData.email}
                  onChange={handleInputChange}
                  placeholder="ornek@email.com"
                />
                {errors.email && (
                  <span className="survey-error">{errors.email}</span>
                )}
              </div>
              <button type="submit" className="survey-submit-button">
                Sonuçları Gör
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="survey-section">
      <div className="survey-container">
        {/* Premium Hero Başlık */}
        <div className="survey-hero-header">
          <h1 className="survey-hero-title">
            <span className="survey-hero-title-accent">Stil Analizi:</span>
            <br />
            Yaşam Alanınızın Kimliğini Keşfedin
          </h1>
        </div>

        <div
          className={`survey-question-card ${
            isAnimating ? "fade-out" : "fade-in"
          }`}
        >
          {/* Geri Butonu */}
          {currentQuestion > 0 && (
            <button
              className="survey-back-button"
              onClick={handleBack}
              type="button"
            >
              ← Geri
            </button>
          )}

          <div className="survey-progress-bar">
            <div
              className="survey-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="survey-question-number">
            {currentQuestion + 1} / {questions.length}
          </div>
          <h2 className="survey-question-title">{currentQ.question}</h2>

          {currentQ.type === "image" ? (
            <div className="survey-image-grid">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  className={`survey-image-option ${
                    selectedOption === option.value ? "selected" : ""
                  }`}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnimating}
                >
                  <div className="survey-image-wrapper">
                    <img src={option.image} alt={option.text} />
                  </div>
                  <span className="survey-image-label">{option.text}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="survey-text-options">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  className={`survey-text-option ${
                    selectedOption === option.value ? "selected" : ""
                  }`}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnimating}
                >
                  {option.text}
                </button>
              ))}
              {showOtherInput && (
                <div className="survey-other-input-wrapper">
                  <input
                    type="text"
                    className="survey-other-input"
                    placeholder="Lütfen belirtiniz..."
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && otherText.trim()) {
                        handleAnswer({
                          value: "diger",
                          text: otherText.trim(),
                        });
                      }
                    }}
                    autoFocus
                  />
                  <button
                    className="survey-other-submit"
                    onClick={() => {
                      if (otherText.trim()) {
                        handleAnswer({
                          value: "diger",
                          text: otherText.trim(),
                        });
                      }
                    }}
                  >
                    Devam Et
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
