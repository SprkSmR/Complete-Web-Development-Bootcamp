import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs", 
    {prompt: "Enter your name below"});
});

app.post("/submit", (req, res) => {
  let nameLetters = req.body["fName"].length + req.body["lName"].length;
  res.render(__dirname + "/views/index.ejs", {
    fullName: nameLetters,
    prompt: "Your name has " + nameLetters + " letters."
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
