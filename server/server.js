
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());
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

//insert teacher accounts into database - passport??
app.post('/api/teachers', (req, res) => {
  res.send("POST Request Called")
})  

//delete teacher from database
app.delete('/api/teachers', (req, res) => { 
  res.send("DELETE Request Called") 
})

//get classes under teacher from database 
app.get('/api/classes', (req, res) => {
  res.send("GET Request Called")
})

//insert classes into database
app.post('/api/classes', (req, res)=> {
  console.log('here in the class creation route')

  const classname = req.body.name;
  const teacherFK = req.body.teacherFK;

  connection.query("INSERT INTO class (teacher_fk, name) VALUES (?, ?)", [teacherFK, classname], (err,result)=>{
     if(err) {
     console.log(err)
     } 
     res.send(JSON.stringify(result));
  });   
})

//delete class from database
app.delete('/api/classes', (req, res) => { 
  res.send("DELETE Request Called") 
})

//get tests from class to populate dropdown
app.get('/api/tests', (req, res) => {
  res.send("GET Request Called")
})

//post test from class to database
app.post('/api/tests', (req, res) => {
  res.send("POST Request Called")
})

//delete test from class 
app.delete('/api/tests', (req, res) => {
  res.send("DELETE Request Called")
})




app.listen(PORT, () => console.log('Example app is listening on port 8000.'));