import axios from 'axios';
import React, { useState } from 'react';

function AddCourse({ setShowForm }) {

  const [newCourse, setNewCourse] = useState({
    courseName: "",
    description: "",
    price: "",
    duration: "",
  });
  const [image, setImage] = useState(null);

  const handleAddCourse = async () => {
    try {
      if (
        !newCourse.courseName ||
        !newCourse.description ||
        !newCourse.price ||
        !newCourse.duration
      ) {
        alert("All fields are required");
        return;
      }

      const formData = new FormData();
      formData.append("courseName", newCourse.courseName);
      formData.append("description", newCourse.description);
      formData.append("price", newCourse.price);
      formData.append("duration", newCourse.duration);
      if (image) {
        formData.append("imageFile", image);
      }

      await axios.post(
        "https://edunexusbackend-v2-production.up.railway.app/api/courses/admin/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Course Added Successfully");

      setNewCourse({
        courseName: "",
        description: "",
        price: "",
        duration: "",
      });
      setImage(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div>
      <div className="modal show d-block mt-5" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Course</h5>
              <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Course Name"
                  value={newCourse.courseName}
                  onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Price"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Duration"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Course Image</label>
                <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>

              <button className="btn btn-primary" onClick={handleAddCourse}>
                Add Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
