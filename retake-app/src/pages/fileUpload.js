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
    inputLink: "",
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



  handleKeyDownLink = async (e) => {
    // Define the updateTestLink function outside of the handleKeyDownLink function
    const updateTestLink = async (testId, newLink) => {
      try {
        console.log("updating the link to the test");
        // Fetch the existing test data
        const response = await axios.get(`http://localhost:8000/api/tests/${testId}`);
        const test = response.data;

        // Update the link field with the new value
        test.link = newLink;

        // Send a PUT request to update the test
        await axios.put(`http://localhost:8000/api/tests/${testId}`, test);

        console.log('Test link updated successfully');
        return true;
      } catch (error) {
        console.error('Error updating test link:', error);
        return false;
      }
    };
    /* if (e.key === 'Enter') {
      // Update the state
      this.setState({
        link: e.target.value,
      });
      console.log(this.state.test, this.state.link)
      alert("Link Uploaded!");

      // Call the updateTestLink function with the updated state values
      const success = await updateTestLink(this.state.test, this.state.link);
      console.log(success)
      // Redirect to select question page if the update is successful
      if (success) {
        window.location.href = `/upload`
      }
    } */
      alert('Link Successfully Entered!');
      console.log(this.state.inputLink)
      this.setState({ link: this.state.inputLink }, async () => {
        console.log(this.state.test, this.state.link);
        const success = await updateTestLink(this.state.test, this.state.link);
        console.log(success);
        if (success) {
          window.location.reload();
        }
      });
    }


  // On link input
  onLinkTyped = async (e) => {
    this.setState({
      inputLink: e.target.value,
    });
    console.log(this.state.inputLink)
  } 


  onInputChanged = (e) => {
    // Update questionsSelected state
    this.setState({ questionsSelected: e.target.value });
  };

  onButtonClick = () => {
    this.setState({
      selectedFile: null,
      link: ""
    });
  };


  async componentDidMount() {
    const location = window.location;
    const searchParams = new URLSearchParams(location.search);
    const selectedTestValue = searchParams.get('selectedTest');
    console.log("Selected test value:", selectedTestValue);
     // Set state and use a callback to ensure it's updated before accessing it
    this.setState({ test: selectedTestValue }, async () => {
      console.log(this.state.test);

    // Retrieve selectedFile from localStorage if available
    /* const selectedFile = localStorage.getItem("selectedFile");
    if (selectedFile) {
      this.setState({ selectedFile: JSON.parse(selectedFile) });
    } */
    //fetch test link from database
    try {
      console.log(this.state.test)
      const workLink = await axios.get(`http://localhost:8000/api/test/link/${this.state.test}`);
      const sololink = workLink.data.result[0].link
      if (sololink) {
        this.setState({ link: sololink })
      }
      console.log(this.state.link)
      // Handle response data here
    } catch (error) {
      console.error('Error fetching test link:', error);
      // Handle error here
    }
  });
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
    const currentLink = this.state.link;
    console.log(currentLink)
    return (
      <div>
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />

        {currentLink ? (
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
              <Link to={{ pathname: '/email', state: { questionsSelected: this.state.questionsSelected } }}>
                <button className="clickToEmailButton" >Next</button></Link>
                <button className='newUpload' onClick={this.onButtonClick}>Reupload</button>
            </div>
          </body>
        ) : (
          <div>
            <h1 className="head">Test File</h1>
            <h3>Paste a link into the textbox!</h3>
            <div>
              {/* <input
                type="file"
                onChange={this.onFileChange}
              /> */}
              
              <div className="wrap">
              <input
                value={this.state.inputLink}
                onChange={this.onLinkTyped}
                //onKeyDown={this.handleKeyDownLink}
                placeholder='Paste a link to a worksheet'
                type="text"
                id="link"
              />      
              <button className="fileButton" onClick={this.handleKeyDownLink}>Next</button>           
              <h1 className="string">Link entered: {this.state.inputLink}</h1>
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