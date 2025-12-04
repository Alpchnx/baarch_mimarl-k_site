import React, { useState, useEffect } from "react";

const DB = {
  beytepe_villa: {
    title: "Villa Projesi – Beytepe",
    location: "Beytepe/Ankara",
    year: 2024,
    description:
      "Eğimli arsada güneş ışığını maksimum alan, sürdürülebilir malzemelerle kurgulanmış konut projesi.",
    image: "/assets/project1.jpg",
    images: [
      "/assets/Proje1Beytepe/1.png",
      "/assets/Proje1Beytepe/2.png",
      "/assets/Proje1Beytepe/3.png",
      "/assets/Proje1Beytepe/4.png",
      "/assets/Proje1Beytepe/5.png",
      "/assets/Proje1Beytepe/6.png",
      "/assets/Proje1Beytepe/7.png",
      "/assets/Proje1Beytepe/8.png",
      "/assets/Proje1Beytepe/9.png",
      "/assets/Proje1Beytepe/10.png",
      "/assets/Proje1Beytepe/11.png",
    ],
    fullDescription: `Beytepe'de yer alan villamızın yenilenme sürecine ev sahiplerimizin taleplerinden yola çıkarak başladık. 

Mekânın ortasında bulunan kolon, evin tüm akışını kesiyordu. 

Ev sahibimizi rahatsız eden kolon, sergileme ünitesi olarak yeniden tasarlanıp göze hitap eden işlevsel bir çözüme dönüştü.

Villanın çevresindeki huzurlu manzarayı içeriye taşımak için oturumlu bir cam önü köşe tasarlandı.

Bu alan, gün ışığını içine alırken sakin bir dinlenme noktası oluşturuyor. Sonuçta tüm ihtiyaçlara cevap veren çok yönlü bir yaşam alanı ortaya çıktı. 

Evin eski şömine hattını koruyup, biçimini değiştirerek modern bir dokunuş kazandırdık. Minimal çizgilerle güncellenen şömine, evin sıcak atmosferini destekleyen önemli bir odak noktası oldu.

Girişten itibaren evin tüm alanların birbirine akıcı şekilde, her köşesinin birbirini içine alan bir sirkülasyonla bağlandığı yeni bir aks tasarlandı. Böylece hem ferahlık hem de fonksiyonellik ön planda tutuldu. 

Şimdi mekân, girişten salonun sonuna kadar kesintisiz bir sirkülasyona sahip.

İlk bakışta böylesi bir sonuç imkânsız görünüyordu, fakat iç mimarlık estetiğiyle mekân hayal edilenin ötesine geçti.`,
  },
  cubes_ankara: {
    title: "Ofis Projesi – Cubes Ankara",
    location: "Cubes Ankara",
    year: 2023,
    description: "Doğal ışık ve akustik konforu önceleyen açık ofis planı.",
    image: "/assets/project2.jpg",
    images: [
      "/assets/Proje2CubesAnkara/1.png",
      "/assets/Proje2CubesAnkara/2.png",
      "/assets/Proje2CubesAnkara/3.png",
      "/assets/Proje2CubesAnkara/4.png",
      "/assets/Proje2CubesAnkara/5.png",
      "/assets/Proje2CubesAnkara/6.png",
    ],
    fullDescription: `50 m² gibi sınırlı bir alanda maksimum verimlilik! Bu ofis projesinde 2 makam odası ve karşılama alanı çözümü ürettik. Hem şık hem de işlevsel tasarımıyla, küçük metrekareleri büyük bir konfor ve prestije dönüştürdük.

İşlevsellik + Estetik = Kusursuz Ofis Deneyimi Siz de ofisinizde alanı en verimli şekilde kullanmak ister misiniz?`,
  },
  renovasyon_italya: {
    title: "Renovasyon Projesi – İtalya",
    location: "İtalya",
    year: 2022,
    description:
      "Kıyı hattına saygılı, hafif strüktürlü kamusal mekan tasarımı.",
    image: "/assets/project3.jpg",
    images: [
      "/assets/Proje3ItalyaRenovasyon/1.png",
      "/assets/Proje3ItalyaRenovasyon/2.png",
      "/assets/Proje3ItalyaRenovasyon/3.png",
      "/assets/Proje3ItalyaRenovasyon/4.png",
      "/assets/Proje3ItalyaRenovasyon/5.png",
      "/assets/Proje3ItalyaRenovasyon/6.png",
      "/assets/Proje3ItalyaRenovasyon/7.png",
      "/assets/Proje3ItalyaRenovasyon/8.png",
    ],
    fullDescription: `İtalya'nın zarif terrazzo zeminlerinden ilham alarak tasarladığımız bu proje, modern çizgilerle geleneksel dokuyu bir araya getiriyor. Müşterimizin talebi doğrultusunda hem ofis hem yaşam alanı işlevini tek mekânda buluşturduk.

Doğal ışıkla bütünleşen şeffaf yüzeyler, sıcak dokular ve fonksiyonel mobilyalar… Bu mekânda iş temposu ile günlük yaşamın konforu aynı dengede. Her detay, kullanıcı deneyimini en üst seviyeye taşımak için düşünüldü.

Her proje, doğru parçaların bir araya gelmesiyle anlam kazanır.`,
  },
};

function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="project-slider">
      <div className="project-slider-container">
        {images.map((img, index) => (
          <div
            key={index}
            className={`project-slide ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <img src={img} alt={`Proje görseli ${index + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="project-slider-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Görsel ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectDetail({ slug, onNavigate }) {
  const p = DB[slug];
  if (!p) {
    return (
      <section className="section container">
        <h1>Proje bulunamadı</h1>
        <button
          className="btn btn-primary"
          onClick={() => onNavigate("/projects")}
        >
          Projeler
        </button>
      </section>
    );
  }

  // Tüm projeler için özel tasarım
  if (
    slug === "beytepe_villa" ||
    slug === "cubes_ankara" ||
    slug === "renovasyon_italya"
  ) {
    return (
      <section className="section project-detail-villa">
        <div className="project-detail-header">
          <button
            className="project-back-btn"
            onClick={() => onNavigate("/projects")}
          >
            ← Geri
          </button>
        </div>
        <div className="project-detail-content">
          <div className="project-detail-images">
            <ImageSlider images={p.images} />
          </div>
          <div className="project-detail-info">
            <h1 className="project-detail-title">{p.title}</h1>
            <div className="project-detail-description">
              {p.fullDescription.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Diğer projeler için varsayılan tasarım
  return (
    <section className="section container">
      <button className="btn btn-ghost" onClick={() => onNavigate("/projects")}>
        ← Geri
      </button>
      <div className="detail-meta">
        <h1>{p.title}</h1>
        <p className="muted">
          {p.location} • {p.year}
        </p>
      </div>
      <p className="detail-text">{p.description}</p>
    </section>
  );
}
