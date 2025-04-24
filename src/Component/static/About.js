import React from "react";

function About() {
  return (
    <>
      <div className="container mt-5 mb-5">
        <h3 className="text-center bg-secondary text-white py-2">About</h3>
        <hr />
        <p className="text-center">
          Our E-Learning Platform is an innovative online education system
          designed to provide high-quality learning experiences for students,
          professionals, and lifelong learners. It bridges the gap between
          traditional classroom learning and digital education, offering a
          flexible, affordable, and interactive way to acquire new skills.
        </p>

        <div className="row mt-4 gx-4 gy-4">
          {/* Card 1 - What We Offer */}
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="card shadow-sm w-100 d-flex flex-column">
              <img
                src="/image/image1.jpeg"
                className="card-img-top"
                alt="What We Offer"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body flex-grow-1 d-flex flex-column">
                <h5 className="card-title">🌍 What We Offer?</h5>
                <h3 className="text-muted" style={{ fontSize: "18px" }}>
                  We provide a diverse range of courses in multiple domains:
                </h3>
                <hr />
                <ul className="list-unstyled flex-grow-1">
                  <li>✅ Programming & Development (Java, Python, React, Spring Boot, etc.)</li>
                  <li>✅ UI/UX Design (Figma, Adobe XD, Design Thinking)</li>
                  <li>✅ Personal Development (Communication Skills, Public Speaking)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 2 - Key Features */}
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="card shadow-sm w-100 d-flex flex-column">
              <img
                src="/image/image2.jpeg"
                className="card-img-top"
                alt="Key Features"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body flex-grow-1 d-flex flex-column">
                <h5 className="card-title">🚀 Key Features</h5>
                <h3 className="text-muted" style={{ fontSize: "18px" }}>
                  Key aspects that make our platform unique:
                </h3>
                <hr />
                <ul className="list-unstyled flex-grow-1">
                  <li>🔹 Interactive Learning – Video lectures, quizzes, and hands-on projects</li>
                  <li>🔹 Expert Instructors – Learn from industry professionals</li>
                  <li>🔹 Certification – Get recognized certification</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Card 3 - Learning Experience */}
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="card shadow-sm w-100 d-flex flex-column">
              <img
                src="/image/image3.jpeg"
                className="card-img-top"
                alt="Learning Experience"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body flex-grow-1 d-flex flex-column">
                <h5 className="card-title">📚 Learning Experience</h5>
                <h3 className="text-muted" style={{ fontSize: "18px" }}>
                  Our courses are designed with a structured learning path:
                </h3>
                <hr />
                <ul className="list-unstyled flex-grow-1">
                  <li>✔ Video Tutorials – High-quality pre-recorded sessions</li>
                  <li>✔ Assignments & Quizzes – Test your knowledge with assessments</li>
                  <li>✔ Hands-on Projects – Real-world projects for better learning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
