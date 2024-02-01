import './App.css';
import Sidebar from './Sidebar';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/logIn';  
import { useNavigate } from "react-router-dom";




function App() {
  

  let navigate = useNavigate(); 
    const routeChange = () =>{ 
      <Router>
        <Routes>
        <Route path="./pages/login" element={<Login />} />
          navigate("/login");
        </Routes>
      </Router>
    }
    
    




  return (
    <div className="App">
       <div className="App" id="outer-container">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      
    </div>
      <header className="App-header">
        
        <p>
          Retake App
        </p>
        <a to="./pages/logIn" className="btn button1">Login</a>

        <button class="button button1" onClick={routeChange}>Log In </button>
        <button class="button button2">Sign Up </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          
        </a>
      </header>
      





     
    </div>
    
  );
}

export default App;
