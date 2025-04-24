import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import AddCourse from "../admin/AddCourse";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const dropdownRef = useRef();
  const userDropdownRef = useRef();
  const navbarRef = useRef();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleEdit = () => {
    navigate("/admin/update");
  };

  const toggleDropdown = () => {
    setShowAdminDropdown((prev) => !prev);
    setShowUserDropdown(false); // close user dropdown if open
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown((prev) => !prev);
    setShowAdminDropdown(false); // close admin dropdown if open
  };

  const toggleNavbar = () => {
    setIsNavbarOpen((prev) => !prev);
    setShowUserDropdown(false);
    setShowAdminDropdown(false);
  };

  // Auto-close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowAdminDropdown(false);
        setShowUserDropdown(false);
      }

      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavbarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-close navbar on link click
  const closeNavbar = () => {
    setIsNavbarOpen(false);
    setShowAdminDropdown(false);
    setShowUserDropdown(false);
  };

  return (
    <>
      <nav ref={navbarRef} className="navbar navbar-expand-lg bg-white fixed-top shadow-sm pb-3">
        <div className="container">
          <Link className="navbar-brand fw-bold" to={user?.role === "ADMIN" ? "#" : "/home"} onClick={closeNavbar}>
            {user?.role?.toUpperCase() === "ADMIN" ? (
              <span className="btn-outline-primary btn-sm">Admin Dashboard</span>
            ) : (
              <>Edu<span className="fw-normal">Nexus</span></>
            )}
          </Link>

          <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-2">
              {!user || user.role?.toUpperCase() !== "ADMIN" ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/home" onClick={closeNavbar}>Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/course" onClick={closeNavbar}>Courses</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact" onClick={closeNavbar}>Contact</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about" onClick={closeNavbar}>About</Link>
                  </li>
                </>
              ) : null}

              {user ? (
                <>
                  {user.role?.toUpperCase() === "ADMIN" && (
                    <li className="nav-item dropdown position-relative" ref={dropdownRef}>
                      <button
                        className="btn p-0 border-0 me-3"
                        style={{ width: "40px", height: "40px", overflow: "hidden", borderRadius: "50px" }}
                        onClick={toggleDropdown}
                      >
                        <img src="/image/Admin.png" alt="Admin" className="rounded-circle w-100 h-100 object-fit-cover" />
                      </button>
                      {showAdminDropdown && (
                        <div className="dropdown-menu show position-absolute animate__animated animate__fadeIn mt-2" style={{ left: "-80px", zIndex: 999 }}>
                          <Link className="dropdown-item" to="/admin" onClick={closeNavbar}>Dashboard</Link>
                          <button className="dropdown-item" onClick={() => { setShowForm(true); closeNavbar(); }}>Add Course</button>
                          <button className="dropdown-item" onClick={() => { handleEdit(); closeNavbar(); }}>Edit</button>
                          <Link className="dropdown-item" to="/admin/enrollments" onClick={closeNavbar}>View Enrollments</Link>
                          <Link className="dropdown-item" to="/admin/message" onClick={closeNavbar}>Contact Messages</Link>
                          <Link className="dropdown-item" to="/course" onClick={closeNavbar}>View Courses</Link>
                          <Link className="dropdown-item" to="/admin/add/update" onClick={closeNavbar}>Manage Tests</Link>
                          <Link className="dropdown-item" to="/admin/alltest" onClick={closeNavbar}>All Test</Link>
                          <Link className="dropdown-item" to="/admin/result" onClick={closeNavbar}>User Result</Link>
                          <button className="dropdown-item text-danger" onClick={() => { handleLogout(); closeNavbar(); }}>🚪 Logout</button>
                        </div>
                      )}
                    </li>
                  )}

                  {user.role?.toUpperCase() === "USERS" && (
                    <li className="nav-item dropdown position-relative" ref={userDropdownRef}>
                      <button
                        className="btn p-0 border-0 me-3"
                        style={{ width: "40px", height: "40px", overflow: "hidden", borderRadius: "50px" }}
                        onClick={toggleUserDropdown}
                      >
                        <img src="/image/User.png" alt="User" className="rounded-circle w-100 h-100 object-fit-cover" />
                      </button>
                      {showUserDropdown && (
                        <div className="dropdown-menu show position-absolute animate__animated animate__fadeIn mt-2" style={{ left: "-80px", zIndex: 999 }}>
                          <Link className="dropdown-item" to="/user/dashboard" onClick={closeNavbar}>Dashboard</Link>
                          <Link className="dropdown-item" to="/user/cart" onClick={closeNavbar}>My Cart</Link>
                          <Link className="dropdown-item" to="/user/mycourse" onClick={closeNavbar}>My Courses</Link>
                          <Link className="dropdown-item" to="/user/test" onClick={closeNavbar}>Online Quiz</Link>
                          <Link className="dropdown-item" to="/user/result" onClick={closeNavbar}>My Test Results</Link>
                          <Link className="dropdown-item" to="/contact" onClick={closeNavbar}>Contact Messages</Link>
                          <button className="dropdown-item text-danger" onClick={() => { handleLogout(); closeNavbar(); }}>🚪 Logout</button>
                        </div>
                      )}
                    </li>
                  )}
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={closeNavbar}>Sign In</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {showForm && <AddCourse setShowForm={setShowForm} />}
    </>
  );
};

export default Navbar;
