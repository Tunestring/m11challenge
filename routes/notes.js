// Require Express
const express = require('express');

// Define routes used
const notesRouter = require('./notes.js');

// Router creation
const router = express.Router();

router.use('/notes', notesRouter);

module.exports = router;