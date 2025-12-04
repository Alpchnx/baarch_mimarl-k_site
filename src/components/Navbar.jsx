import React, { useEffect, useState } from "react";

export default function Navbar({ currentPath, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = currentPath === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const link = (path, label) => (
    <button
      onClick={() => onNavigate(path)}
      className={`nav-link ${currentPath === path ? "active" : ""}`}
      aria-current={currentPath === path ? "page" : undefined}
    >
      {label}
    </button>
  );

  return (
    <header
      className={`navbar ${isHome ? "navbar-home" : "navbar-default"} ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="container nav-inner">
        <div className="brand brand-logo" onClick={() => onNavigate("/")}>
          <img
            src="/assets/logo.png"
            alt="BAARCH Mimarlık"
            className="navbar-logo"
          />
        </div>
        <nav className="nav-links" aria-label="Primary Navigation">
          {link("/", "Anasayfa")}
          {link("/projects", "Projeler")}
          {link("/services", "Hizmetlerimiz")}
          {link("/products", "Ürünlerimiz")}
          {link("/about", "Hakkımızda")}
          {link("/contact", "İletişim")}
        </nav>
      </div>
    </header>
  );
}
