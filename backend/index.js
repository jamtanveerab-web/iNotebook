require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors());

app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`iNoteBook backend is running on http://localhost:${port}`);
  })
}

module.exports = app;