const notesRouter = require("express").Router();
const { join } = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

noteGetRouter.get ('/', (req,res) =>{
    fs.readFile(join(__dirname, "..", "db", "db.json"), (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(JSON.parse(data));
        }
    });
});