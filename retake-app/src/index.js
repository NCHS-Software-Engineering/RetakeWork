import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import reportWebVitals from './reportWebVitals';

var googleKey = process.env.GOOGLECLIENTID;
console.log(googleKey);
 const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId= "325867374050-58t8688kosk35pieu0unrho7br57pbrg.apps.googleusercontent.com">
      <React.StrictMode>
          <App />
      </React.StrictMode>
  </GoogleOAuthProvider>,
); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


const logIn = () => {
    return (
        <div>
          
          <h1>Welcome to GeeksforGeeks</h1>
          
            

        </div>
    );
};
 
export default logIn;