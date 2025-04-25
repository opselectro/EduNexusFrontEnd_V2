import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/NavBar";

const ManageCourse = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const coursesPerPage = 3;

  const [newCourse, setNewCourse] = useState({
    courseName: "",
    description: "",
    price: "",
    duration: "",
  });
  const [image, setImage] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
    else if (user.role !== "ADMIN") navigate("/admin");
  }, [user, navigate]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("https://edunexusbackend-v2-production.up.railway.app/api/courses/viewAll");
      setCourses(response.data);
      setTotalPages(Math.ceil(response.data.length / coursesPerPage));
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const currentCourses = courses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://edunexusbackend-v2-production.up.railway.app/api/courses/search?courseName=${searchTerm}`
      );
      setCourses(response.data);
      setCurrentPage(1);
      setTotalPages(Math.ceil(response.data.length / coursesPerPage));
    } catch (error) {
      console.error("Error searching courses:", error);
    }
  };

  const handleEdit = (course) => {
    setNewCourse({
      courseName: course.courseName,
      description: course.description,
      price: course.price,
      duration: course.duration,
    });
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleUpdateCourse = async () => {
    try {
      const { courseName, description, price, duration } = newCourse;
      if (!courseName || !description || !price || !duration) {
        alert("All fields are required");
        return;
      }

      const formData = new FormData();
      formData.append("courseName", courseName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("duration", duration);
      if (image) formData.append("imageFile", image);

      await axios.put(
        `https://edunexusbackend-v2-production.up.railway.app/api/courses/admin/update/${editingCourse.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Course updated successfully");
      setShowForm(false);
      setNewCourse({ courseName: "", description: "", price: "", duration: "" });
      setImage(null);
      setEditingCourse(null);
      fetchCourses();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />

      <div className="container mt-4">
        <h2 className="text-center text-white bg-dark p-3 rounded mb-4">Manage Courses</h2>

        <div className="row">
          {currentCourses.length > 0 ? (
            currentCourses.map((course, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={`https://edunexusbackend-v2-production.up.railway.app/api/courses/image/${course.id}`}
                    className="card-img-top"
                    alt={course.courseName}
                    onError={(e) => (e.target.style.display = "none")}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-center text-primary fw-bold">
                      {course.courseName}
                    </h5>
                    <p className="card-text flex-grow-1">{course.description}</p>
                    <p className="text-muted text-center mt-2">Duration: {course.duration}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-primary fs-6">₹{course.price}</span>
                      <button className="btn btn-outline-primary btn-sm" onClick={() => handleEdit(course)}>
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center alert alert-info fs-5">No courses available</div>
          )}
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="mx-2">Page {currentPage} of {totalPages}</span>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {showForm && (
          <div className="modal show d-block mt-5" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Course</h5>
                  <button className="btn-close" onClick={() => setShowForm(false)}></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Course Name"
                    value={newCourse.courseName}
                    onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
                  />
                  <textarea
                    className="form-control mb-3"
                    rows={3}
                    placeholder="Description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Price"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Duration"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                  />
                  <input
                    type="file"
                    className="form-control mb-3"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleUpdateCourse}>
                    Update Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageCourse;
