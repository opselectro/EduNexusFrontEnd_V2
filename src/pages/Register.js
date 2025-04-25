import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const validateInputs = (name, value) => {
    let errors = { ...error };

    if (name === "username") {
      if (!value.trim()) {
        errors.username = "Username is required";
      } else if (!/^[A-Z][a-z]{1,9}$/.test(value)) {
        errors.username = "Start with capital, 2-10 lowercase letters";
      } else {
        delete errors.username;
      }
    }

    if (name === "email") {
      if (!value.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errors.email = "Invalid Email format";
      } else {
        delete errors.email;
      }
    }

    if (name === "password") {
      if (!value) {
        errors.password = "Password is required";
      } else if (value.length < 6) {
        errors.password = "Min 6 characters";
      } else {
        delete errors.password;
      }
    }

    if (name === "confirmpassword") {
      if (!value) {
        errors.confirmpassword = "Confirm your password";
      } else if (value !== user.password) {
        errors.confirmpassword = "Passwords do not match";
      } else {
        delete errors.confirmpassword;
      }
    }

    setError(errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    validateInputs(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(error).length > 0) {
      alert("Fix errors before submitting");
      return;
    }

    try {
      const response = await axios.post("https://edunexusbackend-v2-production.up.railway.app/api/users/register", user);
      alert(response.data);
      navigate("/home");
    } catch (err) {
      console.error("Registration failed", err.response?.data || err.message);
      alert("Registration failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light px-3">
      <div className="col-md-8 col-lg-5 col-xl-4">
        <div className="card shadow border-0">
          <div className="card-body p-4 p-md-5">
            <h3 className="text-center fw-bold mb-4 text-primary">
              Apply Now to Start Upskilling
            </h3>
            <form onSubmit={handleSubmit}>
             
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className={`form-control ${error.username ? "is-invalid" : ""}`}
                  placeholder="Enter your name"
                  value={user.username}
                  onChange={handleChange}
                  required
                />
                {error.username && <div className="invalid-feedback">{error.username}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${error.email ? "is-invalid" : ""}`}
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
                {error.email && <div className="invalid-feedback">{error.email}</div>}
              </div>

              
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${error.password ? "is-invalid" : ""}`}
                  placeholder="Choose a password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
                {error.password && <div className="invalid-feedback">{error.password}</div>}
              </div>

             
              <div className="mb-4">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmpassword"
                  className={`form-control ${error.confirmpassword ? "is-invalid" : ""}`}
                  placeholder="Re-enter password"
                  value={user.confirmpassword}
                  onChange={handleChange}
                  required
                />
                {error.confirmpassword && <div className="invalid-feedback">{error.confirmpassword}</div>}
              </div>

              
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>

             
              <div className="text-center mt-3">
                <small className="text-muted">
                  Already have an account?{" "}
                  <a href="/login" className="text-decoration-none fw-semibold text-primary">
                    Login here
                  </a>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
