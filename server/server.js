
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const PORT = 8000;
const app = express();
app.use(cors());
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'db.redhawks.us',
  user: 'redhawks_retake',
  password: '#usi=rltACUtR!=0ubO#',
  database: 'redhawks_retake'
});

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow only GET and POST requests
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specific headers
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


app.listen(PORT, () => console.log('Example app is listening on port 8000.'));