import React from 'react';
import './email.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";

const Email = () => {
    return (
        
        <body>
        <div className='screen'>
        <div className='box'>
            <form action="">
                <h1>Email</h1>
                <p>Hello Student, 
                </p>
                <p>In order to qualify for a retake, please complete the worksheet attached to this email:

                </p>
                <p> Thanks, Dr. Diller</p>
                

                
            </form>
            <button className = 'copyButton'>Copy</button>
        </div>
        </div>
        </body>
    );
};

export default Email;