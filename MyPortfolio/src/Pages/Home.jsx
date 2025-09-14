import { useState, useEffect } from 'react';
import '../Style/Home.css';
import profile from "../assets/ME3.jpg";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="home-container">
      <div className="home-background"></div>
      
      <div className="home-content">
        <div className={`text-content ${isVisible ? 'fade-in-up' : ''}`}>
          <h1 className="home-title">
            <span className="greeting">Hello, I'm</span>
            <span className="name">Subarna</span>
          </h1>
          
          <div className="typewriter">
            <h2 className="home-subtitle">Front-End Developer</h2>
          </div>
          
          <p className="home-description">
            I specialize in building modern, interactive web applications using React. 
            With a passion for clean code and user-centered design, I create digital 
            experiences that are both beautiful and functional.
          </p>
          
          <div className="home-buttons">
            <a href="#contact" className="btn btn-primary">
              Contact Me
            </a>
            <a href="#projects" className="btn btn-secondary">
              View Projects
            </a>
          </div>
        </div>
        
        <div className={`image-content ${isVisible ? 'fade-in' : ''}`}>
          <div className="image-wrapper">
            <img
              src={profile}
              alt="Subarna - Frontend Developer"
              className="home-heroImg"
            />
            <div className="image-overlay"></div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>Scroll down</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Home;