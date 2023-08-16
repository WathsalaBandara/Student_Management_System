import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { hot } from 'react-hot-loader/root';


function AddStudent() {
  const [students, setStudents] = useState([]);

  const [student, setStudent] = useState({
    Name: "",
    Email: "",
    Gender: "",
    DOB: "",
  });

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const SaveStudent = (e) => {
    e.preventDefault();

    const data = {
      s_name: student.Name,
      email: student.Email,
      dob: student.DOB,
      gender: student.Gender
    };
    axios.post("http://localhost:8080/addStudent", data).then((res) => {
      alert("Added Successfully!");
      fetch("http://localhost:8080/getStudent")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
        setStudent({ 
          Name: "",
          Email: "",
          Gender: "",
          DOB: "",
        });
      });
    });
  };

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
        setStudent({ 
          Name: "",
          Email: "",
          Gender: "",
          DOB: "",
        });
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
         <br/>
    <br/>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h1>
                  Add Student
                  <Link to="/Student" role="button" style={{ textDecoration: 'none' }}>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button className="btn btn-warning" type="button">
                        Back
                      </button>
                    </div>
                  </Link>
                </h1>
              </div>
              <div className="card-body">
                <form onSubmit={SaveStudent}>
                  <div className="mb-3">
                    <label>Name</label>
                    <span style={{ color: "red" }}> *</span>
                    <input
                      type="text"
                      name="Name"
                      value={student.Name}
                      onChange={handleInput}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <span style={{ color: "red" }}> *</span>
                    <input
                      type="text"
                      name="Email"
                      value={student.Email}
                      onChange={handleInput}
                      className="form-control"
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$"
                      required
                    />
                  </div>
                  <div className="mb-3">
  <label className="form-label">Gender</label>
  <span style={{ color: "red" }}> *</span>
  <select className="form-control" name="Gender" value={student.Gender} onChange={handleInput} required >
      <option selected>--Select--</option>
      <option value="Female">Female</option>
      <option value="Male">Male</option>
  </select>
</div>

                  <div className="mb-3">
                    <label>DOB</label>
                    <span style={{ color: "red" }}> *</span>
                    <input
                      type="Date"
                      name="DOB"
                      value={student.DOB}
                      onChange={handleInput}
                      className="form-control"
                      required
                    />
                  </div>
                  <br/>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="Submit" className="bg-secondary" >
                      Save  
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
                <br/>
                <br/>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h1>Student List</h1>
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
