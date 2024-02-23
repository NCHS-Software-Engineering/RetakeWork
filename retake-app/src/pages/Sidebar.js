import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import Select from "react-select";
import { PiSignOutBold } from "react-icons/pi";
import Child from './SelectQs.js';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";


//<Select placeholder="Students" options = {studentOptions} autoFocus={true} onChange={handleStudentChange} styles={customStyles}  isDisabled={isOpenableClasses}/>

const Parent = () => {
  const data = "Data from Parent to Child";
  <Child data={data} />
};


export default props => {

  const [isOpenableClasses, setSelectedClasses] = useState(true);
  const [testOptions, setTests] = useState([]);
  const [studentOptions, setStudents] = useState([]);
  const handleChange = (selectedOption) => {

    if (selectedOption.value === "login") {
      window.location.href = "./login";
    
    }
    if (selectedOption.value === "default") {
      window.location.href = "./";
     
    }
    if (selectedOption.value === "signup") {
      window.location.href = "./signup";
   
    }
    if (selectedOption.value === "home") {
     ;
    }
    if (selectedOption.value === "qs") {
      window.location.href = "./questions";
    }

  };

  const handleChangeClasses = (selectedOption) => {

    if (selectedOption.value === "prog1") {
      setTests([
      { value: 'test1', label: 'Chapter 1 Test' },
      { value: 'test2', label: 'Chapter 2 Test' },
      { value: 'test3', label: 'Chapter 3 Test' },
      { value: 'test4', label: 'Chapter 4 Test' }]);

        setStudents([
          {value: 'student1', label: 'Henry Anderson'},
          {value: 'student2', label: 'Doran Sanford'},
          {value: 'student3', label: 'Conner Furby'},])

      setSelectedClasses(false);
    }
    if (selectedOption.value === "APCS") {
      setTests([
      { value: 'test5', label: 'Unit 1: Primitive Types Test' },
      { value: 'test6', label: 'Unit 5: Writing Classes Test' },
      { value: 'test7', label: 'Unit 10: Recursion Test' }]);

        setStudents([
          {value: 'student4', label: 'Sam Abud'},
          {value: 'student5', label: 'Jacob Wachtor'},
          {value: 'student6', label: 'Jake Moore'},])

      setSelectedClasses(false);
    }
    if (selectedOption.value === "SE") {
      setTests([
      { value: 'test9', label: 'Chapter 15 Exam' },
      { value: 'test10', label: 'Maze Lab' },
      { value: 'test11', label: 'Chapter 17 Test' }]);

        setStudents([
          {value: 'student7', label: 'Ahkil Kanuri'},
          {value: 'student8', label: 'Alex Ung'},
          {value: 'student9', label: 'Will Stenzel'},
          {value: 'student10', label: 'Samantha Pan'},])

      setSelectedClasses(false);
    }

  };

  const handleStudentChange = (selectedOption) => {
    window.location.href = "./questions";
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
    { value: 'default', label: 'Default' },
    {value: 'qs', label: 'Select Questions'},];

  const classOptions = [
    { value: 'prog1', label: 'Programming 1' },
    { value: 'APCS', label: 'AP Computer Science A' },
    { value: 'SE', label: 'Software Engineering' },];

  

  return (
    
    <Menu>
      
      <div className="mt-auto m-auto w-50">
        <Select placeholder="Pages" options = {options1} autoFocus={true} onChange={handleChange} styles={customStyles}/>
        <p></p>
        <Select placeholder="Classes" options = {classOptions} autoFocus={true} onChange={handleChangeClasses} styles={customStyles}/>
        <p></p>
        <Select placeholder="Test" options = {testOptions} autoFocus={true} onChange={handleChange} styles={customStyles}  isDisabled={isOpenableClasses}/>
        <p></p>
        
      </div>
      <div className = "signout">
        <Link to="/"><button class="signoutbutton">Sign Out</button></Link>

      </div>
    </Menu>
    


  );
};