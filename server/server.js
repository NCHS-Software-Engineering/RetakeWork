
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
  password: '#usi=rltACUtR!=0ubO#',
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
  secret: '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', // Change this to a secure random string
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: '325867374050-58t8688kosk35pieu0unrho7br57pbrg.apps.googleusercontent.com',
  clientSecret:'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',
  callbackURL: 'http://localhost:3001/auth/google/callback'
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
  successRedirect: '/',
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