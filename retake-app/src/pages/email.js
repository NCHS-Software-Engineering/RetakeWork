import React from 'react';
import Sidebar from './Sidebar';
import './email.css';
import fileUpload from './fileUpload';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
  import { CopyToClipboard } from "react-copy-to-clipboard";

  const location = window.location;
  const searchParams = new URLSearchParams(location.search);
  const selectedTestValue = searchParams.get('selectedQuestions');

  const questions = localStorage.getItem('questions');
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
                `${questions}`

                
            </form>
            
      console.log(localStorage);
     <CopyToClipboard
     text="Hello Student, 
     
     In order to qualify for a retake, please complete the worksheet attached to this email                       

     Thanks, Dr. Diller"
     onCopy={() => alert("Copied")}>
       <button className = 'copyButton'>Copy to clipboard</button>
     </CopyToClipboard>
     
            
            
        </div>
        </div>
        </body>
    );
};

export default Email;