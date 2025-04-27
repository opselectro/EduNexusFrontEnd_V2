import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Component/common/NavBar";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [CoursePerPages] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);  // Loading state for spinner

  const indexOfLast = currentPage * CoursePerPages;
  const indexOfFirst = indexOfLast - CoursePerPages;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    const cachedCourses = localStorage.getItem("courses");
    const cachedTimestamp = localStorage.getItem("coursesTimestamp");
    const cacheValidity = 1000 * 60 * 10; // 10 minutes validity (can be adjusted)

    if (cachedCourses && cachedTimestamp && (Date.now() - cachedTimestamp) < cacheValidity) {
      setCourses(JSON.parse(cachedCourses)); // Load from cache
      setFilteredCourses(JSON.parse(cachedCourses)); // Also filter with the same data
      setLoading(false);
    } else {
      fetchCourses(); // Fetch from server if no valid cache
    }
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredCourses.length / CoursePerPages));
  }, [filteredCourses, CoursePerPages]);

  const fetchCourses = async () => {
    try {
      setLoading(true);  // Start loading spinner
      const res = await axios.get("https://edunexusbackend-v2-production.up.railway.app/api/courses/viewAll");
      setCourses(res.data);
      setFilteredCourses(res.data); // Store the full courses list for searching
      localStorage.setItem("courses", JSON.stringify(res.data)); // Cache in localStorage
      localStorage.setItem("coursesTimestamp", Date.now()); // Store timestamp for cache expiry
      setLoading(false);  // End loading spinner
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);  // End loading spinner
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      setFilteredCourses(courses); // If no search term, reset the filter
    } else {
      // Filter the courses based on courseName, description, and price
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = courses.filter(course => 
        course.courseName.toLowerCase().includes(lowercasedSearchTerm) ||
        course.description.toLowerCase().includes(lowercasedSearchTerm) ||
        course.price.toString().includes(lowercasedSearchTerm)
      );
      setFilteredCourses(filtered);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-4">
        {/* Search Bar */}
        <div className="row g-2 mb-4 justify-content-center justify-content-md-end">
          <div className="col-12 col-md-6 col-lg-4">
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control"
                placeholder="Search for courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(e); // Trigger search on Enter
                  }
                }}
                style={{
                  borderRadius: "50px",
                  padding: "10px 20px",
                  fontSize: "1rem",
                }}
              />
              <button
                type="submit"
                className="btn btn-primary ms-2 w-100 w-sm-auto mt-2 mt-sm-0"
                style={{
                  borderRadius: "50px",
                  padding: "10px 20px",
                  fontSize: "1rem",
                  backgroundColor: "#4CAF50", // Green background
                  borderColor: "#4CAF50", // Same border as background
                  transition: "background-color 0.3s ease", // Smooth transition
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#45a049"; // Hover color
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#4CAF50"; // Reset to original color
                }}
              >
                <i className="bi bi-search"></i> Search
              </button>
            </form>
          </div>
        </div>

        {/* Banner */}
        <div
          className="bg-secondary shadow-lg text-white text-center rounded py-2 mb-3 position-relative overflow-hidden"
          style={{ height: "50px" }}
        >
          <h2
            className="fw-bold font-monospace position-absolute"
            style={{
              whiteSpace: "nowrap",
              animation: "slideLeft 12s linear infinite",
            }}
          >
            🚀 AVAILABLE COURSES • LEARN ANYTIME • GROW ANYWHERE 🌍
          </h2>
        </div>

        <hr />

        {/* Loading Indicator */}
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row" style={{ minHeight: "500px" }}>
            {currentCourses.length > 0 ? (
              currentCourses.map((course, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="card h-100 shadow d-flex flex-column">
                    <img
                      src={`https://edunexusbackend-v2-production.up.railway.app/api/courses/image/${course.id}`}
                      className="card-img-top"
                      alt={course.courseName}
                      onError={(e) => (e.target.style.display = "none")}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-center fw-bold text-primary">
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
                          <span className="badge bg-primary fs-6">
                            ₹{course.price}
                          </span>
                          <button className="btn btn-outline-primary btn-sm">More Info</button>
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
            <button
              className="btn btn-outline-primary"
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`btn ${currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="btn btn-outline-primary"
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Course;
