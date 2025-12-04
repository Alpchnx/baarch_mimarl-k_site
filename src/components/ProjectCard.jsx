import React from 'react';

export default function ProjectCard({ project, onClick }) {
  return (
    <article className="project-card" onClick={onClick} role="button" tabIndex={0}>
      <div className="project-thumb">
        {project.video ? (
          <>
            <video
              className="project-card-video"
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
            <div className="project-card-overlay"></div>
          </>
        ) : (
          <div className="project-card-image" style={{ backgroundImage: `url(${project.image})` }} />
        )}
      </div>
      <div className="project-meta">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-info">{project.location} • {project.year}</p>
      </div>
    </article>
  );
}


