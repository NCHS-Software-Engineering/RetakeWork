import { UPLOADING } from 'dropzone';
import './SelectQs.css';
import Sidebar from './Sidebar';
import React from 'react';
import { Link } from 'react-router-dom';




function App() {

  const [questionsSelected, setQuestionsSelected] = React.useState([]);
  
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
            placeholder='Type the questions the student should complete, seperated by a comma with a space (1, 2, 3d, 5...)'
            type="text"
            onInput={(e) => setQuestionsSelected(e.target.value.split(','))}
         />
        <Link to="/email"><button button className = "clickToEmailButton" onClick={() => {}}>Next</button></Link>
        </div>

        {/*{isEmpty(questionsSelected) ? (
          <div>
            <h1>Questions Selected: {questionsSelected}</h1>
          </div>
        ) : (
          <div>
            <h1>hi</h1>
          </div>
        )}*/}
        
      </body>
      );
      
    
  }
  

  export default App;