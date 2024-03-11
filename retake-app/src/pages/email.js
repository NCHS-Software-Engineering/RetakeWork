import React from 'react';
import Sidebar from './Sidebar';
import './email.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";

const Email = () => {
    var change = 'copy';
    function copyChange() {
        if(change === 'copy'){
            change = 'Copied';
          }
          else{
            change = 'Copied';
          }
          alert(change);
    }
    return (
        
        <body>
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        
        <div className='screen'>
        <div className='box'>
            <form action="" className='emailForm'>
                <h1>Email</h1>
                <p>Hello Student, 
                </p>
                <p>In order to qualify for a retake, please complete the worksheet attached to this email:

                </p>
                <p> Thanks, Dr. Diller</p>
                

                
            </form>
            <button className = 'copyButton' onClick={copyChange}>Copy</button>
            
            
        </div>
        </div>
        </body>
    );
};

export default Email;