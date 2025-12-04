import React, { useEffect, useRef, useState } from "react";

const products = [
  {
    id: 1,
    title: "Blossom Abajur",
    subtitle: "Işık Taşıyan Zarafet",
    description: "Işığın huzurla dans ettiği an.",
    image: "/assets/Urunlerimiz/abajur.png",
    slug: "blossom-abajur",
  },
  {
    id: 2,
    title: "Petal Vazo",
    subtitle: "Görkemli Açılış",
    description: "Doğanın en asil formu.",
    image: "/assets/Urunlerimiz/33.png",
    slug: "petal-vazo",
  },
  {
    id: 3,
    title: "Serene Servis Tabağı",
    subtitle: "Sonsuz Dinginlik",
    description: "Estetiğin sunumla buluştuğu nokta.",
    image: "/assets/Urunlerimiz/29.png",
    slug: "serene-servis-tabagi",
  },
  {
    id: 4,
    title: "Flora Küçük Kapaklı Kavanoz",
    subtitle: "Sır Tutucu",
    description: "Küçük detaylarda gizlenen büyük zarafet.",
    image: "/assets/Urunlerimiz/kavanoz.png",
    slug: "flora-kucuk-kapakli-kavanoz",
  },
  {
    id: 5,
    title: "Seed Servis Tepsisi",
    subtitle: "Başlangıç ve Kök",
    description: "Her güzel şeyin başladığı temel.",
    image: "/assets/Urunlerimiz/32.png",
    slug: "seed-servis-tepsisi",
  },
  {
    id: 6,
    title: "Bloom Serisi - Özel Set",
    description:
      "Klasik porselenin mirasından ilham alan, modern yaşam alanları için özel koleksiyon.",
    image: "/assets/6.png",
    slug: "bloom-serisi-ozel-set",
  },
];

export default function Products({ onNavigate }) {
  const cardRefs = useRef([]);
  const [touchedCard, setTouchedCard] = useState(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const cardRefsArray = cardRefs.current;
    cardRefsArray.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefsArray.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const handleProductClick = (slug) => {
    if (onNavigate) {
      onNavigate(`/products/${slug}`);
    }
  };

  return (
    <section className="products-section">
      <div className="products-hero">
        <div className="container">
          <h1 className="products-hero-title">imza tasarımlar</h1>
          <div className="products-hero-content">
            <h2 className="products-hero-subtitle">Bloom Serisi</h2>
            <div className="products-hero-description">
              <p>
                Bloom Serisi, porselenin dingin mavisiyle doğanın canlanan
                enerjisini buluşturan, el yapımı tasarım objeleri
                koleksiyonudur. Her bir eser, bir çiçeğin açma anı gibi,
                bulunduğu ortama saf bir neşe ve eşsiz bir estetik katar.
              </p>
              <p>
                Bu seri, evinizin köşelerinde zarafetle kök salacak, mevsimler
                geçse de tazeliğini koruyacak zamansız parçalardan oluşur. Her
                desen, ustalarımızın porselenin üzerine fırça darbesiyle
                bıraktığı bir imza, bir "Yegâne Sanat Formu" hikayesidir.
              </p>
              <p>
                Bloom Serisi; klasik porselenin mirasından ilham alır, ancak
                modern yaşam alanlarının ruhuna uygun, rafine ve ince bir duruş
                sergiler. Bu, sadece bir dekorasyon değil, evinizdeki en özel
                anlarınızı besleyen bir "Sanat Yatırımıdır".
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="products-gallery-section">
        <div className="container">
          <div className="products-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className={`product-card ${
                  touchedCard === product.id ? "touched" : ""
                } ${
                  product.slug === "blossom-abajur"
                    ? "product-card-contain"
                    : ""
                }`}
                ref={addToRefs}
                onClick={() => handleProductClick(product.slug)}
                onTouchStart={() => {
                  setTouchedCard(
                    touchedCard === product.id ? null : product.id
                  );
                }}
              >
                <div className="product-card-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-card-image"
                    loading="lazy"
                  />
                </div>
                <div className="product-card-content">
                  <h3 className="product-card-title">
                    {product.title}
                    {product.subtitle && (
                      <span className="product-card-subtitle">
                        {" "}
                        ({product.subtitle})
                      </span>
                    )}
                  </h3>
                  <p className="product-card-description">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="products-coming-soon" ref={addToRefs}>
            <p className="products-coming-soon-text">
              DOLCE VITA SERIES YAKINDA...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
