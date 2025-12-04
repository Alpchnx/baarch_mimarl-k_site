import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>© {year} Baarch Mimarlık</div>
        <div className="muted">Modern mimarlık ve iç mimari çözümleri</div>
      </div>
    </footer>
  );
}


