const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const axios = require('axios');


const PORT = 8000;
const app = express();


app.use(cors());
app.use(express.json());

const mysql = require('mysql2');

const selectedTest =
  require('dotenv').config();

const connection = mysql.createConnection({
  host: 'db.redhawks.us',
  user: 'redhawks_retake',
  password: `${process.env.REACT_APP_DB_PASSWORD}`,
  database: 'redhawks_retake'
});

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow only GET and POST requests
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specific headers
  credentials: true
};

app.use(cors(corsOptions));

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to the database", err);
  } else {
    console.log("Connected to the database!");
  }
})

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'retake-app', 'src', 'assets')); // Set destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Set filename
  }
});

// File filter function to accept only PDF and CSV files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype === 'text/csv') {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only PDF and CSV files are allowed')); // Reject the file
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Route to handle file upload
app.post('/api/uploadfile', upload.single('testsheet'), (req, res) => {
  // If file is uploaded successfully, respond with success message
  console.log('File uploaded successfully');
  res.status(200).json({ message: 'File uploaded successfully' });
});


//get classes under teacher from database 
app.get('/api/classes/:email', (req, res) => {

  const email = req.params.email;

  connection.query(`
      SELECT *
      FROM class
      WHERE class.teacher_fk = '${email}'
      `, (err, result) => {
    console.log("getting classes")
    if (err) throw err;
    return res.json({ result });
  });
});


//insert classes into database
app.post('/api/classes', (req, res) => {
  console.log('here in the class creation route')

  const classname = req.body.name;
  const teacherFK = req.body.teacherFK;

  connection.query("INSERT INTO class (teacher_fk, name) VALUES (?, ?)", [teacherFK, classname], (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(JSON.stringify(result));
  });
})

//delete class from database
app.delete('/api/classes', (req, res) => {
  console.log('here in the class creation route')
})

//get tests from class to populate dropdown
app.get('/api/tests/:classId', (req, res) => {
  console.log("getting tests")
  const classId = req.params.classId;
  connection.query(`
      SELECT *
      FROM test WHERE test.class_fk = ${classId}
      `, (err, result) => {
    console.log("getting classes")
    if (err) throw err;
    return res.json({ result });
  });
})

//post test from class to database
app.post('/api/tests', (req, res) => {
  console.log('here in the test creation route')

  const testName = req.body.name;
  const teacherFK = req.body.teacherFK;
  const classFK = req.body.classFK;

  connection.query("INSERT INTO test (class_fk, teacher_fk, name) VALUES (?, ?, ?)", [classFK, teacherFK, testName], (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(JSON.stringify(result));

  });
})

//delete test from class 
app.delete('/api/tests/:testId', (req, res) => {
  console.log('here in the test deletion route')
  const testId = req.params.testId;
  connection.query(`
    DELETE FROM test WHERE test.id = ${testId}`
    , (err, result) => {
      if (err) {
        console.log(err)
      }
      res.send(JSON.stringify(result));
    });

})



app.put('/api/tests/:testId', (req, res) => {
  const testId = req.params.testId;
  const link = req.body.link;
  console.log("hi", testId, link)

  connection.query('UPDATE test SET link = ? WHERE id = ?', [link, testId], (error, results) => {
    if (error) {
      console.error('Error updating test link:', error);
      return res.status(500).json({ message: 'Server error' });
    }

    // Check if the test was found and updated
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Return a success response
    res.status(200).json({ message: 'Test link updated successfully' });
  });
});




app.get('/api/test/link/:testId', (req, res) => {
  const testID = req.params.testId;
  connection.query(`SELECT link FROM test WHERE test.id=${testID}`, (err, result) => {
    console.log("sending test data")
    console.log(result)
    if (err) throw err;
    return res.json({ result });
  });
})

app.get('/api/tests/selected/select/:testId', (req, res) => {
  const testID = req.body.id;


  connection.query(`SELECT name FROM test WHERE test.id=${testID}`, (err, result) => {
    console.log("sending test data")
    if (err) throw err;
    return res.json({ result });
  });
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

// Accessing authenticated user in a route handler
app.get('/profile', (req, res) => {
  const user = req.user; // Access authenticated user's information
  res.render('profile', { user });
});

// Google OAuth login route
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback route
app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000/',
  failureRedirect: 'http://localhost:3000/'
}));

// Route handler for the home page
app.get('/home', (req, res) => {
  // Access authenticated user's information from req.user
  const { username, email } = req.body;
  console.log(email)
  // Use user information as needed
  res.json(email);
});

// Route to check if user is authenticated
app.get('/api/auth/check', (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    // console.log("failed authenticate");
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

    const sql = `INSERT INTO teacher (username, email) VALUES ( ?, ?)`;
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


app.get('/api/link/:id', (req, res) => {
  const testID = req.params;

  const pull = `SELECT link FROM test WHERE id = ?`;

  connection.query(pull, [testID], (err, result) => {
    console.log("getting classes")
    if (err) throw err;
    return res.json({ result });
  });
});




app.listen(PORT, () => console.log('Example app is listening on port 8000.'));