import './selectQuestions.css';
import Sidebar from './Sidebar';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
 
import { useNavigate } from "react-router-dom";

const selectQuestions = () => {
    return (
    <body>
    <div className="Select Questions">
       <div className="Select Questions" id="outer-container">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      
    </div>
    
      

    
      <header className="Select-header">
      <p>
          Select questions for retake
        </p>
        
      
      
        
          
       
      </header>
      
     
    </div>
    </body>
    )
}