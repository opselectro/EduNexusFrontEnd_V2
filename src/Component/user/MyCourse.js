import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';

function MyCourse() {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for spinner

  useEffect(() => {
    const fetchCourses = async () => {
      if (user) {
        
        const cachedCourses = localStorage.getItem(`courses_${user.id}`);
        const cachedTimestamp = localStorage.getItem(`coursesTimestamp_${user.id}`);
        const cacheValidity = 1000 * 60 * 10; // 10 minutes validity

        if (cachedCourses && cachedTimestamp && (Date.now() - cachedTimestamp) < cacheValidity) {
          setCourses(JSON.parse(cachedCourses)); 
          setLoading(false); 
          try {
            const response = await axios.get(`https://edunexusbackend-v2-production.up.railway.app/api/enrollments/user/${user.id}`);
            setCourses(response.data);
            localStorage.setItem(`courses_${user.id}`, JSON.stringify(response.data)); // Cache courses in localStorage
            localStorage.setItem(`coursesTimestamp_${user.id}`, Date.now()); // Store timestamp
            setLoading(false);
          } catch (error) {
            console.error("Failed to fetch courses:", error);
            setLoading(false); 
          }
        }
      }
    };

    fetchCourses();
  }, [user]);

  return (
    <div className="container mt-5 mb-5">
      <h3 className="mb-4 text-center fw-bold text-primary">My Enrolled Courses</h3>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : courses.length === 0 ? (
        <p className="text-center text-muted">You haven't enrolled in any courses yet.</p>
      ) : (
        <div className="row">
          {courses.map((course, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={`https://edunexusbackend-v2-production.up.railway.app/api/courses/image/${course.id}`}
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
