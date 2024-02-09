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

function App() {
  
    
  return (
    <div className="HomePage">
       <div className="HomePage" id="outer-container">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      
    </div>
      <header className="Home-header">
      <img src="logoNB.jpg" alt="Retake work app"/>

        <p>
          Retake App
        </p>
        
          
       
      </header>

     
    </div>
    
  );
}

export default App;
