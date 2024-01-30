import './App.css';
import Sidebar from './Sidebar';
import React from 'react';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          Retake App
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          
        </a>
      </header>
     
   
    <div className="App" id="outer-container">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      
    </div>
    </div>
    
  );
}

export default App;
