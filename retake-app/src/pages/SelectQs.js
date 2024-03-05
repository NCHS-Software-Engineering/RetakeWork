import { UPLOADING } from 'dropzone';
import './SelectQs.css';
import Sidebar from './Sidebar';
import React from 'react';
import Select, { MultiValue } from "react-select";
import { useState } from "react";



function App() {

  const options = [
    { value: "blues", label: "Blues" },
    { value: "rock", label: "Rock" },
    { value: "jazz", label: "Jazz" },
    { value: "orchestra", label: "Orchestra" },
  ];

const [selectedOptions, setSelectedOptions] = useState([]);
  

   
    return(
      
      <body>
        
        
        <div className="SelectQsPage">
             <div className="SelectQsPage" id="outer-container">
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            
        </div>
        <div className = 'selectQsStuff'>
        <Select
        className='selectQs'
        defaultValue={selectedOptions}
        onChange={setSelectedOptions}
        options={options}
        isMulti
      />
      <table className = "selectQsTable"> 
      <tbody>
        <tr>
          {selectedOptions.map(label => (
            <td>{label.label}</td>
          ))}
          </tr>

        </tbody>
      </table>
        </div>
        
        </div>
      </body>
      );
      
    
  }
  

  export default App;