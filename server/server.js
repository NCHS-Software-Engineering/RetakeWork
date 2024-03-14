
const express = require('express');

//const PORT = 3000;
const app = express();

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
  return res.sendStatus(500);

});





app.listen(3000, () => console.log('Example app is listening on port 3000.'));