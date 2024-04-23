import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import Select from "react-select";
import { PiSignOutBold } from "react-icons/pi";
import Child from './SelectQs.js';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

const baseURL = "http://localhost:8000/";


const Parent = () => {
  const data = "Data from Parent to Child";
  <Child data={data} />
};


export default props => {

  const [isOpenableClasses, disableOpenable] = useState(true);
  const [testOptions, setTestOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [studentOptions, setStudents] = useState([]);
  const [userInput, setUserInput] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [classId, setClassId] = useState(1);
  const [userId, setUserId] = useState(1);
  const [classes, setClasses] = useState([]);
  const [tests, setTests] = useState([]);


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
    if (selectedOption.value === "email") {
      window.location.href = "./email";
    }
    if (selectedOption.value === "upload") {
      window.location.href = "./upload";
    }

  };



  const handleChangeClasses = async (selectedClass) => {
    disableOpenable(false);
    console.log("test dropdown")
    setSelectedClass(selectedClass);
    const res = await fetch(`http://localhost:8000/api/tests/${selectedClass.value}`);
    const data = await res.json();
    //populate test options with data from class table
  
      console.log(data)
      const tests = data.result.map((entry) => {
        return { value: entry.id, label: entry.name }
      });
      console.log(tests)
      setTestOptions([...tests, { value: 'addTest', label: 'Add Test...' }]);
    


    
    /* if (selectedClass.value === "prog1") {
      setTestOptions([
      { value: 'test1', label: 'Chapter 1 Test' },
      { value: 'test2', label: 'Chapter 2 Test' },
      { value: 'test3', label: 'Chapter 3 Test' },
      { value: 'test4', label: 'Chapter 4 Test' },
      { value: 'addTest', label: 'Add Test...'}]);

        setStudents([
          {value: 'student1', label: 'Henry Anderson'},
          {value: 'student2', label: 'Doran Sanford'},
          {value: 'student3', label: 'Conner Furby'},])

      setSelectedClasses(false);
    }
    if (selectedClass.value === "APCS") {
      setTestOptions([
      { value: 'test5', label: 'Unit 1: Primitive Types Test' },
      { value: 'test6', label: 'Unit 5: Writing Classes Test' },
      { value: 'test7', label: 'Unit 10: Recursion Test' },
      { value: 'addTest', label: 'Add Test...'}]);

        setStudents([
          {value: 'student4', label: 'Sam Abud'},
          {value: 'student5', label: 'Jacob Wachtor'},
          {value: 'student6', label: 'Jake Moore'},])

      setSelectedClasses(false);
    }
    if (selectedClass.value === "SE") {
      setTestOptions([
      { value: 'test9', label: 'Chapter 15 Exam' },
      { value: 'test10', label: 'Maze Lab' },
      { value: 'test11', label: 'Chapter 17 Test' },
      { value: 'addTest', label: 'Add Test...'}]);

        setStudents([
          {value: 'student7', label: 'Ahkil Kanuri'},
          {value: 'student8', label: 'Alex Ung'},
          {value: 'student9', label: 'Will Stenzel'},
          {value: 'student10', label: 'Samantha Pan'},])

      setSelectedClasses(false);
    } */

    if (selectedClass.value === "addClass") {
      setUserInput('');
    }

  };


  const createClass = async (className) => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/classes',
        {
          teacherFK: userId,
          name: className,
        },
      )

      //debugger;
      const data = await res.data;
      //debugger;
      if (res.status === 200) {
        setClasses([...classes, data])
        alert('Class Successfully Created!');

      }
    } catch (error) {
      console.error('Error creating test:', error);
    }
  };

  const createTest = async (testName) => {
    const res = await axios.post(
      'http://localhost:8000/api/tests',
      {
        teacherFK: userId,
        classFK: selectedClass.value,
        name: testName,
      },
    )

    //debugger;
    const data = await res.data;
    //debugger;
    if (res.status === 200) {
      setTests([...tests, res.data])
      alert('Test Successfully Created!');
    }
  };

  const handleStudentChange = (selectedOption) => {
    window.location.href = "./questions";
  };




  const customStyles = {
    control: (provided, state) => ({
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
    })
  };


  const options1 = [
    { value: 'signup', label: 'Sign Up' },
    { value: 'home', label: 'Home' },
    { value: 'login', label: 'Log In' },
    { value: 'default', label: 'Default' },
    { value: 'qs', label: 'Select Questions' },
    { value: 'email', label: 'Email' },
    { value: 'upload', label: 'Upload' }];

  const classOptions1 = [
    { value: 'prog1', label: 'Programming 1' },
    { value: 'APCS', label: 'AP Computer Science A' },
    { value: 'SE', label: 'Software Engineering' },
    { value: 'addClass', label: 'Add class...' },];



  const handleChangeTest = (selectedTest) => {
    setSelectedTest(selectedTest);
    if (selectedTest.value === "addTest") {
      setUserInput('');

    }
  }

  // Function to handle user input change
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyDownClass = (event) => {
    if (event.key === 'Enter') {
      createClass(event.target.value);
    }
  }
  const handleKeyDownTest = (event) => {
    if (event.key === 'Enter') {
      createTest(event.target.value);
    }
  }

  //populate class options with data from class table
  useEffect(() => {
    async function fetchData() {
      const value = await fetch('http://localhost:8000/api/classes');
      const data = await value.json();
      console.log(data)
      const classes = data.result.map((entry) => {
        return { value: entry.id, label: entry.name }
      });
      console.log(classes)
      setClassOptions([...classes, { value: 'addClass', label: 'Add class...' }]);
    }

    fetchData();
  }, []);

  


  return (

    <Menu>

      <div className="mt-auto m-auto w-50">
        <Select
          placeholder="Pages"
          options={options1}
          autoFocus={true}
          onChange={handleChange}
          styles={customStyles} />
        <p></p>
        <Select
          placeholder="Classes"
          options={classOptions}
          autoFocus={true}
          onChange={handleChangeClasses}
          styles={customStyles}
        />
        <br></br>
        <br></br>
        {selectedClass && selectedClass.value === 'addClass' && (
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter your new class"
            onKeyDown={handleKeyDownClass}
          />
        )}
        

        <p></p>
        <Select
          placeholder="Test"
          options={testOptions}
          autoFocus={true}
          onChange={handleChangeTest}
          styles={customStyles}
          isDisabled={isOpenableClasses}
        />
        <br></br>
        <br></br>
        {selectedTest && selectedTest.value === 'addTest' && (
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Enter new test name"
            onKeyDown={handleKeyDownTest}
          />
        )}
        <p></p>

      </div>
      <div className="signout">
        <Link to="/"><button class="signoutbutton">Sign Out</button></Link>

      </div>
    </Menu>



  );
};
