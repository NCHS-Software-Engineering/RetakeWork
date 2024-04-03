
const express = require('express');
const cors = require('cors');


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

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to the database", err);
  } else {
    console.log("Connected to the database!");
  }
})

// Set up Multer storage
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    // At this point, req.file.buffer contains the resized image
  
    // Define the directory where the image will be saved
    const saveDir = path.join(__dirname, 'src', 'assets');
  
    // Count the number of images in the directory
    const imageCount = countImagesInDirectory(saveDir);
  
    // Generate a new filename based on the image count
    const newFilename = `slide${imageCount + 1}.png`; // Change the extension if needed
  
    // Define the full path where the image will be saved
    const savePath = path.join(saveDir, newFilename);
  
    // Write the image file to disk
    fs.writeFile(savePath, req.file.buffer, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error saving file.');
      }
  
      res.send('File uploaded, resized, and saved successfully.');
    });
  });
  



app.listen(PORT, () => console.log('Example app is listening on port 8000.'));