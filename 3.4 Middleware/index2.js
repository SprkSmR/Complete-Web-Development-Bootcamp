import express from "express";
import morgan from "Morgan";

const app = express();
const port = 3000;

app.use(morgan('common'));

app.get("/", (req, res) => {
  res.send("Hello");
  res.status(200);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
