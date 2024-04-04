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

    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (

        <body>
            {/* <div>
            <h1>React Google Login</h1>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google 🚀 </button>
            )}
        </div> */}

            {/* <div className="OpenPage">
                <header className="Open-header">
                    <p>Welcome to the retake app!</p>
                    <GoogleLogin/>
                </header>
            </div> */}

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
