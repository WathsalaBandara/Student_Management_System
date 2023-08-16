import {Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { useEffect, useState } from "react";
import axios from "axios";

function EditCourse() {
    let { c_id } = useParams();

    const [course, setCourse] = useState({
        c_name: "",
        duration: ""
    });

    useEffect(() => {
        fetch(`http://localhost:8080/getCourseById/${c_id}`)
            .then((res) => res.json())
            .then((result) => {
                setCourse(result);
            });

    }, [c_id]);

    const handleInput = (e) => {
        e.persist();
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const updateCourse = (e) => {
        e.preventDefault();

        const data = {
            c_name: course.c_name,
            duration: course.duration
        };

        axios.put(`http://localhost:8080/updateCourse/${c_id}`, data)
            .then(res => {
                alert("Updated Successfully!");
            });
    };

    return (
        <div>
            <div className="container">
                <div className="card-body">
                    <form onSubmit={updateCourse}>
                    <h1>Edit Course Details</h1><br />
                    <Link to='/Course'>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-primary me-md-2" type="button">Back</button>
          </div>
          </Link>
                        <div className="mb-3">
                            <label>Course Name</label><span style={{ color: "red" }}> *</span>
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
                            <label>Duration</label><span style={{ color: "red" }}> *</span>
                            <input
                                type="text"
                                name="duration"
                                value={course.duration}
                                onChange={handleInput}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <button type="submit" className="bg-secondary">Update Course</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCourse;
