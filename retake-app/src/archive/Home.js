import './Home.css';
import Sidebar from '../pages/Sidebar.js';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  const [user, setUser] = useState({ username: '', email: '' }); // Default empty user


  useEffect(() => {
    console.log("getting user");

    axios.get('http://localhost:8000/api/auth/check', { withCredentials: true }) // Make an HTTP GET request to check authentication
      .then((response) => {
        if (response.data.authenticated) {
          
          setUser(response.data.user); // Store user data in state
        }
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
      });
  }, [user]); // The empty array ensures this effect runs once when the component is mounted


  const logOut = () => {
    axios.get('/api/auth/logout')
      .then(() => {
        setUser(null);

      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

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
          <h1> Welcome: {user.email}</h1>

          <Image src={logo} alt="Retake work app logo" style={{ width: '800' }} fluid />

        </header>


      </div>
    </body>

  );
}






export default App;
