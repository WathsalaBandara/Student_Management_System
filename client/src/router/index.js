import React from "react";
import { Routes,Route } from "react-router-dom";
import Student from '../pages/Student'
import Course from '../pages/Course';
import Enroll from '../pages/Enroll';
import AddStudent from '../pages/AddStudent';
import EditStudent from "../pages/EditStudent";
import AddCourse from '../pages/addCourse';
import Dashboard from '../pages/Dashboard';
import EditCourse from '../pages/EditCourse';
import EnrollList from '../pages/EnrollList';




export default function MyRouter(){
    return (
        
            <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Student" element={<Student />} />
            <Route path="/Course" element={<Course />} />
            <Route path="/Enroll/Enroll" element={<Enroll />} />
            <Route path="/Student/AddStudent" element={<AddStudent />} />
            <Route path="/Student/:s_id/EditStudent" element={<EditStudent/>} />
            <Route path="/Course/AddCourse" element={<AddCourse />} />
            <Route path="/Course/:c_id/EditCourse" element={<EditCourse/>} />
            <Route path="/Enroll/EnrollList" element={<EnrollList />} />


        </Routes>
        
    )
}