import React,{useEffect, useState} from 'react';
import '../App.css'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";





function Course(){
  
  const [courses, setCourses] = useState([]);

  const [course, setCourse] = useState({
    c_name:'',
    duration:''
  });

  const handleInput = (e) => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/getCourse`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  const SaveCourse = (e) => {
    e.preventDefault();

    const data = {
      c_name: course.c_name,
      duration:course.duration,
      
    };
    axios.post("http://localhost:8080/addCourse", data).then((res) => {
      alert("Added Successfully!");
      axios.get(`http://localhost:8080/getCourse`)
      .then((response) => {
        setCourses(response.data);
        setCourse({
          c_name:'',
          duration:'',
        })
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    });
  };

  const deleteCourse = (e,c_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios.delete(`http://localhost:8080/deleteCourse/${c_id}`)
    .then(res => {
        alert("Deleted Successfully!");
        axios.get(`http://localhost:8080/getCourse`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
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

    <div>
         <br/>
    <br/>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h1>
                  Add Course
                  <Link to="/Course" role="button" style={{ textDecoration: 'none' }}>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button className="btn btn-warning" type="button">
                        Back
                      </button>
                    </div>
                  </Link>
                </h1>
              </div>
              <div className="card-body">
                <form onSubmit={SaveCourse}>
                  <div className="mb-3">
                    <label>Course Name</label>
                    <span style={{ color: "red" }}> *</span>
                    <input
                      type="text"
                      name="c_name"
                      value={course.c_name}
                      onChange={handleInput}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Duration</label>
                    <span style={{ color: "red" }}> *</span>
                    <input
                      type="text"
                      name="duration"
                      value={course.duration}
                      onChange={handleInput}
                      className="form-control"
                      required
                    />
                  </div>
                  
                  
                  <br/>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="Submit" className="bg-secondary">
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

    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='card'>
          <div className='card-header'>
          <h1>Course List</h1>
          
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
    </div>
     

   
  )
}
export default Course;