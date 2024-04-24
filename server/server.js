
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const axios = require('axios');


const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());

const mysql = require('mysql2');


require('dotenv').config();

const connection = mysql.createConnection({
  host: 'db.redhawks.us',
  user: 'redhawks_retake',
  password: `${process.env.REACT_APP_DB_PASSWORD}`,
  database: 'redhawks_retake'
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to the database", err);
  } else {
    console.log("Connected to the database!");
  }
})

// Set up session middleware
app.use(session({
  secret: process.env.REACT_APP_CLIENT_SECRET, // Change this to a secure random string
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: `${process.env.REACT_APP_CLIENT_ID}`,
  clientSecret: `${process.env.REACT_APP_CLIENT_SECRET}`,
  callbackURL: 'http://localhost:8000/auth/google/callback',
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  // Save user profile to session or database

  const user = {
    username: profile.displayName,
    email: profile.emails[0].value,
  };

  req.user = user; 

  console.log(req.user);

  const { username, email } = req.user;

  
  axios.post('http://localhost:8000/api/users', { username, email });

  return done(null, user);

}));

// Serialize user object to store in session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user object from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google OAuth login route
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback route
app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000/home',
  failureRedirect: 'http://localhost:3000/'

}));

// Route to check if user is authenticated
app.get('/api/auth/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

// Logout route
app.get('/api/auth/logout', (req, res) => {
  console.log("logged out");
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
      res.status(500).send("Logout failed");
    } else {
      res.redirect('http://localhost:3000/'); // Redirecting to front-end
    }
  });
});

// Route to add a new user account
app.post('/api/users', (req, res) => {
  const { username, email } = req.body;

  // Check if the user already exists in the database
  const selectSql = `SELECT * FROM teacher WHERE email = ?`;
  connection.query(selectSql, [email], (selectErr, selectResults) => {
    if (selectErr) {
      console.error("Error checking for existing user:", selectErr);
      return; //res.status(500).json({ error: "Error checking for existing user" });
    }

    // If a user with the same email already exists, return an error
    if (selectResults.length > 0) {
      return;// res.status(409).json({ error: "User with the same email already exists" });
    }


    const sql = `INSERT INTO teacher ( username, email) VALUES ( ?, ?)`;
    connection.query(sql, [username, email], (err, results) => {
      if (err) {
        console.error("Error inserting new user:", err);
        res.status(500).json({ error: "Error inserting new user" });
      } else {
        console.log("New user inserted:", results);
        res.status(201).json({ message: "New user inserted successfully" });
      }
    });
  });
});

app.listen(PORT, () => console.log('Example app is listening on port 8000.'));