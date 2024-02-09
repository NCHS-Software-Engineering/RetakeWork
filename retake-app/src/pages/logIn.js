import React from 'react';
import './Login.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";

const Login = () => {
    return (
        <div className='screen'>
        <div className='box'>
            <form action="">
                <h1>Login</h1>

                <div className='username'>
                    <input type="text" placeholder='Username' required />
                </div>

                <div className='password'>
                    <input type="text" placeholder='Password' required />
                </div>

                <div className="remember-forget">
                    <label><input type="checkbox" />Remember me</label>
                    <a href='#' >Forgot password?</a>
                </div>

                <Link to="/"><button type='submit'>Login</button></Link>

                <div className="register-link">
                    <p>Click here to <a href="#">sign up</a></p>
                </div>
            </form>
        </div>
        </div>
    );
};

export default Login;