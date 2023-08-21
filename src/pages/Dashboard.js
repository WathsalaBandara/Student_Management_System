import React, { useState, useEffect } from 'react';
import { FaFileSignature, FaUserFriends, FaLayerGroup } from 'react-icons/fa';
import '../App.css';

export default function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalEnrolls, setTotalEnrolls] = useState(0);

  const fetchTotalData = (url, setDataCallback) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setDataCallback(data))
      .catch((error) => console.error(`Error fetching data: ${error}`));
  };

  useEffect(() => {
    fetchTotalData(`http://localhost:8080/getTotalStudents`, setTotalStudents);
  }, []);

  useEffect(() => {
    fetchTotalData(`http://localhost:8080/getTotalCourses`, setTotalCourses);
  }, []);

  useEffect(() => {
    fetchTotalData(`http://localhost:8080/getTotalEnrolls`, setTotalEnrolls);
  }, []);

  const DashboardItem = ({ title, value, icon }) => (
    <div className='col-md-3 bg-secondary d-flex flex-column justify-content-around px-3 py-2 rounded m-4'>
      <p className='text-white'>{title}</p>
      <p className='text-white'>{value}</p>
      {icon}
    </div>
  );

  return (
    <div className='cont'>
      <div className='container mt-3'>
        <div className='row'>
          <DashboardItem title='Total Student' value={totalStudents} icon={<FaUserFriends className='text-white' />} />
          <DashboardItem title='Total Course'  value={totalCourses} icon={<FaLayerGroup className='text-white' />} />
          <DashboardItem title='Total Enroll' value={totalEnrolls} icon={<FaFileSignature className='text-white' />} />
        </div>
      </div>
    </div>
  );
}
