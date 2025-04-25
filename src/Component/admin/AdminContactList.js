import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AdminContactList() {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [adminContactListPerPage] = useState(4);

  const indexOfFirstContact = (currentPage - 1) * adminContactListPerPage;
  const indexOfLastContact = indexOfFirstContact + adminContactListPerPage;
  const currentMessage = contacts.slice(indexOfFirstContact, indexOfLastContact);

  useEffect(() => {
    setTotalPages(Math.ceil(contacts.length / adminContactListPerPage));
  }, [contacts, adminContactListPerPage]);

  useEffect(() => {
    fetchContactMessage();
  }, []);

  const fetchContactMessage = async () => {
    try {
      const response = await axios.get("https://edunexusbackend-v2-production.up.railway.app/api/contact/admin/get");
      setContacts(response.data);
    } catch (error) {
      alert("Failed to fetch the messages.");
    }
  };

  return (
    <div className="container my-5 px-3">
      <h2 className="text-center text-primary mb-4">User Contact Messages</h2>

      <div className="table-responsive-sm shadow-sm rounded">
        <table className="table table-bordered table-striped mb-0">
          <thead className="table-dark sticky-top text-nowrap">
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Subject</th>
              <th className="text-center">Message</th>
              <th className="text-center">Date/Time</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              currentMessage.map((contact, index) => (
                <tr key={contact.id}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-break">{contact.name}</td>
                  <td className="text-break">{contact.email}</td>
                  <td className="text-break">{contact.subject}</td>
                  <td className="text-break">{contact.message}</td>
                  <td className="text-center">{new Date(contact.datetime).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No messages found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center gap-2 gap-md-3 flex-wrap mt-4">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span className="fw-semibold small">
          Page {currentPage} of {totalPages}
        </span>

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

export default AdminContactList;
