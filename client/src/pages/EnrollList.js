import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function EnrollList() {
  const [enrolllist, setenrolllist] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/EnrollList')
      .then((res) => res.json())
      .then((result) => {
        setenrolllist(result);
      });
  }, []);

  const deleteEnroll = (e, e_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = 'Deleting';

    axios.delete(`http://localhost:8080/deleteEnroll/${e_id}`).then((res) => {
      alert('Deleted Successfully!');
      fetch('http://localhost:8080/EnrollList')
      .then((res) => res.json())
      .then((result) => {
        setenrolllist(result);
      });
    });
  };

  const enrollDetails = enrolllist.map((enroll) => {
    return (
      <tr key={enroll.e_id}>
        <td>{enroll.e_id}</td>
        <td>{enroll.student_id}</td>
        <td>{enroll.course_id}</td>
        <td>
          <button type="button" onClick={(e) => deleteEnroll(e, enroll.e_id)} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h1>Enroll List</h1>

              <Link to="/Enroll/Enroll">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button className="btn btn-primary me-md-2" type="button">
                    Enroll
                  </button>
                </div>
              </Link>
            </div>
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Enroll Id</th>
                    <th>Student Id</th>
                    <th>Course Id</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>{enrollDetails}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrollList;
