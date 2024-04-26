import "./fileUpload.css";
import Sidebar from './Sidebar';
import axios from "axios";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";



class FileUpload extends Component {
	
  state = {
    selectedFile: null,
    link: "",
	questionsSelected: []
  };

 questionsSelected = [];
  
  onFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  onInputChanged = (e) => {
    // Update questionsSelected state
    this.setState({ questionsSelected: e.target.value.split(',') });
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
              <Link to={{ pathname: '/email', state: { questionsSelected: this.state.questionsSelected }}}><button className="clickToEmailButton">Next</button></Link>
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
                <input value={link} onChange={(e) => { this.setState({ link: e.target.value }) }} placeholder='Paste a link to a worksheet' type="text" id="link" />
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