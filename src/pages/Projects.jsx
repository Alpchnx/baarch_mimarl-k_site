import React from "react";
import ProjectCard from "../components/ProjectCard.jsx";

const projects = [
  {
    slug: "beytepe_villa",
    title: "VİLLA PROJESİ",
    location: "Beytepe/Ankara",
  
    
    video: "/assets/hero.mp4",
  },
  {
    slug: "cubes_ankara",
    title: "OFİS PROJESİ",
    location: "Ankara",
    
    
    video: "/assets/cubes.mp4",
  },
  {
    slug: "renovasyon_italya",
    title: "RENOVASYON PROJESİ",
    location: "İtalya",
    video: "/assets/renova.mp4",
  },
];

export default function Projects({ onNavigate }) {
  return (
    <section className="section container">
      <div className="section-head">
        <h1>Projeler</h1>
      </div>
      <div className="grid">
        {projects.map((p) => (
          <ProjectCard
            key={p.slug}
            project={p}
            onClick={() => onNavigate(`/projects/${p.slug}`)}
          />
        ))}
      </div>
    </section>
  );
}
