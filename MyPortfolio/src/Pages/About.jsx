import "../Style/About.css";
import Me from "../assets/ME4.jpg"
import { FaMousePointer, FaServer, FaPaintBrush } from "react-icons/fa";

const About = () => {
  return (
    <>
     <h2 className="about-title">About</h2>
    <section className="about-container" id="about">
      <div className="about-content">
        <img
          src={Me}
          alt="Me"
          className="aboutImage"
        />
        <ul className="aboutItems">
          <li className="aboutItem">
            <FaMousePointer size={50}  className="aboutIcon" />
            <div className="aboutItemText">
              <h3>Frontend Developer</h3>
              <p>
                I'm a frontend developer with experience in building responsive
                and optimized sites.
              </p>
            </div>
          </li>
          <li className="aboutItem">
            <FaServer size={50} className="aboutIcon" />
            <div className="aboutItemText">
              <h3>Backend Developer</h3>
              <p>
                I have experience developing fast and optimized back-end systems
                and APIs.
              </p>
            </div>
          </li>
          <li className="aboutItem">
            <FaPaintBrush size={50}  className="aboutIcon" />
            <div className="aboutItemText">
              <h3>UI Designer</h3>
              <p>
                I have designed multiple landing pages and have created design
                systems as well.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
    </>
  );
};

export default About;
