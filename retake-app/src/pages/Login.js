import React from 'react';
import './Login.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';


const Login = () => {
    /*const responseMessage = (response) => {
        console.log(response);
      };
      const errorMessage = (error) => {
          console.log(error);
      }; */

    return (
        <body>
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

                {/* <div className="remember-forget">
                    <label><input type="checkbox" />Remember me</label>
                    <a href='#' >Forgot password?</a>
                </div> */}

                <Link to="/home"><button className = 'logButtonIn' type='submit'>Login</button></Link>

                {/* <div className="register-link">
                    <p>Click here to <Link to="/signup">sign up</Link></p>
                </div>
                <div>
                <h2>React Google Login</h2>
                <br />
                <br />
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                </div>
 */}
                <div class="go"><i class="fab fa-google"></i>  Google</div>
            </form>
        </div>
        </div>
        </body>
    );
};

export default Login;