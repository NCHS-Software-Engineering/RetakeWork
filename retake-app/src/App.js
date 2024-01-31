import './App.css';
import Sidebar from './Sidebar';
import React from 'react';


function App() {
  return (
    <div className="App">
       <div className="App" id="outer-container">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      
    </div>
      <header className="App-header">
        
        <p>
          Retake App
        </p>
        <button class="button button1">Log in </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          
        </a>
      </header>
     
   
   
    </div>
    
  );
}

export default App;
