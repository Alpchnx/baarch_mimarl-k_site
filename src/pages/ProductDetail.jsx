import React, { useEffect, useRef } from "react";

const productDetails = {
  "blossom-abajur": {
    id: 1,
    title: "Blossom Abajur",
    subtitle: "Işık Taşıyan Zarafet",
    image: "/assets/Urunlerimiz/28.png",
    video: "/assets/lamba.mp4",
    story:
      '"Işığın huzurla dans ettiği an."\n\nSerinin en görkemli parçası olan Blossom Abajur, klasik şapkasıyla yumuşak ve davetkar bir ambiyans yaratırken, porselen gövdesindeki canlı mavi desenlerle mekanınıza derinlik katar. O, sadece bir aydınlatma aracı değil, mekanın ruhunu aydınlatan, etrafına zarafet yayan bir sanat heykelidir.',
    material: "El yapımı porselen, özel mavi glaze",
    dimensions: "Gövde uzunluğu: 28 cm",
    productionTime: "4-6 hafta",
  },
  "petal-vazo": {
    id: 2,
    title: "Petal Vazo",
    subtitle: "Görkemli Açılış",
    image: "/assets/Urunlerimiz/33.png",
    video: "/assets/petal.mp4",
    story:
      '"Doğanın en asil formu."\n\nPetal Vazo, serinin merkezindeki ihtişamlı duruşuyla tüm dikkatleri üzerine çeker. Yüksek ve kapaklı tasarımı (urn formu), onu sadece bir çiçek vazosu olmaktan çıkarıp koleksiyonluk bir esere dönüştürür. Üzerindeki yoğun ve detaylı çiçek motifleri, bir çiçeğin en güzel açma anını sonsuzluğa taşır.',
    material: "El yapımı porselen, özel glaze teknikleri",
    dimensions: "Gövde uzunluğu: 45 cm",
    productionTime: "5-7 hafta",
  },
  "serene-servis-tabagi": {
    id: 3,
    title: "Serene Servis Tabağı",
    subtitle: "Sonsuz Dinginlik",
    image: "/assets/Urunlerimiz/29.png",
    video: "/assets/serene.mp4",
    story:
      '"Estetiğin sunumla buluştuğu nokta."\n\nYuvarlak ve geniş yapısıyla Serene Servis Tabağı, adındaki dinginliği desenindeki akışkanlıkla birleştirir. Sofralarınızdaki en özel lezzetlere eşlik ederken veya bir konsolun üzerinde tek başına sergilenirken, göz yormayan ve zarif tasarımıyla sükûnetin sembolü olur.',
    material: "El yapımı porselen, özel koleksiyon glaze",
    dimensions: "Çap: 25 cm",
    productionTime: "4-6 hafta",
  },
  "flora-kucuk-kapakli-kavanoz": {
    id: 4,
    title: "Flora Küçük Kapaklı Kavanoz",
    subtitle: "Sır Tutucu",
    image: "/assets/Urunlerimiz/28.png",
    video: "/assets/vazo.mp4",
    story:
      '"Küçük detaylarda gizlenen büyük zarafet."\n\nFlora Kavanoz, serinin en sevimli ve kullanışlı parçasıdır. Zarif minyatür boyutu ve kapaklı yapısıyla küçük sırlarınızı saklamak veya ortamınıza ince bir dokunuş katmak için idealdir. Detaylı minik motifleri, büyük vazonun desenini küçülterek koleksiyona bütünlük katar.',
    material: "El yapımı porselen, özel glaze teknikleri",
    dimensions: "Gövde uzunluğu: 20 cm",
    productionTime: "3-5 hafta",
  },
  "seed-servis-tepsisi": {
    id: 5,
    title: "Seed Servis Tepsisi",
    subtitle: "Başlangıç ve Kök",
    image: "/assets/Urunlerimiz/32.png",
    video: "/assets/tepsi.mp4",
    story:
      '"Her güzel şeyin başladığı temel."\n\nSeed Servis Tepsisi, Bloom serisinin köklerini ve başlangıcını temsil eder. Dikdörtgen ve sade formu, porselenin beyaz ve mavisi için mükemmel bir zemin oluşturur. Kahve sunumlarından dekoratif sergilemelere kadar her kullanımda, tasarımın işlevsellikle buluştuğu noktayı gözler önüne serer.',
    material: "El yapımı porselen, özel dekoratif teknikler",
    dimensions: "En: 31 cm, Boy: 21 cm",
    productionTime: "4-6 hafta",
  },
  "bloom-serisi-ozel-set": {
    id: 6,
    title: "Bloom Serisi - Özel Set",
    image: "/assets/6.png",
    video: "/assets/Urunlerimiz/ilkayc.mp4",
    story:
      "Bloom Serisi Özel Set, klasik porselenin mirasından ilham alan, modern yaşam alanları için özel olarak tasarlanmış bir koleksiyondur. Her bir parça, evinizin köşelerinde zarafetle kök salacak, mevsimler geçse de tazeliğini koruyacak zamansız bir eserdir. Bu set, sadece bir dekorasyon değil, evinizdeki en özel anlarınızı besleyen bir sanat yatırımıdır.",
    material: "El yapımı porselen, özel set koleksiyonu",
    dimensions: "Set içeriği: 6 parça, değişken ölçüler",
    productionTime: "6-8 hafta",
  },
};

export default function ProductDetail({ slug, onNavigate }) {
  const product = productDetails[slug];
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
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  if (!product) {
    return (
      <section className="section container">
        <div className="section-head">
          <h1>Ürün bulunamadı</h1>
          <button
            onClick={() => onNavigate("/products")}
            className="cta-button"
          >
            Ürünlere Dön
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="product-detail-section">
      <div className="container">
        <button
          onClick={() => onNavigate("/products")}
          className="product-detail-back"
        >
          ← Ürünlere Dön
        </button>

        <div className="product-detail-layout">
          <div className="product-detail-media" ref={addToRefs}>
            <div className="product-detail-video-container">
              {product.video ? (
                <video
                  className="product-detail-video"
                  src={product.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={`${product.title} video`}
                />
              ) : (
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-detail-image"
                  loading="lazy"
                />
              )}
            </div>
            <div className="product-detail-media-buttons" ref={addToRefs}>
              <a
                href="https://wa.me/905556658383?text=%C3%9Cr%C3%BCnler%20hakk%C4%B1nda%20detayl%C4%B1%20bilgi%20almak%20istiyorum"
                target="_blank"
                rel="noopener noreferrer"
                className="product-media-button product-media-button-primary"
              >
                Teklif Al
              </a>
              <button
                onClick={() => onNavigate("/products")}
                className="product-media-button product-media-button-secondary"
              >
                Serinin Diğer Ürünlerini Gör
              </button>
            </div>
          </div>

          <div className="product-detail-content">
            <div className="product-detail-header" ref={addToRefs}>
              <h1 className="product-detail-title">{product.title}</h1>
              {product.subtitle && (
                <p className="product-detail-subtitle">{product.subtitle}</p>
              )}
            </div>

            <div className="product-detail-info-blocks" ref={addToRefs}>
              <div className="product-info-block">
                <span className="product-info-block-label">Malzeme</span>
                <span className="product-info-block-value">
                  {product.material}
                </span>
              </div>
              <div className="product-info-block">
                <span className="product-info-block-label">Ölçüler</span>
                <span className="product-info-block-value">
                  {product.dimensions}
                </span>
              </div>
              <div className="product-info-block">
                <span className="product-info-block-label">Üretim Süresi</span>
                <span className="product-info-block-value">
                  {product.productionTime}
                </span>
              </div>
            </div>

            {product.story && (
              <div className="product-detail-story" ref={addToRefs}>
                <h2 className="product-story-title">Tasarım Hikayesi</h2>
                <div className="product-story-text">
                  {product.story.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
