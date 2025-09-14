import { FaHtml5, FaCss3Alt, FaJsSquare, FaPhp, FaDatabase, FaReact, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { SiPython } from "react-icons/si";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "../Style/Projects.css";

const skillIcons = {
  html: <FaHtml5 className="skill-icon" />,
  css: <FaCss3Alt className="skill-icon" />,
  js: <FaJsSquare className="skill-icon" />,
  php: <FaPhp className="skill-icon" />,
  mysql: <FaDatabase className="skill-icon" />,
  react: <FaReact className="skill-icon" />,
  django: <SiPython className="skill-icon" />,
};

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/projects/');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="projects-section" id="projects">
        <div className="container">
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">Loading projects...</p>
          <div className="loading-spinner"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="projects-section" id="projects">
        <div className="container">
          <h2 className="section-title">My Projects</h2>
          <p className="error-message">Error: {error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">Things I've built so far</p>

        <div className="projects-grid">
          {projects.map((project, id) => (
            <motion.div
              key={project.id || id}
              className="project-card"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <div className="card-image-container">
                <img
                  src={project.image ? project.image : '/fallback-image.png'}
                  alt={`${project.title} project screenshot`}
                  className="project-image"
                />

                <div className="image-overlay">
                  <div className="project-links">
                    <a
                      href={project.live_url}
                      className="project-link demo-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View live demo"
                    >
                      <FaExternalLinkAlt />
                    </a>
                    <a
                      href={project.github_url}
                      className="project-link source-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View source code"
                    >
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>

              <div className="card-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="skills-container">
                  <h4 className="skills-title">Tech Stack</h4>
                  <div className="project-skills">
                    {project.technologies && project.technologies.length > 0 && (
                      project.technologies.map((skill, index) => (
                        <span key={index} className="project-skill">
                          {skillIcons[skill.toLowerCase()] || <span className="skill-text">{skill}</span>}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;