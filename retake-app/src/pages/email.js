import './email.css';
import Sidebar from './Sidebar';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
 
import { useNavigate } from "react-router-dom";
import Login from './Login.js';
import logo from './logoWhite.png';
import Image from 'react-bootstrap/Image';


const Email = () => {
  
    
   
    return(
      
        <body>
        <div className='screen'>
        <div className='box'>
            <form action="">
                <h1>Email</h1>

                
            </form>
        </div>
        </div>
        </body>
      );
      
    
  }
  

  export default Email;