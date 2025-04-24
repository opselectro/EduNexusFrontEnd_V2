import axios from "axios";
import React, { useEffect, useState } from "react";

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [enrollmentsPerPage] = useState(4);

  const indexOfFirst = (currentPage - 1) * enrollmentsPerPage;
  const indexOfLast = indexOfFirst + enrollmentsPerPage;
  const currentEnrollments = enrollments.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(enrollments.length / enrollmentsPerPage));
  }, [enrollments, enrollmentsPerPage]);

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/enrollments/admin/viewAllEnroll");
      setEnrollments(response.data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      alert("Failed to load enrollments.");
    }
  };

  const cancelEnrollment = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/enrollments/admin/cancel/${id}`);
      alert("Enrollment cancelled successfully.");
      fetchEnrollments();
    } catch (error) {
      console.error("Error cancelling enrollment:", error);
      alert("Failed to cancel enrollment.");
    }
  };

  return (
    <div className="container my-5 px-3">
      <h2 className="text-center text-primary mb-4 fw-bold">All Enrollments</h2>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-bordered text-center align-middle mb-0">
          <thead className="table-dark sticky-top">
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Course Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.length > 0 ? (
              currentEnrollments.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td className="text-break">{e.username}</td>
                  <td className="text-break">{e.courseName}</td>
                  <td>
                    <span className={`badge ${e.status === "Active" ? "bg-success" : "bg-secondary"}`}>
                      {e.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => cancelEnrollment(e.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No Enrollments Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    
      <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap mt-4">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="fw-semibold small">Page {currentPage} of {totalPages}</span>
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Enrollments;
