import './Home.css';
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
import logo from './LogoNB.png';
function App() {
  
    
  return (
    <body>
    <div className="HomePage">
       <div className="HomePage" id="outer-container">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      
    </div>
    
      

    
      <header className="Home-header">
      <img src={logo} alt="Retake work app logo" style={{ width: '500px'}}/>
        <p>
          Retake App
        </p>
        
          
       
      </header>
      
     
    </div>
    </body>
    
  );
}

export default App;
