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
            <div className="OpenPage">

                <header className="Open-header">

                    <p>
                        Retake App
                    </p>

                    <Link to="/login"><button class="button1">Log In </button></Link>
                    <Link to="/signup"><button class="button2">Sign Up </button></Link>
                    <Link to="/home"><button class="button3">home </button></Link>




                </header>


            </div>
        </body>
    );
}

export default App;
