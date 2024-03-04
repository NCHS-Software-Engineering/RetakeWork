import "./fileUpload.css"
import axios from "axios";
import React, { Component, useState } from "react";
import ReactDom from 'react-dom';
import Popup from 'react-popup';


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
		const [isOpen, setIsOpen] = useState(false);
		// Create an object of formData
		const formData = new FormData();

		// Update the formData object
		formData.append(
			"myFile",
			this.state.selectedFile,
			this.state.selectedFile.name
		);

		// Details of the uploaded file
		console.log(this.state.selectedFile);

		// Request made to the backend api
		// Send formData object
		axios.post("api/uploadfile", formData);
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
						Choose file and Press Upload button
					</h4>
				</div>
			);
		}
	};

	
		
	
	render() {
		
		return (
			<div>
				<h1 className="head">Test File</h1>
				<h3>Upload file for this test!</h3>
				<div>
					<input
						type="file"
						onChange={this.onFileChange}
					/>
					<button className = "fileButton" onClick={() => {
  						alert('File Successfully Uploaded!');
						
					}}>Upload</button>
					
				</div>
				{this.fileData()}
			</div>
		);
	}
}

export default fileUpload; 
