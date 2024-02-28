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
        <button className={nameOfClass}  onClick={colorchange} >1</button>
        <button className='on'>2</button>
        
        </div>
        
      </body>
      );
      
    
  }
  

  export default App;