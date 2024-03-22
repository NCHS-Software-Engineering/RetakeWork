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
import Home from './pages/OldHome.js';
import Signup from './pages/OldSignup.js';
import Open from './pages/Open.js';
import Import from './pages/Import.js';
import Upload from './pages/fileUpload.js';
import Questions from './pages/SelectQs.js';
import Email from './pages/email.js';
import UploadQ from './pages/fileUpload.js';
import PopupReact from 'react-popup/dist/Popup.react.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Index from './index.js';

import ReactDOM from 'react-dom/client';


{/*function App() {

 
  console.log(process.env);
  return (
    
    <div className="App">
       <Router>
          <div className="container">
              <Routes>
                  <Route path="" element={<><Open/></>}/>
                  <Route path="/Login" element={<><Login/></>} />
                  <Route path="/Home" element={<><Home/></>} />
                  <Route path="/signup" element={<><Signup/></>} />
                  <Route path="/home" element={<><Home/></>}/>
                  <Route path="/import" element={<><Import/></>}/>
                  <Route path="/questions" element={<><Questions/></>}/>
                  <Route path="/upload" element={<><Upload/></>}/>
                  <Route path="/email" element={<><Email/></>}/>
                  <Route path="/upload" element={<><UploadQ/></>}/>
                  <Route path="/login2" element={<><Index/></>}/>
              </Routes>
          </div>
     </Router>
    </div>
    
  );
}

export default App;*/}

import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home, Landing, Login, Signup } from "./screens";

useEffect(() => {
  const theUser = localStorage.getItem("user");

  if (theUser && !theUser.includes("undefined")) {
    setUser(JSON.parse(theUser));
  }
}, []);


const App = () => {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
      <Routes>
      <Route
  path="/"
  element={user?.email ? <Navigate to="/home" /> : <Landing />}
  />
  <Route
    path="/signup"
    element={user?.email ? <Navigate to="/home" /> : <Signup />}
  />
  <Route
    path="/login"
    element={user?.email ? <Navigate to="/home" /> : <Login />}
  />
  <Route
    path="/home"
    element={user?.email ? <Home user={user} /> : <Navigate to="/" />}
  />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

