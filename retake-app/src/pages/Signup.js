import React from 'react';
import './Signup.css';
import {
    Link as Link,
  } from "react-router-dom";


const Login = () => {
    return (
        <div className='wrapper'>
            <form action="">
            <h1>Sign Up</h1>

            <div className='input-box'>
    <input type="text" placeholder='Username' required />
</div>

<div className='input-box'>
    <input type="text" placeholder='Password' required />
</div>

<div className='input-box'>
    <input type="text" placeholder='Confirm password' required />
</div>

{/*  <div className="remember-forget">
    <label><input type="checkbox" />Remember me   </label>
    <a href='#' >   Forget password</a>
</div> */}

<Link to="/login"><button className = 'signButtonUp' type='submit'>Signup</button></Link>

<div className="register-link">
    <p>Click here to <Link to="/login">login</Link></p>
</div>
            </form>
        </div>
    );
};

export default Login;