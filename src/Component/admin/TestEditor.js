import React, { useState } from 'react';
import axios from 'axios';

const TestEditor = ({ onTestSaved }) => {
  const [form, setForm] = useState({ title: '', description: '' });
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: ''
  });

  const resetForm = () => {
    setForm({ title: '', description: '' });
    setQuestions([]);
    setNewQuestion({ question: '', options: ['', '', '', ''], correctAnswer: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      alert("Please fill out the test title and description.");
      return;
    }

    if (questions.length < 1 || questions.length > 10) {
      alert("You must add between 1 and 10 questions.");
      return;
    }

    const payload = {
      ...form,
      questions: questions.map(q => ({
        question: q.question,
        optionA: q.options[0],
        optionB: q.options[1],
        optionC: q.options[2],
        optionD: q.options[3],
        correctOption: q.correctAnswer
      }))
    };

    try {
      await axios.post("https://edunexusbackend-v2-production.up.railway.app/api/admin/test/add", payload);
      alert("Test added successfully!");
      resetForm();
      if (onTestSaved) onTestSaved();
    } catch (err) {
      console.error("Error adding test", err);
      alert("Something went wrong while saving the test.");
    }
  };

  const addQuestion = () => {
    const { question, options, correctAnswer } = newQuestion;
    if (!question || options.some(opt => !opt) || !correctAnswer) {
      alert("Please fill out the question and all options.");
      return;
    }

    if (questions.length >= 10) {
      alert("You can add a maximum of 10 questions.");
      return;
    }

    setQuestions([...questions, newQuestion]);
    setNewQuestion({ question: '', options: ['', '', '', ''], correctAnswer: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-light rounded border" style={{ maxWidth: '600px', margin: '80px auto 20px auto' }}>
      <h5 className="text-dark mb-3">Add Test</h5>

      <div className="mb-2">
        <input
          className="form-control form-control-sm"
          placeholder="Test Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>

      <div className="mb-2">
        <textarea
          className="form-control form-control-sm"
          placeholder="Test Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={2}
          required
        />
      </div>

      <small className="text-secondary">Add Question</small>

      <div className="mb-2">
        <input
          className="form-control form-control-sm"
          placeholder="Question"
          value={newQuestion.question}
          onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
        />
      </div>

      {newQuestion.options.map((opt, i) => (
        <div className="mb-2" key={i}>
          <input
            className="form-control form-control-sm"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              const opts = [...newQuestion.options];
              opts[i] = e.target.value;
              setNewQuestion({ ...newQuestion, options: opts });
            }}
          />
        </div>
      ))}

      <div className="mb-2">
        <input
          className="form-control form-control-sm"
          placeholder="Correct Answer"
          value={newQuestion.correctAnswer}
          onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
        />
      </div>

      <div className="mb-3 text-end">
        <button type="button" className="btn btn-sm btn-outline-success" onClick={addQuestion}>
          + Add Question
        </button>
      </div>

      {questions.length > 0 && (
        <div className="mb-3">
          <ul className="list-group list-group-sm">
            {questions.map((q, i) => (
              <li className="list-group-item py-1 px-2" key={i} style={{ fontSize: '14px' }}>
                <strong>{q.question}</strong> <br />
                <span className="text-muted">Answer: {q.correctAnswer}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button type="submit" className="btn btn-sm btn-primary w-100">
        Add Test
      </button>
    </form>
  );
};

export default TestEditor;
