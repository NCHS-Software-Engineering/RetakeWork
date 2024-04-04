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
        <div className="textInput">
        <input
            placeholder='Type the questions the student got wrong, seperated by a comma with a space (1, 2, 3d, 5...)'
            type="text"
            
         />
        
        </div>
        
      </body>
      );
      
    
  }
  

  export default App;