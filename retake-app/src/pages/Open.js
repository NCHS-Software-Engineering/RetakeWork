import './Open.css';
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";

function App() {

    // const responseMessage = (response) => {
    //     console.log(response);
    // };
    // const errorMessage = (error) => {
    //     console.log(error);
    // };

    return (
        <body>
            <Link to="/home"><button class="button3">home</button></Link>
            <div className="OpenPage">
                <header className="Open-header">
                    <p>Retake App</p>
                    <Link to="/login"><button class="loginbutton">Log In</button></Link>
                    <Link to="/signup"><button class="signupbutton">Sign Up</button></Link>
                   
                </header>
            </div>
            <GoogleLogin />
        </body>
                            

    );
}

export default App;
