import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { hot } from 'react-hot-loader/root';


function AddStudent() {
  const [students, setStudents] = useState([]);

  

  

  useEffect(() => {
    fetch("http://localhost:8080/getStudent")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);

  const deleteStudent = (e, s_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`http://localhost:8080/deleteStudent/${s_id}`).then((res) => {
      alert("Deleted Successfully!");
      fetch("http://localhost:8080/getStudent")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
        
      });
      
    });
  };

  const studentDetails = students.map((student) => (
    <tr key={student.s_id}>
      <td>{student.s_id}</td>
      <td>{student.s_name}</td>
      <td>{student.email}</td>
      <td>{student.gender}</td>
      <td>{student.dob}</td>
      <td>
        <Link to={`/Student/${student.s_id}/EditStudent`} className="btn btn-success mx-2">
          Edit
        </Link>
      </td>
      <td>
        <button type="button" onClick={(e) => deleteStudent(e, student.s_id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
   
    <div>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h1>Student List</h1>
                <Link to='/Student/AddStudent'>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-primary me-md-2" type="button" style={{ textDecoration: 'none' }}>Add</button>
          </div>
          </Link>
              </div>
              <div className="card-body">
                
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>DOB</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                  {studentDetails}
                  
                    </tbody>
                  
                </table>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default hot(AddStudent);
