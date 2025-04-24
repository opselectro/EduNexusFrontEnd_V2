import axios from "axios";
import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill all fields before submitting.");
      return;
    }

    const dataWithTimestamp = {
      ...formData,
      dateTime: new Date().toISOString(),
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/contact/user/post",
        dataWithTimestamp,
        {
          headers: { "content-type": "application/json" },
        }
      );

      if (response.status === 200) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        "An error occurred while sending your message. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="row justify-content-center">
        <div className="col-11 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="text-center mb-4 text-primary fw-bold">
                Contact Us
              </h3>

              <form onSubmit={handlesubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="you@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="form-control"
                    placeholder="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="form-control"
                    placeholder="Write your message here..."
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {errorMessage && (
                  <div className="alert alert-danger text-center" role="alert">
                    {errorMessage}
                  </div>
                )}

                <div className="d-grid mt-4">
                  <button
                    className="btn btn-primary btn-lg"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
