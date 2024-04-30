import "./fileUpload.css"
import Sidebar from './Sidebar';
import axios from "axios";
import React, { Component, useState } from "react";
import ReactDom from 'react-dom';
import Popup from 'react-popup';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useLocation,
} from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
// MyContext.js

class fileUpload extends Component {

	state = {
		// Initially, no file is selected
		selectedFile: null,
		link: null,
		selectedTest: null
	};

	// On file select (from the pop up)
	onFileChange = (event) => {
		// Update the state
		this.setState({
			selectedFile: event.target.files[0],
		});
	};

	uploadFunction = (selectedTestValue) => {
		// Use selectedTestValue as needed in upload.js
		console.log("Selected test value in upload.js:", selectedTestValue);
		this.setState({
			selectedTest: selectedTestValue
		})
	}

	componentDidMount() {
		
	}


	// On link input
	onLinkInput = (event) => {
		// Update the state
		this.setState({
			link: event.target.value,
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

	// On file upload (click the upload button)
	onFileUpload = () => {
		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append(
			"testsheet",
			this.state.selectedFile,
			this.state.selectedFile.name
		);

		// Details of the uploaded file
		console.log(this.state.selectedFile);

		// Request made to the backend api
		// Send formData object
		axios.post("http://localhost:8000/api/uploadfile", formData)
			.then(response => {
				console.log(response.data);
				alert('File Successfully Uploaded!');
			})
			.catch(error => {
				console.error('Error uploading file: ', error);
				alert('Error uploading file');
			});

	};

	/* const popup = ({ isOpen, togglePopup }) => {
		return(
			<div>
			<button className = "fileButton"  onClick={() => setIsOpen(true)}>
						Upload!
					</button>

					{isOpen && (
						<div>
						<div>
						You have successfully uploaded a file!
						</div>
						<button onClick={() => setIsOpen(false)}>
						Close
						</button>
						</div>
					)}
			</div>
			);
		} */

	// File content to be displayed after
	// file upload is complete
	fileData = () => {
		if (this.state.selectedFile) {
			return (
				<div className="details">
					<h2>File Details:</h2>
					<p>
						File Name:{" "}
						{this.state.selectedFile.name}
					</p>

					<p>
						File Type:{" "}
						{this.state.selectedFile.type}
					</p>

					<p>
						Last Modified:{" "}
						{this.state.selectedFile.lastModifiedDate.toDateString()}
					</p>
				</div>
			);
		} else {
			return (
				<div>
					<br />
					<h4 className="text">
						Choose file and Press Next button
					</h4>
				</div>
			);
		}
	};




	render() {

		return (
			<div>
				<Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />

				<h1 className="head">Test File</h1>
				<h3>Upload file for this test or paste a link into the textbox!</h3>
				<div>
					<input
						type="file"
						onChange={this.onFileChange}
					/>
					<Link to="/questions"><button button className="fileButton" onClick={() => {
						alert('File Successfully Uploaded!');

					}} formAction="http://localhost:8000/api/uploadfile" formMethod="post">Next</button></Link>

					{/* <button onClick={this.onFileUpload}>Upload</button> */}
					<div className="wrap">
						<input value={this.state.link} onChange={this.onLinkInput} placeholder='Paste a link to a worksheet' type="text" id="link" />
						<h1 className="string">Link entered: {this.state.link}</h1>
					</div>

				</div>

				{/* <button onClick={this.onFileUpload}>Upload</button> */}
				<div className="wrap">
					<input value={this.state.link} onChange={(e) => { this.setState({ link: e.target.value }) }} placeholder='Paste a link to a worksheet' type="text" id="link" />
					<h1 className="string">Link entered: {this.state.link}</h1>
				</div>
				{this.fileData()}
			</div>
		);
	}
}

export default fileUpload; 
