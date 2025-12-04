import React, { useEffect, useRef } from "react";
import hakkimizdaGorsel from "../assets/hakkimizda-gorsel.png";

export default function About() {
  const titleRefs = useRef([]);

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

    const refs = titleRefs.current;
    refs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !titleRefs.current.includes(el)) {
      titleRefs.current.push(el);
    }
  };

  return (
    <section className="section about-section">
      <div className="about-hero">
        <div className="about-hero-image">
          <img src={hakkimizdaGorsel} alt="Büşra Arslan" loading="lazy" />
        </div>
        <div className="about-hero-content">
          <div className="about-text-content">
            <div className="about-name-wrapper" ref={addToRefs}>
              <h1 className="about-name">Büşra Arslan</h1>
              <span className="about-title-bg">KURUCU</span>
            </div>

            <h2 className="about-section-title" ref={addToRefs}>
              BAARCH Mimarlık Felsefesi
            </h2>
            <p className="about-intro">
              Merhaba, ben Büşra Arslan, BAARCH Mimarlık'ın kurucusu.
            </p>
            <p className="about-text">
              Benim için her mekân, sahiplerinin hayallerini ve yaşam
              biçimlerini taşıyan özel bir hikâyedir. Mimarın payına düşense o
              hikâyeyi doğru bir dile çevirerek, hayali yaşayan bir mekâna
              dönüştürmektir. Bu nedenle kendimi bir tasarımcıdan çok, mekânın
              terzisi olarak görüyorum; ölçer, anlamlandırır ve size özel en
              doğru formu üretirim.
            </p>

            <h2 className="about-section-title" ref={addToRefs}>
              Uluslararası Vizyon, Yerel Zanaat
            </h2>
            <p className="about-text">
              TOBB Ekonomi ve Teknoloji Üniversitesi İç Mimarlık ve Çevre
              Tasarımı bölümünden mezun olduktan sonra, kariyerime İtalya'da
              uluslararası bir mimarlık ofisinde çalışarak derinlik kattım.
            </p>
            <p className="about-text">
              Tasarım anlayışımın temeli, bu dönemde şekillendi. Orada
              öğrendiğim en kıymetli şey; iyi tasarımın yalnızca göze hitap eden
              bir estetik olmadığını, günlük yaşamın ritmiyle uyumlu, zamansız
              ve sürdürülebilir olması gerektiğidir. İtalyan ekolünden gelen
              malzemenin doğasına saygı ve detayların kusursuzluğu bakış
              açısıyla, bugün her projeye aynı dengeyi gözeterek yaklaşıyorum:
            </p>
            <p className="about-text about-quote">
              Fonksiyon köktür; estetik ise ona kimlik veren gövde.
            </p>

            <h2 className="about-section-title" ref={addToRefs}>
              Misyonumuz: Yaşayan, Nefes Alan Mekânlar Üretmek
            </h2>
            <p className="about-text">
              BAARCH Mimarlık olarak misyonumuz, estetiği ve fonksiyonu bir
              arada tutan, kullanıcı odaklı, kalıcı değerler üretmektir. Bizim
              için bir mekânın değeri, size hizmet ettiği ölçüde artar. Bu
              felsefeyle hareket ederek:
            </p>
            <div className="about-mission-items">
              <p className="about-text about-mission-title">
                Sizi Anlamakla Başlarız:
              </p>
              <p className="about-text about-mission-text">
                Her projenin başlangıcı, yaşam alışkanlıklarınızı,
                beklentilerinizi ve mekânla kurduğunuz ilişkiyi dinlemekle
                başlar. Bu derin dinleme süreci, bizim için her eskizin temelini
                oluşturur.
              </p>
              <p className="about-text about-mission-title">
                Detaylara Odaklanırız:
              </p>
              <p className="about-text about-mission-text">
                Bir kapı kolunun konumu, ışığın akışı, bir yüzeyin dokusu... Tüm
                bu detaylar yalnızca güzel görünmek için değil, gündelik
                hayatınızı kolaylaştırmak için düşünülmüştür.
              </p>
              <p className="about-text about-mission-title">
                Kalıcı Çözümler Üretiriz:
              </p>
              <p className="about-text about-mission-text">
                Çalışma biçimimizde hızlı çözümler yoktur. Uzun yıllar yaşanacak
                alanların sabırlı, düşünülmüş ve sizinle uyumlu olması gerekir.
                Çünkü gerçek tasarım, bir fotoğrafa değil; bir yaşam biçimine
                hizmet eder.
              </p>
            </div>
            <p className="about-text about-conclusion">
              BAARCH Mimarlık olarak biz, profesyonel proje yönetimi ve
              uluslararası vizyonumuzla, hayallerinizi somut, nefes alan ve her
              adımda size özel tasarlanmış mekânlara dönüştürmek için buradayız.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
