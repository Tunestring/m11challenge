const express = require("express");
const { join } = require("path");
const { promises: fs } = require("fs");
const { v4: uuidv4 } = require("uuid");

const notesRouter = express.Router();

// Middleware to read JSON file
async function readJsonFile(req, res, next) {
  try {
    const data = await fs.readFile(join(__dirname, "..", "db", "db.json"));
    res.locals.notes = JSON.parse(data);
    next();
  } catch (err) {
    next(err);
  }
}

// Middleware to append new note to existing notes
function editNote(req, res, next) {
  req.body.id = uuidv4();
  res.locals.notes.push(req.body);
  next();
}

// Middleware to write JSON file with added note
async function writeJsonFile(req, res, next) {
  try {
    await fs.writeFile(
      join(__dirname, "..", "db", "db.json"),
      JSON.stringify(res.locals.notes, null, 4)
    );
    res.json("Added note!");
  } catch (err) {
    next(err);
  }
}

// Middleware to delete note by id
async function deleteNoteById(req, res, next) {
  try {
    const filteredNotes = res.locals.notes.filter((note) => note.id !== req.params.id);
    await fs.writeFile(
      join(__dirname, "..", "db", "db.json"),
      JSON.stringify(filteredNotes, null, 4)
    );
    res.json("Deleted note!");
  } catch (err) {
    next(err);
  }
}

// Route to get all notes
notesRouter.get("/", readJsonFile, (req, res) => {
  res.json(res.locals.notes);
});

// Route to add new note
notesRouter.post("/", readJsonFile, editNote, writeJsonFile);

// Route to delete note by id
notesRouter.delete("/:id", readJsonFile, deleteNoteById);

// Error handler middleware
notesRouter.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

module.exports = notesRouter;