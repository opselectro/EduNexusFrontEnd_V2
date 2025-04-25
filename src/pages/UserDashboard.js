import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "../Component/common/NavBar";

const UserDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3;

  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login");
        return;
      }
      if (user.role?.toUpperCase() === "ADMIN") {
        navigate("/admin/dashboard");
      }
      fetchCourses();
    }
  }, [user, navigate, loading]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("https://edunexusbackend-v2-production.up.railway.app/api/courses/viewAll");
      setCourses(response.data);
      setFilteredCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) {
      setFilteredCourses(courses);
      return;
    }
    try {
      const response = await axios.get(
        `https://edunexusbackend-v2-production.up.railway.app//api/courses/search?courseName=${searchTerm}`
      );
      setFilteredCourses(response.data);
      setCurrentPage(1); // reset to first page on new search
    } catch (error) {
      console.error("Error searching courses:", error);
    }
  };

  const handleEnroll = (course) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id === course.id);
    if (!exists) {
      cart.push(course);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    navigate("/user/cart");
  };

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const renderPagination = () => {
    const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        className={`btn btn-sm mx-1 mb-2 ${currentPage === page ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </button>
    ));

    return (
      <div className="d-flex flex-wrap justify-content-center mt-4">
        <button
          className="btn btn-outline-secondary btn-sm mx-1 mb-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        {pageButtons}
        <button
          className="btn btn-outline-secondary btn-sm mx-1 mb-2"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-4">
        <h2 className="text-center mb-4 fw-bold bg-secondary text-white py-2">
          AVAILABLE COURSES
        </h2>

        {/* Search Bar */}
        <form className="row g-2 align-items-center mb-4 justify-content-end" onSubmit={handleSearch}>
          <div className="col-12 col-sm-8 col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search courses by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-12 col-sm-4 col-md-2 text-sm-end text-center">
            <button type="submit" className="btn btn-primary w-100 w-sm-auto mt-2 mt-sm-0">
              Search
            </button>
          </div>
        </form>

        {/* Course Cards */}
        <div className="row">
          {currentCourses.length > 0 ? (
            currentCourses.map((course, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex">
                <div className="card h-100 shadow-lg d-flex flex-column">
                  <img
                    src={`https://edunexusbackend-v2-production.up.railway.app/api/courses/image/${course.id}`}
                    className="card-img-top"
                    alt={course.courseName}
                    onError={(e) => (e.target.style.display = "none")}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-primary text-center">
                      {course.courseName}
                    </h5>
                    <p className="card-text flex-grow-1" style={{ minHeight: "100px" }}>
                      {course.description}
                    </p>
                    <div className="mt-auto">
                      <p className="text-muted text-center">
                        <i className="bi bi-clock"></i> Duration: {course.duration}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-primary fs-6">₹{course.price}</span>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleEnroll(course)}
                        >
                          Enroll NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <div className="alert alert-info fs-5">No courses available at the moment.</div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredCourses.length > coursesPerPage && renderPagination()}
      </div>
    </>
  );
};

export default UserDashboard;
