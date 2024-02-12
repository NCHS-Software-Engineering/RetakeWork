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
 
  const options1 = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla'},];
  return (
    <Menu>
      <div className="mt-auto m-auto w-50">
        <Select options = {options1} autoFocus={true}/>
      </div>

    </Menu>
  );
};

