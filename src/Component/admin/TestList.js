import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminManageTests = () => {
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTests = async () => {
    try {
      const res = await axios.get("https://edunexusbackend-v2-production.up.railway.app/api/users/test/getTest");
      setTests(res.data || []);
      setFilteredTests(res.data || []);
    } catch (err) {
      console.error("Failed to fetch tests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  useEffect(() => {
    const filtered = tests.filter((test) =>
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTests(filtered);
  }, [searchTerm, tests]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this test?")) return;
    try {
      await axios.delete(`https://edunexusbackend-v2-production.up.railway.app/api/admin/test/delete/${id}`);
    
      setTests(tests.filter(test => test.id !== id));
      setFilteredTests(filteredTests.filter(test => test.id !== id));
    } catch (err) {
      console.error("Failed to delete test", err);
    }
  };

  return (
    <div className="container py-5">
      <h3 className="text-center mb-4">🧪 Admin Test Management</h3>

      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍 Search by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center">Loading tests...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered text-center align-middle shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Test ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.length > 0 ? (
                filteredTests.map(test => (
                  <tr key={test.id}>
                    <td>{test.id}</td>
                    <td>{test.title}</td>
                    <td>{test.description}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(test.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-muted">No tests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminManageTests;
