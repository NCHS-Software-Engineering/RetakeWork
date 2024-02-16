import React from 'react';
import './Login.css';
const Login = () => {
    return (
        <div className='wrapper'>
            <form action="">
                <h1>Login</h1>
                <div className='input-box'>
                    <input type="text" placeholder='Username' required/>
                    </div>
                    <div className='input-box'>
                    <input type="text" placeholder='Username' required/>
                    </div>

                    <div className="remember-forget">
                        <label><input type ="checkbox"/>Remember me</label>
                        <a href ='#' >Forget password</a>
                    </div>

                    <button type='submit'>Login</button>

                    <div className="register-link">
                        <p>click make account <a href ="#">Register</a></p>
</div>
                    </form>
        </div>
    );
};

export default Login;