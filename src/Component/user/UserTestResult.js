import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';

const UserDashboardResults = () => {
  const { user } = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!user || !user.username) return;

      try {
        const res = await axios.get(`https://edunexusbackend-v2-production.up.railway.app/api/users/results/${user.username}`);
        setResults(res.data || []);
      } catch (err) {
        console.error("Failed to fetch user test results", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [user]);

  const getScorePercent = (correct, total) => {
    if (!total || total === 0) return 0;
    return ((correct / total) * 100).toFixed(1);
  };

  const getPerformance = (score) => {
    const percent = parseFloat(score);
    if (percent >= 90) return { label: "Excellent", color: "success" };
    if (percent >= 70) return { label: "Good", color: "primary" };
    if (percent >= 50) return { label: "Average", color: "warning" };
    return { label: "Poor", color: "danger" };
  };

  return (
    <div className="container py-5">
      <h4 className="text-center text-primary mb-4">
        <i className="bi bi-person-check-fill me-2"></i>My Test Results
      </h4>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : results.length === 0 ? (
        <div className="alert alert-info text-center">No test results found.</div>
      ) : (
        <div className="table-responsive shadow rounded">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Test Title</th>
                <th>Total Questions</th>
                <th>Correct Answers</th>
                <th>Score (%)</th>
                <th>Performance</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, index) => {
                const score = getScorePercent(res.correctQuestion, res.totalQuestion);
                const performance = getPerformance(score);
                return (
                  <tr key={index}>
                    <td>{res.testTitle}</td>
                    <td>{res.totalQuestion}</td>
                    <td>{res.correctQuestion}</td>
                    <td>{score}%</td>
                    <td>
                      <span className={`badge bg-${performance.color}`}>
                        {performance.label}
                      </span>
                    </td>
                    <td>{res.feedback || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDashboardResults;
