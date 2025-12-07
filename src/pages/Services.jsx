import React, { useEffect, useRef, useState } from "react";

const processSteps = [
  {
    id: 1,
    number: "01",
    title: "Tanışma & Keşif (Briefing)",
    subtitle: "Mekânın Ruhunu Anlama",
    description:
      'Sizi, yaşam biçiminizi, beklentilerinizi, bütçenizi ve zaman çizelgenizi derinlemesine dinleriz. Proje alanını analiz eder, mevcut durumu ölçümlendirir ve tüm verileri toplarız. Bu aşama, BAARCH\'ın "terzi" yaklaşımının temelini oluşturur.',
  },
  {
    id: 2,
    number: "02",
    title: "Konsept Geliştirme & Sunum",
    subtitle: "Tasarım Felsefesini Oluşturma",
    description:
      "Topladığımız veriler ışığında, mekânınız için özel olarak hazırlanmış konsept paftalarını, fonksiyon şemalarını ve malzeme/renk paletini sunarız. 3D görsellerle ilk atmosferi görmenizi sağlayarak, vizyonun ortak paydada buluşmasını sağlarız.",
  },
  {
    id: 3,
    number: "03",
    title: "Uygulama Projeleri & Detaylandırma",
    subtitle: "Uygulamanın Haritasını Çizme",
    description:
      "Onaylanan konsepti hayata geçirecek, şantiyede işçiliğe rehberlik edecek tüm teknik çizimleri, mobilya detaylarını, elektrik/mekanik yerleşim planlarını (aplikasyon projeleri) hazırlarız. Bu aşama, hatasız ve yüksek kalitede uygulama için kritik öneme sahiptir.",
  },
  {
    id: 4,
    number: "04",
    title: "Uygulama Yönetimi & Kontrol",
    subtitle: "Tasarımdan Gerçeğe Dönüşüm",
    description:
      "Projenin saha süreçlerini titizlikle yönetiriz. Tedarikçilerle koordinasyon, işçilik kalitesinin denetimi, bütçe takibi ve termin planına uyum bu aşamanın ana odak noktalarıdır. Size sadece süreci izlemek kalır.",
  },
  {
    id: 5,
    number: "05",
    title: "Teslim",
    subtitle: "Mekânı Yaşama Açma",
    description:
      "Tüm detaylar tamamlandığında, projeniz size eksiksiz ve anahtar teslim olarak sunulur. Mekânın yeni yaşam deneyimine hazırlandığı bu son adım, BAARCH'ın yarattığı kalıcı değerin keyfini çıkarmanız için başlangıçtır.",
  },
];

const services = [
  {
    id: 1,
    title: "İç Mekân Tasarımı & Yaşam Deneyimi",
    description:
      "Mekânın ruhunu, kullanıcılarının yaşam biçimine göre yeniden yorumluyoruz. Alan analizi, ihtiyaç tespiti, malzeme seçimleri ve ergonomik çözümleri bir araya getirerek; estetik kadar fonksiyonel bir yaşam deneyimi sunuyoruz.\n\nFelsefemiz: Her proje; akış, ışık, ölçü ve hissin birbiriyle uyum içinde olduğu, zamansız bir tasarım anlayışıyla şekillenir. Sadece güzel değil, yaşanabilir mekânlar tasarlarız.",
    image: "/assets/1.png",
  },
  {
    id: 2,
    title: "Uygulama & Anahtar Teslim Proje Yönetimi",
    description:
      "Tasarımı hayata geçirmek yalnızca çizimle başlamaz; disiplinli süreç yönetimiyle tamamlanır. Uygulama aşamalarında işçilik kalitesini, tedarik sürecini ve termin planını titizlikle kontrol ederek; projelerin sorunsuz ve bütçeye uygun bir şekilde tamamlanmasını sağlıyoruz.\n\nAvantajınız: Sizin için zaman ve enerji gerektiren tüm süreçleri üstleniyor; tasarımın her detayını planlandığı gibi, sıfır sürprizle hayata geçiriyoruz.",
    image: "/assets/2.png",
  },
  {
    id: 3,
    title: "Mimari Proje Danışmanlığı & Optimizasyon",
    description:
      "Mevcut ya da planlanan projelerinizi, Büşra Arslan'ın uluslararası deneyimiyle elde edilen doğru tasarım kararlarıyla güçlendiriyoruz. Planlama, fonksiyon şeması, kullanıcı deneyimi ve malzeme skalası gibi kritik aşamalarda profesyonel yönlendirme sunarız.\n\nHedefimiz: Bütçenizi, zaman çizelgenizi ve tasarım vizyonunuzu ortak bir paydada buluşturarak, projenizin maksimum verimlilikle ilerlemesini sağlamaktır.",
    image: "/assets/3.png",
  },
  {
    id: 4,
    title: "Konsept & Mekân Kimliği Tasarımı",
    description:
      "Her mekânın kendine özgü, güçlü bir karakteri vardır. Konsept geliştirme sürecinde; kullanıcı alışkanlıklarından kültürel referanslara, malzeme dokularından renk paletine kadar her ayrıntıyı ele alıyoruz.\n\nSonuç: Mekânın sadece güzel görünmesini değil, anlam taşımasını ve bulunduğu bağlama güçlü, kalıcı bir kimlikle yerleşmesini hedefliyoruz.",
    image: "/assets/4.png",
  },
  {
    id: 5,
    title: "3D Görselleştirme & Gerçekçi Render",
    description:
      "Tasarım kararlarınızı somutlaştırmak ve belirsizliği ortadan kaldırmak için en güçlü görsel sunumları üretiyoruz. Gerçekçilik odaklı 3D renderlar; mekânın ışığını, malzemesini ve atmosferini henüz uygulama başlamadan, en ince detayına kadar deneyimlemenizi sağlar.\n\nKatkısı: Karar süreçleri hızlanır, revizyonlar netleşir ve projenin tüm paydaşlar için tamamen anlaşılır hale gelmesi sağlanır.",
    image: "/assets/5.png",
  },
  {
    id: 6,
    title: "Sanat Objeleri Seçkisi & Mekânsal İmza",
    description:
      "Özel tasarım objelerden oluşan bu seçki, mekânlarınıza özgünlük katan nadir dokunuşlardır. Her parça el işçiliğiyle üretilir; seri üretimden uzak, tamamen benzersizdir.\n\nDeğeri: Form, doku ve malzemeyle kurduğu ilişki sayesinde, yalnızca dekorasyon değil, mekânın karakterine katkı sağlayan bir sanat unsuruna dönüşür. Koleksiyonun amacı; kişiliğinizle konuşan ve mekânınızda kalıcı bir imza bırakan eserleri sizinle buluşturmaktır.",
    image: "/assets/6.png",
  },
];

export default function Services() {
  const cardRefs = useRef([]);
  const processRefs = useRef([]);
  // Birden fazla adımın açık kalabilmesi için liste halinde tutulur
  const [expandedSteps, setExpandedSteps] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [touchedCard, setTouchedCard] = useState(null);

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

    const cardRefsArray = cardRefs.current;
    const processRefsArray = processRefs.current;

    [...cardRefsArray, ...processRefsArray].forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      [...cardRefsArray, ...processRefsArray].forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Ekran genişliğine göre mobil/destekli davranışı belirle
  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth <= 768);
    };
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const addToProcessRefs = (el) => {
    if (el && !processRefs.current.includes(el)) {
      processRefs.current.push(el);
    }
  };

  const toggleStep = (stepId) => {
    if (isMobile) return; // Mobilde buton davranışı olmasın, her zaman açık
    setExpandedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    );
  };

  const handleServiceTouch = (serviceId) => {
    // Mobilde kartlar dokunulabilir davranış göstermesin; yalnızca desktop/large ekranlarda toggling
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      return;
    }
    setTouchedCard(touchedCard === serviceId ? null : serviceId);
  };

  return (
    <section className="section container">
      <div className="section-head">
        <h1>Hizmetlerimiz</h1>
      </div>
      <div className="services-grid">
        {services.map((service) => (
          <div
            key={service.id}
            className={`service-card ${
              touchedCard === service.id ? "touched" : ""
            }`}
            ref={addToRefs}
            style={{
              backgroundImage: `url(${service.image})`,
            }}
            onTouchStart={() => handleServiceTouch(service.id)}
          >
            <div className="service-card-overlay"></div>
            <div className="service-card-number">0{service.id}</div>
            <div className="service-card-content">
              <h2 className="service-card-title">{service.title}</h2>
              <p className="service-card-description">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="process-section">
        <div className="section-head">
          <h2 className="process-title" ref={addToProcessRefs}>
            BAARCH ile Süreç Nasıl İlerliyor?
          </h2>
        </div>
        <div className="process-timeline">
          {processSteps.map((step, index) => (
            <div
              key={step.id}
              className={`process-timeline-item ${
                expandedSteps.includes(step.id) || isMobile ? "expanded" : ""
              }`}
              ref={addToProcessRefs}
              onClick={() => toggleStep(step.id)}
            >
              <div className="timeline-line-wrapper">
                <div className="timeline-line"></div>
                <div className="timeline-dot"></div>
              </div>
              <div className="timeline-content">
                <div className="timeline-number-watermark">{step.number}</div>
                <div className="timeline-header">
                  <span className="timeline-number">{step.number}</span>
                  <div className="timeline-title-wrapper">
                    <h3 className="timeline-title">{step.title}</h3>
                    {step.subtitle && (
                      <p className="timeline-subtitle">{step.subtitle}</p>
                    )}
                  </div>
                </div>
                <div className="timeline-description-wrapper">
                  <p className="timeline-description">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
