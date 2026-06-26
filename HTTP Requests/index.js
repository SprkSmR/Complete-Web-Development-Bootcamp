import express from "express";

const app = express();
const port = 3000;


app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.get("/contact", (req, res) => {
    res.send("My name is Omar");
});

app.get("/contact/number", (req, res) => {
    res.send("My phone number 1122334455");
});

app.get("/about", (req, res) => {
    res.send("Amnesic engineer trying to recover his technical memories.");
});

app.listen(port, () => {
    console.log("Now hosting!");
});
