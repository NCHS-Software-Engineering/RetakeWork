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



function App() {
  
    

  return (
    <div className="App">
       <Router>
          <div className="container">
              <Routes>
                  <Route path="./pages/Home"  component={<Home/>}/>
                  <Route path="./pages/Login" element={<Login/>} />
              </Routes>
          </div>
     </Router>
    </div>
    
  );
}

export default App;
