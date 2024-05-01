import './App.css';
import Sidebar from './pages/Sidebar.js';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
 
//import { useNavigate } from "react-router-dom";
//import Login from './pages/Login.js';
//import Home from './pages/Home.js';
//import Signup from './pages/Signup.js';
import Open from './pages/Open.js';
//import Import from './pages/Import.js';
import Upload from './pages/fileUpload.js';
//import Questions from './pages/SelectQs.js';
import Email from './pages/email.js';
// import UploadQ from './pages/fileUpload.js';

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}


function App() {
  
  return (
    <div className="App">
       <Router>
          <div className="container">
              <Routes>
                  <Route path="" element={<><Open/></>}/>
                  {/* <Route path="/Login" element={<><Login/></>} /> */}
                  {/* <Route path="/Home" element={<><Home/></>} /> */}
                  {/* <Route path="/signup" element={<><Signup/></>} /> */}
                  {/* <Route path="/home" element={<><Home/></>}/> */}
                  {/* <Route path="/import" element={<><Import/></>}/> */}
                  {/* <Route path="/questions" element={<><Questions/></>}/> */}
                  <Route path="/upload" element={<><Upload/></>}/>
                  <Route path="/email" element={<><Email/></>}/>
                  {/* <Route path="/upload" element={<><UploadQ/></>}/> */}
                  


              </Routes>
          </div>
     </Router>
    </div>
    
  );
}

export default App;
