import React from 'react';
import './Login.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Login = () => {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

   /*  useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    ); */

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    const responseMessage = (response) => {
        console.log(response);
      };
      const errorMessage = (error) => {
          console.log(error);
      }; 

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

                
                <div>
                <h2>React Google Login</h2>
                <br />
                <br />
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                </div>
 
                <div class="go"><i class="fab fa-google"></i>  Google</div>
                <div className="register-link">
                    <p>Click here to <Link to="/signup">sign up</Link></p>
                </div>
            </form>
        </div>
        </div>
        </body>
    );
};

export default Login;