
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


const PORT = 8000;
const app = express();
app.use(cors());
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'db.redhawks.us',
  user: 'redhawks_retake',
  password: process.env.REACT_APP_DB_PASSWORD,
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
  callbackURL: 'http://localhost:8000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Save user profile to session or database
  return done(null, profile);
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
  failureRedirect: '/login'
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
  req.logout();
  res.redirect('/');
});

app.listen(PORT, () => console.log('Example app is listening on port 8000.'));