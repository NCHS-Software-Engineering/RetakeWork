import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import Select from "react-select";
import { PiSignOutBold } from "react-icons/pi";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";






export default props => {

  const [isOpenableClasses, setSelectedClasses] = useState(true);

  const handleChange = (selectedOption) => {

    if (selectedOption.value === "login") {
      window.location.href = "./login";
      setSelectedClasses(true);
    }
    if (selectedOption.value === "default") {
      window.location.href = "./";
      setSelectedClasses(true);
    }
    if (selectedOption.value === "signup") {
      window.location.href = "./signup";
      setSelectedClasses(true);
    }
    if (selectedOption.value === "home") {
      setSelectedClasses(false);
    }

  };

  const handleChangeClasses = (selectedOption) => {

    if (selectedOption.value === "login") {
      window.location.href = "./login";
      setSelectedClasses(true);
    }
    if (selectedOption.value === "default") {
      window.location.href = "./";
      setSelectedClasses(true);
    }
    if (selectedOption.value === "signup") {
      window.location.href = "./signup";
      setSelectedClasses(true);
    }
    if (selectedOption.value === "home") {
      setSelectedClasses(false);
    }

  };




  const customStyles = {
    control:  (provided, state)=> ({
      ...provided,
      width: 210,
      position: 'relative',
      top: 40,
      // height: 25,
      // minHeight: 10,
      // overflow:'hidden'
    }),
    menu: (provided, state) => ({
      ...provided,
      width: 210,
      position: 'relative',
      top: 40
    })};


  const options1 = [
    { value: 'signup', label: 'Sign Up' },
    { value: 'home', label: 'Home' },
    { value: 'login', label: 'Log In' },
    { value: 'default', label: 'Default' },];

  const classOptions = [
    { value: 'prog1', label: 'Programming 1' },
    { value: 'APCS', label: 'AP Computer Science A' },
    { value: 'SE', label: 'Software Engineering' },];

  return (
    <Menu>
      <div className="mt-auto m-auto w-50">
        <Select placeholder="Pages" options = {options1} autoFocus={true} onChange={handleChange} styles={customStyles}/>
        <p></p>
        <Select placeholder="Classes" options = {classOptions} autoFocus={true} onChange={handleChangeClasses} styles={customStyles} isDisabled={isOpenableClasses}/>
        <p></p>
        <Select placeholder="Test" options = {options1} autoFocus={true} onChange={handleChange} styles={customStyles}/>
      </div>
      <div className = "signout">
        <Link to="/"><button class="signoutbutton">Sign Out</button></Link>

      </div>
    </Menu>


  );
};