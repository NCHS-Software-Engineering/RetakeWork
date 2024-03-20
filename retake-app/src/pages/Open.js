import './Open.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";

function App() {
    return (
        <body>
            <Link to="/home"><button class="button3">home</button></Link>
            <div className="OpenPage">
                <header className="Open-header">
                    <p>Retake App</p>
                    <Link to="/Login"><button class="loginbutton">Log In</button></Link>
                    <Link to="/signup"><button class="signupbutton">Sign Up</button></Link>
                </header>
            </div>
        </body>
    );
}

export default App;
