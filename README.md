# retakeWork
## Overview
The retake app was designed and built by Samantha Pan, Akhil Kunari, Alex Ung, and Will Stenzel, at the request of Dr. Derek Miller. It is intended to allow teachers at Naperville Central High School. It allows teachers to create and select classes and tests, upload links, select questions, and generate email templates to send to students

## System Requirenments
An up to date browser

## Installation Instructions
1. Install Node.js
2. Open the project folder
3. Install necessary packages via npm install (as outlined below)
3. Add a .env file in the server folder and in the src folder
4. Add necessary env variables
5. open two terminals
6. In one terminal, run cd server, then npm run dev
7. In the other terminal, run cd retake-app, then run npm start
8. Enjoy!

## Project Architecture
| Package | Description |
| ----------- | ----------- |
| @react-oauth/google | Google login |
| axios | backend/frontend integration |
| dotenv | allows for .env files to be created |
| dropzone | for drag and drop files (not used) |
| express | for expressjs |
| multer | for file upload |
| react | for reactjs |
| react-bootstrap | adds bootstrap components |
| react-burger-menu ||
| web-vitals | for monitoring the web vitals |
| scripts | for using react scripts |
| react-select | for selecting things |
| react-scripts | not sure how this differs from scripts |
| react-router-dom | for making routes |
| react-popup | for popups |
| react-icon | adds more icons |
| react-google-login | google login |
| react-dropzone | probably for files |
| react-copy-to-clipboard | copying to clipboard |
| passport-google-oauth | for google login |
| passport | some backend thing |
| nodemon | for some reason, basic npm commands don't work without it |
| navigate | more react router |
| mysql2 | allows the use of mysql 2 |
| cors | access resources from other locations |

## Project Data Schema
a phpMyAdmin

## Folder Structure
| folder | Description |
| ----------- | ----------- |
| .vscode | vscodes things |
| retake-app | frontend |
| server | backend |
|retake-app/public | logos and stuff. Not really used |
| retake-app/src | frontend files, app.js, index.js, other files that are less important|
| retake-app/src/assest | a pdf |
| retake-app/src/pages | the actuall pages |

## Remaining User Stories
1. As a teacher, I can enter a link for a Google doc containing the retake work that needs to be completed. This creates the basis for how the emails are to be formatted and is what the developer is aiming to streamline for users. This task will take the effort of one member's development to create a functioning upload page. This task is considered complete when users can successfully submit and have access to future alteration of a link submission.
2. As a teacher, I can use integrated Google Drive to upload a new worksheet for students. This is part of making it easier for teachers to upload retake work instead of requiring a link. This task will take 1-2 team members to insert google drive. This task is considered complete when users can upload a file through their Google Drive.
3. As a teacher, I can select multiple questions after the code reads an uploaded file. The code should be able to read the file and create buttons for every question on the file. Then, the teacher can easily select questions streamlining the email process. This task will take the effort of 1-2 member's development to create a functioning select questions page. This task can be considered complete when the web app can create buttons for every question and the users can easily select the questions they want to give.
4. As a teacher, I should be able to send an email within the webapp instead of copying and pasting into a Gmail draft. The code should provide a place to send emails on the email page streamlining the process for teachers. This task will take the effort of 1-2 member's development to create a functioning email page making the retake process more efficient. This task can be considered complete when teachers can successfully send emails with retake work from within the web app.
5. As a teacher, I should be able to access my own classes directly from infinite campus instead of uploading my own classes. This task will take the effort of 1-3 member's development to create a functioning sidebar where classes can be directly accessed from infinite. To complete this task, access to infinite campus is required from the school. This task can be considered complete when users will no longer have to upload their own classes.

## Known Issues
There are a few issues left
1. sidebar.js and sidebar.css in the retake-app/src folder are extra and the following files: Home.js, Home.css, Import.css, Import.js, Login.css, Login.js, Login.jsx, Signup.css, and Signup.js, all found in retake-app/src/pages, aren't needed/used, but deleting them breaks the app. We did not have the time to fix them.
