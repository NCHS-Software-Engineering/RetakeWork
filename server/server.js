
const express = require('express');
const cors = require('cors');


//const PORT = 3000;
const app = express();
app.use(cors());
const mysql = require('mysql2'); 
 const connection = mysql.createConnection({
   host: 'db.redhawks.us',
   user: 'redhawks_retake',
   password: '#usi=rltACUtR!=0ubO#',
   database: 'redhawks_retake'
 });

 connection.connect((err) => 
{
  if (err) {
    console.log("Error connecting to the database", err);
  }else {
    console.log("Connected to the database!");
  }
})

app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.put('/testing', (req, res) => {
  console.log('Request type: ', req.method);
  next();
});


app.get('/login', (req, res) => {
  res.send('hi');
});


app.get('/', (req, res) => {
  console.log("hey");
  

});





app.listen(3000, () => console.log('Example app is listening on port 3000.'));