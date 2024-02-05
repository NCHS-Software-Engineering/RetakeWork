import './App.css';
import Sidebar from './Sidebar';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
 
import { useNavigate } from "react-router-dom";
import Login from './pages/Login.jsx';

function MainRouter(){
  return(
      <Router>
          <div className="container">
              <Routes>
                  <Route path="./pages/Login" component={Login} />
              </Routes>
          </div>
     </Router>

  )
}

function App() {
  
    

  return (
    <div className="App">
       <div className="App" id="outer-container">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      
    </div>
      <header className="App-header">
        
        <p>
          Retake App
        </p>

        <button class="button button1" onClick={MainRouter}>Log In </button>
        <button class="button button2">Sign Up </button>
        
          
       
      </header>
      





     
    </div>
    
  );
}

export default App;
