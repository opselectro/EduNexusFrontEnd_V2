import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://edunexusbackend-v2-production.up.railway.app/api/users/login",
        credentials,
        { headers: { "Content-Type": "application/json" } }
      );
      const userData = response.data;
      console.log("Login Response:", userData);

      if (typeof userData !== "object") {
        alert("Invalid JSON format received!");
        return;
      }

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      if (userData.role?.toUpperCase() === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      alert("Login failed: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
      <div className="col-md-8 col-lg-5 col-xl-4">
        <div className="card shadow border-0">
          <div className="card-body p-4 p-md-5">
            <h3 className="text-center fw-bold mb-4 text-primary">Welcome Back</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label className="form-label">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-primary text-white">
                    <FaUser />
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group mb-4">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-primary text-white">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3">
                Login
              </button>
              <div className="text-center">
                <small className="text-muted">
                  Don’t have an account?{" "}
                  <a href="/register" className="text-decoration-none fw-semibold text-primary">
                    Sign up
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

export default Login;
