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
        <div className="OpenPage">
            
            <header className="Open-header">
                <img src="logoNB.jpg" alt="Retake work app" />

                <p>
                    Retake App
                </p>

                <Link to="/login"><button class="button button1">Log In </button></Link>
                <Link to="/signup"><button class="button button2">Sign Up </button></Link>
                <Link to="/home"><button class="button button2">home </button></Link>




            </header>


        </div>

    );
}

export default App;
