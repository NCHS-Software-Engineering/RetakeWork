import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import reportWebVitals from './reportWebVitals';
import REACT_APP_GOOGLECLIENTID from './/.env';




const googleKey =REACT_APP_GOOGLECLIENTID;
 const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={REACT_APP_GOOGLECLIENTID}>
      <React.StrictMode>
          <App />
      </React.StrictMode>
  </GoogleOAuthProvider>,
); 

// If you want to start measuring performance in your app, pass a function
// to log results (fo r example: reportWebVitals(console.log))
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