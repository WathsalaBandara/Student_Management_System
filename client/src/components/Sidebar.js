import React from "react";
import { Link } from "react-router-dom";
import { BsGrid ,BsPeople,BsMortarboard,BsClipboardCheck} from "react-icons/bs";
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Sidebar(){
    return (
        <div className="bg-white sidebar">
            <div className="m-2">
                <i className=" bi bi-balloon-heart  my-2 fs-4"></i>
                <span className="brand-name fs-4">      Welcome</span>
            </div>
            <hr className="text-dark" />
            <div className="list-group list-group-flush">
                <Link to='/Dashboard' className="list-group-item py-2" href="">
                <BsGrid/>
                    <span>         Dashboard</span>
                </Link>
                <Link to='/Student' className="list-group-item py-2">
                    <BsPeople/>
                    <span>          Student</span>
                </Link>
                <Link to='/Course' className="list-group-item py-2">
                    <BsMortarboard/>
                    <span>         Course</span>
                </Link>
                <Link to='/Enroll/EnrollList' className="list-group-item py-2">
                    <BsClipboardCheck/>
                    <span>           Enroll</span>
                </Link>
            </div>
        </div>
    )
}
export default Sidebar;