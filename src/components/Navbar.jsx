import React, { useEffect, useState } from "react";

export default function Navbar({ currentPath, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = currentPath === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobil menü açıldığında body scroll'unu engelle
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const link = (path, label) => (
    <button
      onClick={() => {
        onNavigate(path);
        setIsMobileMenuOpen(false);
      }}
      className={`nav-link ${currentPath === path ? "active" : ""}`}
      aria-current={currentPath === path ? "page" : undefined}
    >
      {label}
    </button>
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header
        className={`navbar ${isHome ? "navbar-home" : "navbar-default"} ${
          isScrolled ? "scrolled" : ""
        } ${isMobileMenuOpen ? "mobile-menu-active" : ""}`}
      >
        <div className="container nav-inner">
          <div className="brand brand-logo" onClick={() => onNavigate("/")}>
            <img
              src="/assets/logo.png"
              alt="BAARCH Mimarlık"
              className="navbar-logo"
            />
          </div>
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? "active" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Menüyü aç/kapat"
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav
            className={`nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`}
            aria-label="Primary Navigation"
            style={isMobileMenuOpen ? { display: 'flex' } : {}}
          >
            {link("/", "Anasayfa")}
            {link("/projects", "Projeler")}
            {link("/services", "Hizmetlerimiz")}
            {link("/products", "Ürünlerimiz")}
            {link("/about", "Hakkımızda")}
            {link("/contact", "İletişim")}
          </nav>
        </div>
      </header>
      {/* Mobil menü overlay/backdrop */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
}
