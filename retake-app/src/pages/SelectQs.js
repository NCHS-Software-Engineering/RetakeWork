import { UPLOADING } from 'dropzone';
import './SelectQs.css';
import Sidebar from './Sidebar';
import React from 'react';




function App() {
  
var nameOfClass = 'off';

  function colorchange() {

    if(nameOfClass === 'off'){
      nameOfClass = 'on';
    }
    else{
      nameOfClass = 'off';
    }

    alert(nameOfClass);

}
   
    return(
      
      <body>
        
        
        <div className="SelectQsPage">
             <div className="SelectQsPage" id="outer-container">
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            
        </div>
        </div>
        <div className="buttons">
        <label className='ButtonsQs' role='group'>
        <input type="checkbox" />
        My Value
        <input type="checkbox" />
        My Value
        <input type="checkbox" />
        My Value
        <br></br>
        <input type="checkbox" />
        My Value
        <input type="checkbox" />
        My Value
        <input type="checkbox" />
        My Value
        <br></br>
        <input type="checkbox" />
        My Value
        <input type="checkbox" />
        My Value
        <input type="checkbox" />
        My Value
        <br></br>
      </label>
        
        </div>
        
      </body>
      );
      
    
  }
  

  export default App;