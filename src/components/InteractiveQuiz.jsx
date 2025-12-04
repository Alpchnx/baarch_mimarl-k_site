import React, { useState } from "react";

const questions = [
  {
    id: 1,
    question: "Hangi mimari tarzı tercih edersiniz?",
    options: [
      {
        text: "Modern ve Minimalist",
        value: "modern",
        points: { projects: 3, about: 1, contact: 0 },
      },
      {
        text: "Klasik ve Geleneksel",
        value: "classic",
        points: { projects: 2, about: 2, contact: 0 },
      },
      {
        text: "Sürdürülebilir ve Ekolojik",
        value: "eco",
        points: { projects: 2, about: 1, contact: 1 },
      },
      {
        text: "Endüstriyel ve Brutalist",
        value: "industrial",
        points: { projects: 3, about: 0, contact: 1 },
      },
    ],
  },
  {
    id: 2,
    question: "Projeniz için hangi alanı önceliklendirirsiniz?",
    options: [
      {
        text: "Konut (Ev, Villa)",
        value: "residential",
        points: { projects: 3, about: 0, contact: 1 },
      },
      {
        text: "Ticari (Ofis, Mağaza)",
        value: "commercial",
        points: { projects: 2, about: 1, contact: 1 },
      },
      {
        text: "Kamu (Okul, Hastane)",
        value: "public",
        points: { projects: 1, about: 2, contact: 1 },
      },
      {
        text: "Karma Kullanım",
        value: "mixed",
        points: { projects: 2, about: 1, contact: 1 },
      },
    ],
  },
  {
    id: 3,
    question: "Bütçe planlamanız nasıl?",
    options: [
      {
        text: "Esnek ve Yüksek Bütçe",
        value: "high",
        points: { projects: 1, about: 1, contact: 2 },
      },
      {
        text: "Orta Bütçe, Optimize Çözümler",
        value: "medium",
        points: { projects: 2, about: 1, contact: 1 },
      },
      {
        text: "Sınırlı Bütçe, Yaratıcı Çözümler",
        value: "low",
        points: { projects: 3, about: 0, contact: 1 },
      },
      {
        text: "Henüz Belirsiz",
        value: "unknown",
        points: { projects: 1, about: 2, contact: 1 },
      },
    ],
  },
  {
    id: 4,
    question: "Projeniz için zaman çizelgeniz nedir?",
    options: [
      {
        text: "Acil - 3 Ay İçinde",
        value: "urgent",
        points: { projects: 0, about: 0, contact: 3 },
      },
      {
        text: "Yakın Gelecek - 6 Ay",
        value: "soon",
        points: { projects: 1, about: 1, contact: 2 },
      },
      {
        text: "Planlama Aşaması - 1 Yıl",
        value: "planning",
        points: { projects: 2, about: 2, contact: 0 },
      },
      {
        text: "Fikir Aşaması",
        value: "idea",
        points: { projects: 3, about: 1, contact: 0 },
      },
    ],
  },
];

export default function InteractiveQuiz({ onNavigate }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ projects: 0, about: 0, contact: 0 });
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
    not: "",
  });

  const handleAnswer = (option) => {
    const newScores = {
      projects: scores.projects + option.points.projects,
      about: scores.about + option.points.about,
      contact: scores.contact + option.points.contact,
    };

    setScores(newScores);
    const newSelectedAnswers = [...selectedAnswers, {
      questionId: questions[currentQuestion].id,
      question: questions[currentQuestion].question,
      answer: option.text,
    }];
    setSelectedAnswers(newSelectedAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowButtons(true);
        // Anket seçimlerini localStorage'a kaydet
        localStorage.setItem('quizAnswers', JSON.stringify(newSelectedAnswers));
      }, 300);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ projects: 0, about: 0, contact: 0 });
    setSelectedAnswers([]);
    setShowButtons(false);
    setFormData({
      ad: "",
      soyad: "",
      email: "",
      telefon: "",
      not: "",
    });
    // localStorage'dan anket seçimlerini temizle
    localStorage.removeItem('quizAnswers');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // E-mail içeriğini oluştur
    const emailBody = `
Kullanıcı Bilgileri:
Ad: ${formData.ad}
Soyad: ${formData.soyad}
Telefon: ${formData.telefon}
Email: ${formData.email}
Not: ${formData.not || "Yok"}

Anket Seçenekleri:
${selectedAnswers.map((answer, index) => `${index + 1}: ${answer.question}\n   Cevap: ${answer.answer}`).join("\n\n")}
    `.trim();

    // mailto linki oluştur
    const mailtoLink = `mailto:baarchmimarlik@gmail.com?subject=Anket Sonuçları&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoLink;

    // Başarı mesajını göster
    setShowSuccess(true);
    setTimeout(() => {
      setShowPopup(false);
      setShowSuccess(false);
      resetQuiz();
    }, 2000);
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isComplete = selectedAnswers.length === questions.length;

  return (
    <>
      <section className="quiz-section">
        <div className="container">
          <div className="quiz-container">
            <div className="quiz-header">
              <h2>Size En Uygun Çözümü Bulalım</h2>
              <p>Birkaç soruya cevap verin, size özel öneriler sunalım</p>
            </div>

            <div className="quiz-progress">
              <div
                className="quiz-progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="quiz-content">
              {!isComplete ? (
                <>
                  <div className="quiz-question">
                    <span className="quiz-question-number">
                      Soru {currentQuestion + 1}/{questions.length}
                    </span>
                    <h3>{question.question}</h3>
                  </div>

                  <div className="quiz-options">
                    {question.options.map((option, idx) => (
                      <button
                        key={idx}
                        className="quiz-option"
                        onClick={() => handleAnswer(option)}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="quiz-complete">
                  <div className="quiz-complete-icon">✓</div>
                  <h3>Tüm soruları tamamladınız!</h3>
                  <p>Bilgilerinizi paylaşarak size özel çözümler alabilirsiniz.</p>
                </div>
              )}

              {showButtons && (
                <div className="quiz-action-buttons">
                  <button
                    className="btn btn-ghost quiz-reset-btn"
                    onClick={resetQuiz}
                  >
                    Tekrar Seç
                  </button>
                  <button
                    className="btn btn-primary quiz-submit-btn"
                    onClick={() => setShowPopup(true)}
                  >
                    Bize İlet
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {showPopup && (
        <div className="quiz-popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="quiz-popup" onClick={(e) => e.stopPropagation()}>
            <button
              className="quiz-popup-close"
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>
            <h2 className="quiz-popup-title">Bilgilerinizi Paylaşın</h2>
            
            <div className="quiz-popup-summary">
              <h3>Anket Özeti:</h3>
              {selectedAnswers.map((answer, index) => (
                <div key={index} className="quiz-summary-item">
                  <strong>{answer.question}</strong>
                  <p>{answer.answer}</p>
                </div>
              ))}
            </div>

            <form className="quiz-popup-form" onSubmit={handleSubmit}>
              <div className="quiz-form-row">
                <div className="quiz-form-group">
                  <label htmlFor="ad">Ad *</label>
                  <input
                    type="text"
                    id="ad"
                    name="ad"
                    value={formData.ad}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="quiz-form-group">
                  <label htmlFor="soyad">Soyad *</label>
                  <input
                    type="text"
                    id="soyad"
                    name="soyad"
                    value={formData.soyad}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="quiz-form-group">
                <label htmlFor="email">E-Mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="quiz-form-group">
                <label htmlFor="telefon">Telefon *</label>
                <input
                  type="tel"
                  id="telefon"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="quiz-form-group">
                <label htmlFor="not">Not</label>
                <textarea
                  id="not"
                  name="not"
                  value={formData.not}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>

              <button type="submit" className="btn btn-primary quiz-form-submit">
                Gönder
              </button>
            </form>

            {showSuccess && (
              <div className="quiz-success-message">
                ✓ Form başarıyla gönderildi!
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
