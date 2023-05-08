// Required modules
const express = require('express');
const { join } = require('path');
const api = require('./routes/index.js');
// connection details
const port = process.env.PORT || 3001;


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

// Renders public/index.html
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'public/index.html'));
  })

// Renders public/notes.html
app.get('/notes', (req, res) => {
  res.sendFile(join(__dirname, 'public/notes.html'));
});



app.listen(port, () => {
  console.log(`Server running at port ${port}.`);
})