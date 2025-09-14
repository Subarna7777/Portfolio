import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
import "../Style/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a className="nav-title" href="/">
        {/* Replace with your name or logo */}
        <span className="nav-firstname">Subarna</span>
        <span className="nav-lastname">Khatiwada</span>
      </a>
      
      <div className="menu">
        <ul className="menuItems">
          <li>
            <Link to="home" smooth={true} duration={500} offset={-70}>
              Home
            </Link>
          </li>
          <li>
            <Link to="about" smooth={true} duration={500} offset={-70}>
              About
            </Link>
          </li>
          <li>
            <Link to="projects" smooth={true} duration={500} offset={-70}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="contact" smooth={true} duration={500} offset={-70}>
              Contact
            </Link>
          </li>
        </ul>
        
        <div className="menuBtn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>
      
      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${menuOpen ? "menuOpen" : ""}`} onClick={() => setMenuOpen(false)}>
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <a className="nav-title" href="/">
              <span className="nav-firstname">Subarna</span>
              <span className="nav-lastname">Khatiwada</span>
            </a>
            <div className="menuBtn" onClick={() => setMenuOpen(false)}>
              <FaTimes size={24} />
            </div>
          </div>
          
          <ul className="mobile-menu-items">
            <li>
              <Link to="home" smooth={true} duration={500} offset={-70} onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="about" smooth={true} duration={500} offset={-70} onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="projects" smooth={true} duration={500} offset={-70} onClick={() => setMenuOpen(false)}>
                Projects
              </Link>
            </li>
            <li>
              <Link to="contact" smooth={true} duration={500} offset={-70} onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
