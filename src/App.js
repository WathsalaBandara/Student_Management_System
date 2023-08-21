import React from 'react';
import './App.css';
import MyRouter from './router/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';



function App(){
  
  return (
    <div>
      
        
          <Navbar/>
          <Sidebar />
      
       <div class="main-content">
       
       <MyRouter/>

       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
        </div> 

        
      
      <Footer />
    
    </div>

     

   
  )
}
export default App