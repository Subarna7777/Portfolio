
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import "../Style/Footer.css"; 

const Footer = () => {
  return (
    <footer id="footer" className="footer-container">
      <div className="footer-text">
        <p>Feel free to reach out!</p>
      </div>
      <ul className="footer-links">
        <li className="footer-link">
          <FaEnvelope size={25}  />
          <a href="https://mail.google.com/mail">Email</a>
        </li>
        <li className="footer-link">
          <FaLinkedin size={25}  />
          <a href="https://www.linkedin.com/">Linkedin</a>
        </li>
        <li className="footer-link">
          <FaGithub size={25}  />
          <a href="https://www.github.com/">Github</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
