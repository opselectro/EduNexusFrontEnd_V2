import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserTest = () => {
  const [userId, setUserId] = useState(null);
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 3;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) setUserId(user.id);
    fetchAllTests();
  }, []);

  const fetchAllTests = async () => {
    try {
      const res = await axios.get('https://edunexusbackend-v2-production.up.railway.app/api/users/test/getTest');
      setTests(res.data || []);
    } catch (err) {
      console.error('Error fetching tests:', err);
    }
  };

  const handleTestSelect = (test) => {
    setSelectedTest(test);
    setAnswers({});
    setResult(null);
    setShowResultPopup(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswerChange = (questionId, selectedOptionKey, question) => {
    const selectedOptionValue = question[`option${selectedOptionKey}`];
    setAnswers(prev => ({ ...prev, [questionId]: selectedOptionValue }));
  };

  const submitTest = async () => {
    if (!userId || !selectedTest?.id) return alert("Missing test or user ID");
    if (Object.keys(answers).length !== selectedTest.questions.length) return alert("Answer all questions.");

    const payload = {
      testId: selectedTest.id,
      userId: userId,
      answers: answers
    };

    try {
      const res = await axios.post(`https://edunexusbackend-v2-production.up.railway.app/api/users/test/submit`, payload);
      setResult(res.data);
      setShowResultPopup(true);
    } catch (err) {
      console.error('Submission failed:', err);
      alert("Submission failed. Try again.");
    }
  };

  const renderOptions = (q) => {
    return ['A', 'B', 'C', 'D'].map(opt => {
      const selectedValue = answers[q.id];
      const actualOptionValue = q[`option${opt}`];
      const isSelected = selectedValue === actualOptionValue;
      const qResult = result?.questionResults?.find(r => r.questionId === q.id);
      const isCorrect = qResult?.correctAnswer === actualOptionValue;
      const isUserCorrect = result && isSelected && isCorrect;
      const isUserWrong = result && isSelected && !isCorrect;

      return (
        <div key={opt} className={`form-check ps-4 ${isUserCorrect ? 'text-success' : ''} ${isUserWrong ? 'text-danger' : ''}`}>
          <input
            className="form-check-input"
            type="radio"
            name={`q-${q.id}`}
            value={actualOptionValue}
            checked={isSelected}
            onChange={() => handleAnswerChange(q.id, opt, q)}
            id={`q-${q.id}-${opt}`}
            disabled={!!result}
          />
          <label className="form-check-label" htmlFor={`q-${q.id}-${opt}`}>
            <strong>{opt}.</strong> {actualOptionValue}
            {result && isCorrect && <span className="ms-2 badge bg-success">Correct</span>}
          </label>
        </div>
      );
    });
  };

  const filteredTests = tests.filter(test =>
    test.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTests.length / testsPerPage);
  const currentTests = filteredTests.slice((currentPage - 1) * testsPerPage, currentPage * testsPerPage);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">🧪 Available Tests</h2>
        <div className="input-group w-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-primary" type="button" onClick={fetchAllTests}>
            🔍
          </button>
        </div>
      </div>

      {/* Tests as Cards */}
      <div className="row">
        {currentTests.map(test => (
          <div key={test.id} className="col-sm-6 col-md-4 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm border-primary">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title text-primary">{test.title}</h5>
                <p className="text-muted small">{test.description?.slice(0, 80) ?? 'No description'}</p>
                <button
                  onClick={() => handleTestSelect(test)}
                  className="btn btn-outline-primary rounded-pill mt-auto"
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center my-4">
          <button className="btn btn-outline-secondary me-2" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
          <span className="px-3 align-self-center">Page {currentPage} of {totalPages}</span>
          <button className="btn btn-outline-secondary ms-2" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
        </div>
      )}

      {/* Test Panel */}
      {selectedTest && (
        <div className="card shadow-lg mb-5">
          <div className="card-body p-4">
            <h3 className="card-title text-primary">{selectedTest.title}</h3>
            <p className="text-muted">{selectedTest.description}</p>
            {selectedTest.questions.map((q, idx) => (
              <div className="mb-4 border-bottom pb-3" key={q.id}>
                <h5>{idx + 1}. {q.question}</h5>
                {renderOptions(q)}
              </div>
            ))}
            {!result && (
              <div className="text-center mt-4">
                <button className="btn btn-success btn-lg px-5 rounded-pill" onClick={submitTest}>
                  Submit Test
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Result Popup */}
      {showResultPopup && result && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">🎉 Test Completed</h5>
                <button type="button" className="btn-close" onClick={() => setShowResultPopup(false)}></button>
              </div>
              <div className="modal-body text-center">
                <h4 className="text-primary mb-3">
                  🎯 Score: {result.score ?? 0} / {result.totalQuestion ?? selectedTest?.questions?.length ?? 0}
                </h4>
                <p>Total Questions: <strong>{result.totalQuestion}</strong></p>
                <p>Correct Answers: <strong>{result.correctQuestion}</strong></p>
                <p className={`fw-bold ${
                  result.score >= (result.totalQuestion / 2)
                    ? 'text-success'
                    : result.score >= (result.totalQuestion / 4)
                    ? 'text-warning'
                    : 'text-danger'
                }`}>
                  {result.feedback ?? "Keep learning!"}
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary rounded-pill" onClick={() => setShowResultPopup(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTest;
