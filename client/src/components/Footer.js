import React, { Component } from 'react'
import '../App.css';



class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
    
        return (   
      <footer >
      
      <div className='footer'>
        <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
        <p>Contact: contact@mywebsite.com</p>
        <p>Terms of Service | Privacy Policy</p>
      </div>
      
    </footer>

    
    
        )

        
    }
  }

export default FooterComponent