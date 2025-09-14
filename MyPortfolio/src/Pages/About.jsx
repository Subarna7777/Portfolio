import { useState, useEffect } from "react";
import "../Style/About.css";
import Me from "../assets/ME4.jpg"
import { FaCode, FaServer, FaPalette, FaReact, FaNodeJs, FaFigma } from "react-icons/fa";
import { SiPython } from "react-icons/si";


const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="about-section" id="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className={`about-image ${isVisible ? 'fade-in' : ''}`}>
            <div className="image-wrapper">
              <img src={Me} alt="Subarna Shakya" className="profile-image" />
              <div className="image-overlay"></div>
            </div>
          </div>

          <div className={`about-info ${isVisible ? 'fade-in-up' : ''}`}>
            <h3 className="about-subtitle">Crafting digital experiences with code and creativity</h3>
            <p className="about-description">
              I'm a passionate full-stack developer with expertise in building modern,
              responsive web applications. With a strong foundation in both frontend and
              backend technologies, I create seamless digital experiences that balance
              functionality with aesthetic appeal.
            </p>

            <div className="skills-highlight">
              <div className="skill-tag">
                <FaReact className="skill-icon" />
                <span>React.js</span>
              </div>
              <div className="skill-tag">
                <SiPython className="skill-icon" />
                <span>Django</span>
              </div>
              <div className="skill-tag">
                <FaFigma className="skill-icon" />
                <span>UI/UX Design</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`services-section ${isVisible ? 'fade-in-up' : ''}`}>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <FaCode size={30} />
              </div>
              <h3>Frontend Development</h3>
              <p>
                Building responsive, accessible, and performant user interfaces
                with modern frameworks like React JS.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <FaServer size={30} />
              </div>
              <h3>Backend Development</h3>
              <p>
                Developing robust server-side applications, RESTful APIs, and
                database architectures with Django.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <FaPalette size={30} />
              </div>
              <h3>UI/UX Design</h3>
              <p>
                Creating intuitive user experiences with clean, modern interfaces
                that prioritize usability and aesthetic appeal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;