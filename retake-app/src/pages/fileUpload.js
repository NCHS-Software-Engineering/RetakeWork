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
} from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

class fileUpload extends Component {

	state = {
		// Initially, no file is selected
		selectedFile: null,
	};

	// On file select (from the pop up)
	onFileChange = (event) => {
		// Update the state
		this.setState({
			selectedFile: event.target.files[0],
		});
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
					<Link to="/questions"><button button className = "fileButton" onClick={() => {
  						alert('File Successfully Uploaded!');
						
					}} formAction="http://localhost:8000/api/uploadfile" formMethod="post">Next</button></Link>

					{/* <button onClick={this.onFileUpload}>Upload</button> */}

					<input
           				placeholder='Paste a link to a worksheet'
            			type="text"
            			
         />

				</div>
				{this.fileData()}
			</div>
		);
	}
}

export default fileUpload; 
