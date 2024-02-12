import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import Select from "react-select";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";






export default props => {
  const [selected, setSelected] = useState(null);
  const handleChange = (selectedOption) => {
  
    if (selectedOption.value === "login") {
      window.location.href = "./login";
    }
    if (selectedOption.value === "default") {
      window.location.href = "./";
    }
    if (selectedOption.value === "signnup") {
      window.location.href = "./signup";
    }
    
  };
  
  const customStyles = {
    singleValue: (base) => ({
      ...base,
      padding: "5px 10px",
      borderRadius: 5,
      background: selected,
      color: "#37527F",
      display: "flex",
      width: "fit-content",
    }),
  };

  

  const options1 = [
    { value: 'signup', label: 'Sign Up' },
    { value: 'home', label: 'Home' },
    { value: 'login', label: 'Log In'},
  {value: 'default', label: 'Default'},];
  return (
    <Menu>
      <div className="mt-auto m-auto w-50">
        <Select options = {options1} autoFocus={true} onChange={handleChange} styles={customStyles}/>
      </div>

    </Menu>
  );
};

