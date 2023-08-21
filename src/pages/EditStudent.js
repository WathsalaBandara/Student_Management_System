
import {Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { hot } from 'react-hot-loader/root';


// ... (import statements)

function EditStudent() {
    let { s_id } = useParams();
  
    const [student, setStudent] = useState({
      s_name: "",
      email: "",
      gender: "",
      dob: "",
      courses: []
    });
  
    useEffect(() => {
      fetch(`http://localhost:8080/getStudentById/${s_id}`)
        .then((res) => res.json())
        .then((result) => {
          const transformedStudent = {
            s_name: result.s_name,
            email: result.email,
            gender: result.gender,
            dob: result.dob,
            courses: result.courses
          };
          setStudent(transformedStudent);
        });
    }, [s_id]);
  
    const handleInput = (e) => {
      e.persist();
      setStudent({ ...student, [e.target.name]: e.target.value });
    };
  
    const updateStudent = (e) => {
      e.preventDefault();
  
      const data = {
        s_name: student.s_name,
        email: student.email,
        gender: student.gender,
        dob: student.dob
      };
  
      axios
        .put(`http://localhost:8080/updateStudent/${s_id}`, data)
        .then((res) => {
          alert("Updated Successfully!");
          setStudent({ 
            s_name: "",
            email: "",
            gender: "",
            dob: "",
            courses: []
          });
        });
    };
  
    return (
        <div>
        
  
        <div className="container">
          <div className="card-body">
            <form onSubmit={updateStudent}>
            <h1>Edit Student Details</h1><br />
            <Link to='/Student'>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-primary me-md-2" type="button">Back</button>
          </div>
          </Link>
              <div className="mb-3">
             
                <label>Name</label><span style={{ color: "red" }}> *</span>
                <input
                  type="text"
                  name="s_name" 
                  value={student.s_name}
                  onChange={handleInput}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label>Email</label><span style={{ color: "red" }}> *</span>
                <input
                  type="text"
                  name="email" 
                  value={student.email}
                  onChange={handleInput}
                  className="form-control"
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Gender</label><span style={{ color: "red" }}> *</span>
                <input
                  type="text"
                  name="gender" 
                  value={student.gender}
                  onChange={handleInput}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label>DOB</label><span style={{ color: "red" }}> *</span>
                <input
                  type="date" 
                  name="dob" 
                  value={student.dob}
                  onChange={handleInput}
                  className="form-control"
                  required
                />
              </div>
              <br/>
              <br/>
              <br/>
              <br/>
              <div className="mb-3">
                <h5>Course Details</h5><br />
                <div>
  
     
        <div className="mb-3">
         
          <ul>
            {student.courses.map((course, index) => (
              <li key={index}>
                <label>Course Name: {course.c_name}</label>
                <br />
                <label>Duration: {course.duration}</label>
                <br />
                <br />
              </li>
            ))}
          </ul>
        </div>
       
</div>

              </div>
              <div className="mb-3">
                <button type="submit" className="bg-secondary">Update Student</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    );
  }
  
  export default hot(EditStudent);
  