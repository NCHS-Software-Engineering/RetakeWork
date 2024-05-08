import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './email.css';
import axios from "axios";
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

console.log(localStorage);

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
  const [link, setLink] = useState([]);
  useEffect(() => {

    async function fetchData() {
      const data = localStorage.getItem(('selectedTest'))
      const workLink = await axios.get(`http://localhost:8000/api/test/link/${data}`);
      const link = workLink.data.result[0].link
      console.log(workLink)
      setLink(link)
    }

    fetchData();
  }, []);

  const questions = localStorage.getItem('questionsChosen')
  const emailText =
  `Hello Student, 
     
   In order to qualify for a retake, please complete questions ${questions} from the worksheet attached to this email.
            
   Worksheet Link: ${link}

   Thanks, Dr. Diller`
  console.log(emailText)

  return (

    <body>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div className='screen'>
        <div className='box'>
          <form action="" className='emailForm'>
            <h1>Email</h1>
            <p>Hello Student,
            </p>
            <p>In order to qualify for a retake, please complete questions {questions} from
              the worksheet attached to this email.
            </p>
            <p>Worksheet Link: {link}</p>
            <p>Thanks, Dr. Diller</p>

            <CopyToClipboard
              text= {emailText}
              onCopy={() => alert("Copied")}>
              <button className='copyButton'>Copy to clipboard</button>
            </CopyToClipboard>
          </form>


        </div>
      </div>
    </body>
  );
};

export default Email;