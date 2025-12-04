import React from 'react';

export default function YeniProje({ onNavigate }) {
  const handleBack = () => {
    if (typeof onNavigate === 'function') {
      onNavigate('/projects');
    }
  };

  return (
    <section className="section container">
      <button className="btn btn-ghost" onClick={handleBack}>← Geri</button>
      <div className="detail-hero">
        <div className="background-video placeholder" />
        <div className="overlay" />
        <div className="hero-content">
          <h1>Yeni Proje</h1>
          <p className="muted">Konum • Yıl</p>
        </div>
      </div>

      <div className="detail-meta">
        <h1>Proje Başlığı</h1>
        <p className="muted">Şehir • 2025</p>
      </div>

      <p className="detail-text">
        Bu sayfa, yeni bir proje sayfası oluşturmak için başlangıç şablonudur.
        Metinleri, görselleri ve detayları kendi projenize göre düzenleyebilirsiniz.
      </p>
    </section>
  );
}




