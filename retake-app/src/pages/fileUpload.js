import "./fileUpload.css";
import Sidebar from './Sidebar';
import axios from "axios";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";



class FileUpload extends Component {


  state = {
    selectedFile: null,
    link: "",
    test: null,
    questionsSelected: []
  };

  questionsSelected = [];

  onFileChange = (event) => {
    const currentTest = localStorage.getItem("test")
    console.log(currentTest)
    this.setState({
      selectedFile: event.target.files[0],
      test: currentTest
    });
  };

	uploadFunction = (selectedTestValue) => {
		// Use selectedTestValue as needed in upload.js
		console.log("Selected test value in upload.js:", selectedTestValue);
		this.setState({
			selectedTest: selectedTestValue
		})
	}


	// On link input
	onLinkTyped = (event) => {
		// Update the state
		this.setState({
			link: event.target.value,
      test: localStorage.getItem("test")
		});
    
		const location = window.location;
		const searchParams = new URLSearchParams(location.search);
		const selectedTestValue = searchParams.get('selectedTest');
		console.log("Selected test value:", selectedTestValue);
		console.log(this.state.link)
		// Function to update the test with a new link
		const updateTestLink = async (testId, newLink) => {
			try {
				// Fetch the existing test data
				const response = await axios.get(`/api/tests/${testId}`);
				const test = response.data;

				// Update the link field with the new value
				test.link = newLink;

				// Send a PUT request to update the test
				await axios.put(`/api/tests/${testId}`, test);

				console.log('Test link updated successfully');
			} catch (error) {
				console.error('Error updating test link:', error);
			}
		};
		
	};

  onInputChanged = (e) => {
    // Update questionsSelected state
    this.setState({ questionsSelected: e.target.value });
  };

  onButtonClick = () => {
    this.setState({
      selectedFile: null
    });
  };

  



  componentDidMount() {
    // Retrieve selectedFile from localStorage if available
    const selectedFile = localStorage.getItem("selectedFile");
    if (selectedFile) {
      this.setState({ selectedFile: JSON.parse(selectedFile) });
    }
  }

  componentDidUpdate() {
    // Save selectedFile to localStorage whenever it changes
    const { selectedFile } = this.state;
    localStorage.setItem("selectedFile", JSON.stringify(selectedFile));
  }

  fileData = () => {
    const { selectedFile } = this.state;
    if (selectedFile) {
      return (
        <div className="details">
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4 className="text">Choose file and Press Next button</h4>
        </div>
      );
    }
  };


  render() {
    const { selectedFile, link } = this.state;

    return (
      <div>
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />

        {selectedFile ? (
          <body>
            <div className="SelectQsPage">
              <div className="SelectQsPage" id="outer-container">
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
              </div>
            </div>
            <div className="textInput">
              <input
                placeholder='Type the questions the student got wrong, separated by a comma with a space (1, 2, 3d, 5...)'
                type="text"
                onInput={this.onInputChanged}
              />
              <Link to={{ pathname: '/email', state: { questionsSelected: this.state.questionsSelected } }}><button className="clickToEmailButton">Next</button></Link>
              <button className='newUpload' onClick={this.onButtonClick}>Reupload</button>
            </div>
          </body>
        ) : (
          <div>
            <h1 className="head">Test File</h1>
            <h3>Upload file for this test or paste a link into the textbox!</h3>
            <div>
              <input
                type="file"
                onChange={this.onFileChange}
              />
              <button className="fileButton" onClick={() => {
                alert('File Successfully Uploaded!');
                this.setState({ selectedFile: "hi" });
                //window.location.reload();
              }}>Next</button>
              <div className="wrap">
                <input value={link} onChange={this.onLinkTyped} placeholder='Paste a link to a worksheet' type="text" id="link" />
                <h1 className="string">Link entered: {link}</h1>
              </div>
            </div>
            {this.fileData()}
          </div>
        )}
      </div>
    );
  }
}

export default FileUpload;