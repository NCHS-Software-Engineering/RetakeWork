import './Home.css';
import Sidebar from './Sidebar.js';
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
import "./logoWhite.png";
function App() {
  
    
  return (
    <body>
      <div className="HomePage">
        <div className="HomePage" id="outer-container">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        
        </div>
          <header className="Home-header">
          <p>
              Retake App
            </p>
          
          <Image src={logo} alt="Retake work app logo" style={{ width: '800'}} fluid/>
          
          </header>
          
        
        </div>
    </body>
    
  );
}






export default App;
