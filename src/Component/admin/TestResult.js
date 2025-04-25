import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestResults = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("https://edunexusbackend-v2-production.up.railway.app/api/admin/test/getResult");
        setResults(res.data || []);
        setFilteredResults(res.data || []);
      } catch (err) {
        console.error("Error fetching results", err);
        setResults([]);
        setFilteredResults([]);
      }
    };

    fetchResults();
  }, []);

  useEffect(() => {
    const filtered = results.filter((result) =>
      result.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.testTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(filtered);
  }, [searchTerm, results]);

  const getPerformanceLabel = (scorePercent) => {
    if (scorePercent >= 90) return { label: "Excellent", color: "success" };
    if (scorePercent >= 70) return { label: "Good", color: "primary" };
    if (scorePercent >= 50) return { label: "Average", color: "warning" };
    return { label: "Poor", color: "danger" };
  };

  const getScorePercent = (correct, total) => {
    if (!total || total === 0) return 0;
    return ((correct / total) * 100).toFixed(1);
  };

  return (
    <div className="py-4" style={{ maxWidth: '900px', margin: '80px auto 20px auto' }}>
      <h4 className="text-center text-success mb-4">
        <i className="bi bi-bar-chart-fill me-2"></i>User Test Results
      </h4>

      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍 Search by User Name or Test Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredResults.length === 0 ? (
        <div className="alert alert-info text-center">No test results found.</div>
      ) : (
        <div className="table-responsive shadow rounded">
          <table className="table table-hover table-striped table-bordered align-middle text-center mb-0">
            <thead className="table-dark">
              <tr>
                <th><i className="bi bi-person-fill me-1"></i>User Name</th>
                <th><i className="bi bi-journal-text me-1"></i>Test</th>
                <th><i className="bi bi-check2-all me-1"></i>Total Q</th>
                <th><i className="bi bi-check-circle-fill me-1"></i>Correct Q</th>
                <th><i className="bi bi-star-fill me-1"></i>Score (%)</th>
                <th><i className="bi bi-graph-up-arrow me-1"></i>Performance</th>
                <th><i className="bi bi-chat-dots me-1"></i>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((r, i) => {
                const correct = r.correctQuestion || 0;
                const total = r.totalQuestion || 0;
                const scorePercent = getScorePercent(correct, total);
                const performance = getPerformanceLabel(scorePercent);

                return (
                  <tr key={i}>
                    <td>{r.username || "N/A"}</td>
                    <td>{r.testTitle || "N/A"}</td>
                    <td>{total}</td>
                    <td>{correct}</td>
                    <td>{scorePercent}%</td>
                    <td>
                      <span className={`badge bg-${performance.color}`}>
                        {performance.label}
                      </span>
                    </td>
                    <td>{r.feedback || "—"}</td>
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

export default TestResults;
