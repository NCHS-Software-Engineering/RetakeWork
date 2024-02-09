import './App.css';
import Sidebar from './pages/Sidebar.js';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
 
import { useNavigate } from "react-router-dom";
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Signup from './pages/Signup.js';



function App() {
  
  return (
    <div className="App">
       <Router>
          <div className="container">
              <Routes>
                  <Route path="" element={<><Home/></>}/>
                  <Route path="/Login" element={<><Login/></>} />
                  <Route path="/Home" element={<><Home/></>} />
                  <Route path="/signup" element={<><Signup/></>} />
              </Routes>
          </div>
     </Router>
    </div>
    
  );
}

export default App;
