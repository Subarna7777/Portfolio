import { FaHtml5, FaCss3Alt, FaJsSquare, FaPhp, FaDatabase, FaReact, FaNode, FaJava } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "../Style/Projects.css";

const skillIcons = {
  html: <FaHtml5 className="skill-icon" style={{ color: "#E34F26" }} />,
  css: <FaCss3Alt className="skill-icon" style={{ color: "#264DE4" }} />,
  js: <FaJsSquare className="skill-icon" style={{ color: "#F7DF1E" }} />,
  php: <FaPhp className="skill-icon" style={{ color: "#8993BE" }} />,
  mysql: <FaDatabase className="skill-icon" style={{ color: "#00618A" }} />,
  react: <FaReact className="skill-icon" style={{ color: "#61DAFB" }} />,
  node: <FaNode className="skill-icon" style={{ color: "#68A063" }} />,
  java: <FaJava className="skill-icon" style={{ color: "#007396" }} />,
};

// Import images manually
import Project1 from "../assets/Project1.png";
import Project2 from "../assets/Project2.png";
import Project3 from "../assets/Project3.png";

const imageMap = [Project1, Project2, Project3];

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
      <section className="projects-container" id="projects">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">Loading projects...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="projects-container" id="projects">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="projects-container" id="projects">
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
                src={imageMap[id % imageMap.length]}
                alt={`Image of ${project.title}`}
                className="project-image"
              />
              <div className="image-overlay"></div>
            </div>
            
            <div className="card-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="skills-container">
                <h4 className="skills-title">Tech Stack</h4>
                <ul className="project-skills">
                  {project.technologies && project.technologies.length > 0 && (
                    project.technologies.map((skill, index) => (
                      <li key={index} className="project-skill">
                        {skillIcons[skill.toLowerCase()] || <span>{skill}</span>}
                      </li>
                    ))
                  )}
                </ul>
              </div>
              
              <div className="project-links">
                <a 
                  href={project.live_url} 
                  className="demo-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
                <a 
                  href={project.github_url} 
                  className="source-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source Code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
