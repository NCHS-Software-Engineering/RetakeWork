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
  useNavigate,
} from "react-router-dom";



const baseURL = "http://localhost:8000/";

const email = localStorage.getItem('myString');

console.log(email)

const Parent = () => {
  const data = "Data from Parent to Child";
  <Child data={data} />
};


export default props => {

  const [user, setUser] = useState({ username: '', email: '' }); // Default empty user


  useEffect(() => {
    console.log("getting user");

    axios.get('http://localhost:8000/api/auth/check', { withCredentials: true }) // Make an HTTP GET request to check authentication
      .then((response) => {
        if (response.data.authenticated) {
          
          setUser(response.data.user); // Store user data in state
        }
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
      });
  }, []); // The empty array ensures this effect runs once when the component is mounted



  const [isOpenableClasses, disableOpenable] = useState(true);
  const [testOptions, setTestOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [studentOptions, setStudents] = useState([]);
  const [userInput, setUserInput] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [classId, setClassId] = useState(1);
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
    console.log("handling class choice")
    setSelectedClass(selectedClass);


    if (selectedClass.value === "addClass") {
      setUserInput('');
    }
    else {
      const res = await fetch(`http://localhost:8000/api/tests/${selectedClass.value}`);
      const data = await res.json();
      //populate test options with data from class table

      console.log(data)
      const tests = data.result.map((entry) => {
        return { value: entry.id, label: entry.name }
      });
      console.log(tests)
      setTestOptions([...tests, { value: 'addTest', label: 'Add Test...' }]);

    }
  };


  const createClass = async (className) => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/classes',
        {
          teacherFK: user,
          name: className,
        },
      )

      //debugger;
      const data = await res.data;
      //debugger;
      if (res.status === 200) {
        setClasses([...classes, data])
        alert('Class Successfully Created!');
        window.location.reload();

      }
    } catch (error) {
      console.error('Error creating test:', error);
    }
  };

  const createTest = async (testName) => {
    const res = await axios.post(
      'http://localhost:8000/api/tests',
      {
        teacherFK: user,
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
      window.location.reload();
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


  const navigate = useNavigate();

  const logOut = () => {
    console.log("function called");
    axios.get('http://localhost:8000/api/auth/logout')
      .then(() => {
        // Redirect the user after successful logout
        navigate('/');
      })
      .catch((err) => {
        console.error('Logout failed:', err);
      });
  };

  const handleChangeTest = (selectedTest) => {
    setSelectedTest(selectedTest);
    console.log("handling test selection")
    console.log(selectedTest.value)
    if (selectedTest.value === "addTest") {
      setUserInput('');
    }
    // Redirect to another page with the selected test value in the URL
    window.location.href = `/upload?selectedTest=${selectedTest.value}`;

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
    fetch('/home')
      .then(response => response.json())
      .then(data => {
        setUser(data);
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    async function fetchData() {
      const value = await fetch(`http://localhost:8000/api/classes`);

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

  const handleRefresh = () => {
    window.location.reload(); // Reloads the current page
  };




  return (

    <Menu>

      <div className="mt-auto m-auto w-50">
        <p1 className="welcome-message">Hello {user.username}!</p1>
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
        <Link to="/"><button class="backbutton" onClick={handleRefresh}>Back to home</button></Link>

      </div>
    </Menu>



  );
};
