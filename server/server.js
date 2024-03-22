
const express = require('express');
const cors = require('cors');


//const PORT = 3000;
const app = express();
app.use(cors());
//const mysql = require('mysql2'); 
// const connection = mysql.createConnection({
//   host: 'db.redhawks.us',
//   user: 'redhawks_retake',
//   password: '#usi=rltACUtR!=0ubO#',
//   database: 'redhawks_retake'
// });

app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.put('/testing', (req, res) => {
  console.log('Request type: ', req.method);
});


app.get('/login', (req, res) => {
  console.log("hi");
});


app.get('/', (req, res) => {
  console.log("hey");
  

});





app.listen(8000, () => console.log('Example app is listening on port 8000.'));