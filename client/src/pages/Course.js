import React,{useEffect, useState} from 'react';
import '../App.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";





function Course(){
  
  const [courses, setCourses] = useState([]);


  useEffect(() => {
      fetch('http://localhost:8080/getCourse')
      .then((res) => res.json())
      .then((result) => {
        setCourses(result);
      });
  }, []);
  
  

  const deleteCourse = (e,c_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`http://localhost:8080/deleteCourse/${c_id}`)
    .then(res => {
        alert("Deleted Successfully!");
        fetch('http://localhost:8080/getCourse')
      .then((res) => res.json())
      .then((result) => {
        setCourses(result);
      });
         
       
    });
  }

  const courseDetails=courses.map((course) => {
    return (
      <tr key={course.c_id}>
        <td>{course.c_id}</td>
        <td>{course.c_name}</td>
        <td>{course.duration}</td>
        
      <td>
     
      <Link to={`/Course/${course.c_id}/EditCourse`} className='btn btn-success mx-2'>Edit</Link>
      </td>
      <td>
        <button type="button" onClick={(e) => deleteCourse(e,course.c_id)} className='btn btn-danger'>Delete </button>
      </td>
                 
    
      

    </tr>
  )
})




  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='card'>
          <div className='card-header'>
          <h1>Course List</h1>
          
          <Link to='/Course/addCourse'>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-primary me-md-2" type="button" style={{ textDecoration: 'none' }}>Add</button>
          </div>
          </Link>
          </div>
        <div className='card-body'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Course Name</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courseDetails}
            </tbody>
          </table>

        </div>
          </div>

        </div>
      </div>
     
    </div>
     

   
  )
}
export default Course;