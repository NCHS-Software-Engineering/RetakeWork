import './App.css';
import Sidebar from './pages/Sidebar.js';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

 
import { useNavigate } from "react-router-dom";
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Signup from './pages/Signup.js';
import Open from './pages/Open.js';
import Import from './pages/Import.js';
import Upload from './pages/fileUpload.js';
import Questions from './pages/SelectQs.js';
import Email from './pages/email.js';
import UploadQ from './pages/fileUpload.js';
import PopupReact from 'react-popup/dist/Popup.react.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

import ReactDOM from 'react-dom/client';


function App() {

  var googleKey = process.env.GOOGLECLIENTID;
console.log(googleKey);
 const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId= {googleKey}>
      <React.StrictMode>
          <App />
      </React.StrictMode>
  </GoogleOAuthProvider>,
); 

  return (
    
    <div className="App">
       <Router>
          <div className="container">
              <Routes>
                  <Route path="" element={<><Open/></>}/>
                  <Route path="/Login" element={<><Login/></>} />
                  <Route path="/Home" element={<><Home/></>} />
                  <Route path="/signup" element={<><Signup/></>} />
                  <Route path="/home" element={<><Home/></>}/>
                  <Route path="/import" element={<><Import/></>}/>
                  <Route path="/questions" element={<><Questions/></>}/>
                  <Route path="/upload" element={<><Upload/></>}/>
                  <Route path="/email" element={<><Email/></>}/>
                  <Route path="/upload" element={<><UploadQ/></>}/>
                  <Route path="/upload" element={<><UploadQ/></>}/>

              </Routes>
          </div>
     </Router>
    </div>
    
  );
}

export default App;
