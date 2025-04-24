import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';

function MyCourse() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:8080/api/enrollments/user/${user.id}`);
          setCourses(response.data);
        } catch (error) {
          console.error("Failed to fetch courses:", error);
        }
      }
    };

    fetchCourses();
  }, [user]);

  return (
    <div className="container mt-5 mb-5">
      <h3 className="mb-4 text-center fw-bold text-primary">My Enrolled Courses</h3>

      {courses.length === 0 ? (
        <p className="text-center text-muted">You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="row">
          {courses.map((course, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={`http://localhost:8080/api/courses/image/${course.id}`}
                  className="card-img-top"
                  alt={course.courseName}
                  onError={(e) => (e.target.style.display = 'none')}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center text-primary fw-bold">{course.courseName}</h5>
                  <p className="card-text flex-grow-1 text-muted" style={{ minHeight: '100px' }}>
                    {course.description}
                  </p>
                  <div className="mt-auto">
                    <p className="text-muted text-center mb-2">
                      <i className="bi bi-clock me-1"></i> Duration: {course.duration}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-primary fs-6">₹{course.price}</span>
                      <button className="btn btn-outline-primary btn-sm">More Info</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourse;
