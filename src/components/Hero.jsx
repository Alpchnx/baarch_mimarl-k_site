import React from "react";

export default function Hero({ onNavigate }) {
  return (
    <section className="hero">
      {/* Background video - place a file at public/assets/hero.mp4 or change the src */}
      <video
        className="hero-video"
        src="/assets/background.mp4"
        poster="/assets/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="hero-overlay"></div>
      <div className="container hero-inner">
        <h1 className="hero-title">
          Her Detayıyla Sizi Yansıtan
          <br />
          <span className="hero-title-accent">Mimari Projeler</span>
        </h1>
        <p className="hero-subtitle">
          Her mekânın içinde keşfedilmeyi bekleyen bir potansiyel vardır. Bizim
          işimiz, onu ortaya çıkarmak.
        </p>
        <div className="hero-actions">
          <button
            className="btn btn-primary"
            onClick={() => onNavigate("/survey")}
          >
            Tarzını Keşfet
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => onNavigate("/projects")}
          >
            Projeleri Gör
          </button>
        </div>
      </div>
    </section>
  );
}
