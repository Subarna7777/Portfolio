import '../Style/Home.css'; 
import profile from "../assets/ME3.jpg"

 const Home = () => {
  return (
    <section className="home-container">
      <div className="home-content">
        <h1 className="home-title">Hello, <br />  I'm Subarna</h1>
        <p className="home-description">
        I'm a passionate front-end developer specializing in building modern and interactive web applications using React. Let's create something amazing together!
        </p>
        <a href="" className="contactBtn">
          Contact Me
        </a>
      </div>
      <img
        src={profile}
        alt="Hero image of me"
        className="home-heroImg"
      />
    </section>
  );
};

export default Home
