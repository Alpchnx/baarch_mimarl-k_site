import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Hata mesajını temizle
    if (error) setError("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // localStorage'dan anket seçimlerini al
      const quizAnswers = localStorage.getItem("quizAnswers");
      let quizData = null;

      if (quizAnswers) {
        try {
          quizData = JSON.parse(quizAnswers);
        } catch (err) {
          console.error("Anket verileri okunamadı:", err);
        }
      }

      // Mail içeriğini oluştur
      let emailBody = `Kullanıcı Bilgileri:\nAd: ${form.firstName}\nSoyad: ${
        form.lastName
      }\nEmail: ${form.email}\nTelefon: ${form.phone}\nNot: ${
        form.message || "Yok"
      }`;

      // Eğer anket seçimleri varsa ekle
      if (quizData && Array.isArray(quizData) && quizData.length > 0) {
        emailBody += `\n\nAnket Seçenekleri:\n`;
        quizData.forEach((answer, index) => {
          emailBody += `${index + 1}: ${answer.question}\n   Cevap: ${
            answer.answer
          }\n\n`;
        });
      }

      // mailto linki oluştur
      const subject = "İletişim Formu - Yeni Mesaj";
      const mailtoLink = `mailto:baarchmimarlik@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(emailBody)}`;

      // Mail gönder
      window.location.href = mailtoLink;

      // Başarı mesajını göster
      setSubmitted(true);
      setIsSubmitting(false);

      // Formu temizle
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });

      // Anket seçimlerini temizle (isteğe bağlı - kullanıcı tekrar göndermek isteyebilir)
      // localStorage.removeItem('quizAnswers');
    } catch (err) {
      console.error("Form gönderilirken hata oluştu:", err);
      setError("Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form className="contact-form-modern" onSubmit={onSubmit}>
        <div className="form-row">
          <label className="form-label">
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              placeholder="Adınız"
              className="form-input"
              required
              disabled={isSubmitting}
            />
          </label>
          <label className="form-label">
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              placeholder="Soyadınız"
              className="form-input"
              required
              disabled={isSubmitting}
            />
          </label>
        </div>

        <label className="form-label">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="E-Mail"
            className="form-input"
            required
            disabled={isSubmitting}
          />
        </label>

        <label className="form-label">
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="Telefon"
            className="form-input"
            required
            disabled={isSubmitting}
          />
        </label>

        <label className="form-label">
          <textarea
            name="message"
            rows="5"
            value={form.message}
            onChange={onChange}
            placeholder="Mesajınız"
            className="form-textarea"
            required
            disabled={isSubmitting}
          ></textarea>
        </label>

        {error && <div className="contact-error-message">{error}</div>}

        {submitted && (
          <div className="contact-success-message">
            Bilgileriniz başarıyla iletildi. En kısa sürede sizinle iletişime
            geçeceğiz.
          </div>
        )}

        <button
          type="submit"
          className="contact-submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Gönderiliyor..." : "Gönder"}
        </button>
      </form>
    </>
  );
}
