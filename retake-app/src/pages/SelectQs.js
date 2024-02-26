import './SelectQs.css';
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



function App() {
  
    
   
    return(
      
      <body>
        
        <div className="SelectQsPage">
             <div className="SelectQsPage" id="outer-container">
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            
        </div>
        </div>
        <div id="buttons">
        <button className='testButton'>1</button>
        <button className='testButton'>2</button>
        <button className='testButton'>3</button>
        </div>
        
      </body>
      );
      
    
  }
  

  export default App;