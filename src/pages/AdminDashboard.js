import React, { useContext, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is admin
  useEffect(() => {
    if (!user) {
      console.error("User not found, redirecting...");
      navigate("/login");
    } else if (user.role !== "ADMIN") {
      console.error("Unauthorized access, redirecting...");
      navigate("/admin");
    }
  }, [user, navigate]);

  // Fetch enrollment stats from the backend
  useEffect(() => {
    axios
      .get("https://edunexusbackend-v2-production.up.railway.app/api/enrollments/admin/enrollment/stats")
      .then((response) => {
        setEnrollmentData([
          { name: "Enrolled", value: response.data.enrolledCount},
          { name: "Cancelled", value: response.data.cancelledCount },
        ]);
        setIsLoading(false); 
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); 
      });
  }, []);

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-4">
      <div className="row d-flex align-items-center justify-content-center">
     
        <div className="col-md-6 mb-4">
          <div className="card shadow rounded-4 text-center p-3">
            <h5 className="card-title">Enrollment Status</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={enrollmentData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
