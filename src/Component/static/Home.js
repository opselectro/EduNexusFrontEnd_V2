import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home-page">
      {/* === Hero Section === */}
      <header className="hero-section position-relative text-white text-center">
        <img
          src="/image/backgroundimg.jpg"
          alt="Hero Background"
          className="hero-bg-img"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <h1 className="display-4 fw-bold">Level Up Your Career</h1>
          <p className="lead mt-3 fs-5">
            Learn from the best instructors. Master skills at your own pace.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
            <Link to="/course" className="btn btn-light btn-lg px-4">
              Explore Courses
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-lg px-4">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* === Features Section === */}
      <section className="py-5 features-section">
        <div className="container">
          <div className="row g-4">
            {[
              {
                icon: "bi-mortarboard",
                title: "Expert Instructors",
                desc: "Learn from certified professionals with real-world experience.",
                bgClass: "feature-expert",
              },
              {
                icon: "bi-laptop",
                title: "Flexible Learning",
                desc: "Study anytime, anywhere, and on any device.",
                bgClass: "feature-flexible",
              },
              {
                icon: "bi-award",
                title: "Certifications",
                desc: "Earn certificates to enhance your resume and career prospects.",
                bgClass: "feature-certificate",
              },
            ].map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className={`feature-card card h-100 ${item.bgClass}`}>
                  <div className="card-body text-white text-center">
                    <i className={`bi ${item.icon} fs-1`}></i>
                    <h5 className="card-title fw-bold mt-3">{item.title}</h5>
                    <p className="card-text">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === Top Rated Courses Section === */}
      <section className="top-courses-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">🔥 Top Rated Courses</h2>
          <div className="row g-4">
            {[
              {
                title: "Full-Stack Web Development",
                desc: "Master front-end and back-end technologies.",
                image: "/image/Course1.webp",
              },
              {
                title: "React & Redux Mastery",
                desc: "Build scalable SPAs with ease.",
                image: "/image/course2.webp",
              },
              {
                title: "Java Programming Bootcamp",
                desc: "Start from basics to advanced Java.",
                image: "/image/course3.webp",
              },
            ].map((course, idx) => (
              <div className="col-lg-4 col-md-6" key={idx}>
                <div className="card course-card h-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="card-img-top"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{course.title}</h5>
                    <p className="card-text">{course.desc}</p>
                    <Link to="/course" className="btn btn-primary mt-auto">
                      View Course
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
