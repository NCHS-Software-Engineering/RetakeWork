import './Open.css';
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,

} from "react-router-dom";


function App() {
    const [user, setUser] = useState(null);



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
    }, []); // The empty array ensures this effect runs once when the component is mounted

    // const login = () => {
    //     window.location.href = 'http://localhost:8000/auth/google/';
    // };

    const logOut = () => {
        axios.get('http://localhost:8000/api/auth/logout')
            .then(() => {
                setUser(null);
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };


    return (
        <body>
            <div>

                
                {user ? (
                    <div>
                        {/* <img src={profile.picture} alt="user image" /> */}
                        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
                        <h1>Welcome, {user.username}!</h1>
                        <br/>
                        <br/>
                        <h3>Click the menu icon in the top left to continue...</h3>
                        <button onClick={logOut}>Log out</button>
                    </div>
                ) : (
                    <div>
                        <h1>Welcome to the Retake App!</h1>
                        <br/>
                        <br/>
                        <a href="http://localhost:8000/auth/google/"><button>Sign in with Google 🚀 </button></a>
                    </div>
                )}
            </div>
        </body>
    );
}

export default App;
