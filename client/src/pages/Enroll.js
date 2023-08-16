import { Link,useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { useState ,useEffect} from "react";
import axios from 'axios';


function Enroll() {
  let { s_id, c_id } = useParams();

  s_id = parseInt(s_id);
  c_id = parseInt(c_id);

  const [enrollment, setEnrollment] = useState({
    student_id: isNaN(s_id) ? "" : s_id,
    course_id: isNaN(c_id) ? "" : c_id,
  });

  const [errors, setErrors] = useState({
    student_id: false,
    course_id: false,
  });

  const handleInput = (e) => {
    e.persist();
    const value = e.target.value;
    const name = e.target.name;

    if (!isNaN(value)) {
      setEnrollment({ ...enrollment, [name]: value });
      setErrors({ ...errors, [name]: false });
    } else {
      setErrors({ ...errors, [name]: true });
    }
  };

  const handleEnroll = (e) => {
    e.preventDefault();

   
    if (!errors.student_id && !errors.course_id) {
      axios
        .put(`http://localhost:8080/${enrollment.student_id}/course/${enrollment.course_id}`, enrollment)
        .then((res) => {
          alert("Enroll Successful!");
          fetch('http://localhost:8080/EnrollList')
        .then((res) => res.json())
        .then((result) => {
        setenrolllist(result);
      });
          setEnrollment({
            student_id: '',
            course_id: '',
          })
        })
        .catch((error) => {
          alert("Enrollment Failed!"); // Handle error case
        });
    } else {
      alert("Please enter valid student and course IDs.");
    }
  };

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
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h1>Enroll</h1>
                <Link to='/Enroll/EnrollList' style={{ textDecoration: 'none' }}>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button className="btn btn-warning" type="button">
                        Back
                      </button>
                    </div>
          </Link>
              </div>
              <div className="card-body">
                <form onSubmit={handleEnroll}>
                  <div className="mb-3">
                    <label>Student Id</label>
                    <span style={{ color: "red" }}> *</span>
                    <input
                      type="text"
                      name="student_id"
                      value={enrollment.student_id}
                      onChange={handleInput}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Course Id</label>
                    <span style={{ color: "red" }}> *</span>
                    <input
                      type="text"
                      name="course_id"
                      value={enrollment.course_id}
                      onChange={handleInput}
                      className="form-control"
                      required
                    />
                  </div>
                  <br />
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="submit" className="bg-secondary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />

      <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h1>Enroll List</h1>

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
    </div>
  );
}

export default Enroll;


