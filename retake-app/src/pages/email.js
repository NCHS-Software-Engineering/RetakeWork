import React, {useEffect, useState} from 'react';
import axios from 'axios';
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

//const questions = localStorage.getItem('questionsChosen');

const testId = localStorage.getItem('selectedTest');

const Email = () => {
  var change = 'copy';
  function copyChange() {
    if (change === 'copy') {
      change = 'Copied';
    }
    else {
      change = 'Copied';
    }
    alert(change);


  }

  const [link, setLink] = useState(null);

  useEffect(() => {
    // Fetch the test link from the backend
    const fetchTestLink = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/pullURL/${testId}`); // Your backend route
        const received = response.json(); // Assuming the first result has the link
        setLink(received); // Update state with the fetched link
      } catch (error) {
        console.error('Error fetching test link:', error);
      }
    };

    if (testId) {
      fetchTestLink(); // Fetch the link when the component mounts
    }
  }, [testId]); // Dependency array ensures this effect runs when testId changes

  console.log(testId);
  console.log(link);

  return (

    <body>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div className='screen'>
        <div className='box'>





          <form action="" className='emailForm'>
            <h1>Email</h1>
            <p>Hello Student,
            </p>
            <p>In order to qualify for a retake, please complete questions {`${localStorage.getItem('questionsChosen')}`} from
              the worksheet attached to this email.

            </p>

            <p>Worksheet Link: {`${link}`}</p>
            <p>Thanks, Dr. Diller</p>



          </form>


          <CopyToClipboard
            text="Hello Student, 
     
     In order to qualify for a retake, please complete the worksheet attached to this email                       

     Thanks, Dr. Diller"
            onCopy={() => alert("Copied")}>
            <button className='copyButton'>Copy to clipboard</button>
          </CopyToClipboard>



        </div>
      </div>
    </body>
  );
};

export default Email;