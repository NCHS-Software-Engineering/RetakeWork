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
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is authenticated on component mount
        checkAuthStatus();
    }, []);

    const checkAuthStatus = () => {
        axios.get('/api/auth/check')
            .then(response => {
                if (response.data.authenticated) {
                    setUser(response.data.user);
                    setProfile(response.data.user);
                }
            })
            .catch(error => {
                console.error('Error checking authentication status:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const login = () => {
        window.location.href = 'http://localhost:8000/auth/google/';
    };

    const logOut = () => {
        axios.get('/api/auth/logout')
            .then(() => {
                setUser(null);
                setProfile(null);
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };


    return (

        <body>
            
            <div>

                
                {profile ? (
                    <div>
                        {/* <img src={profile.picture} alt="user image" /> */}
                        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
                        <h1>Welcome {profile.name}!</h1>
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
                        <button onClick={login}>Sign in with Google 🚀 </button>
                    </div>
                )}
            </div>

        </body>


    );
}

export default App;
