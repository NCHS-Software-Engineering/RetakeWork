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

  const [selectedOption, setSelectedOption] = useState(""); // State to store the selected option


  // Function to handle radio button change
  const handleRadioChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value); // Update the selected option
  };

  // Function to generate the salutation based on selected options
  const generateSalutation = () => {
    switch (selectedOption) {
      case "mr":
        return "Mr.";
      case "ms":
        return "Ms.";
      case "mrs":
        return "Mrs.";
      case "dr":
        return "Dr.";
      default:
        return "";
    }
  };

  const [firstName, lastName] = localStorage.getItem('teacher').split(" ");
  const questions = localStorage.getItem('questionsChosen')
  const emailText = `
Hello Student,

In order to qualify for a retake, please complete questions ${questions} from the worksheet attached to this email.

Worksheet Link: ${link}

Thanks, ${generateSalutation()} ${lastName}
`;
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
            <p>Worksheet Link: <a href={link}>{link}</a></p>
            <div className="checkbox-container"> {/* Container for checkboxes */}
            <label>
              <input 
                type="radio"
                name="salutation"
                value="mr"
                checked={selectedOption === "mr"}
                onChange={handleRadioChange}
              />
              Mr.
            </label>
            <label>
              <input
                type="radio"
                name="salutation"
                value="ms"
                checked={selectedOption === "ms"}
                onChange={handleRadioChange}
              />
              Ms.
            </label>
            <label>
              <input
                type="radio"
                name="salutation"
                value="mrs"
                checked={selectedOption === "mrs"}
                onChange={handleRadioChange}
              />
              Mrs.
            </label>
            <label>
              <input
                type="radio"
                name="salutation"
                value="dr"
                checked={selectedOption === "dr"}
                onChange={handleRadioChange}
              />
              Dr.
              </label>
            </div>
            <p>Thanks, {generateSalutation()} {lastName}</p>

            <CopyToClipboard 
              text={emailText}
              onCopy={() => alert("Copied")}
              format={"text/plain"}>
              <button className='copyButton'>Copy to clipboard</button>
            </CopyToClipboard>
          </form>


        </div>
      </div>
    </body>
  );
};

export default Email;