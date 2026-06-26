import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "7117",
  port: 5432
});

const port = 3000;

const REGISTER_USER_QUERY = `
INSERT INTO users (email, password) 
VALUES ($1, $2);`;

const LOGIN_USER_QUERY = `
SELECT * FROM users WHERE email = $1;`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try {
    const result = await pool.query(REGISTER_USER_QUERY, [req.body.username, req.body.password]);
    res.render("secrets.ejs");
  } catch(error) {
    console.log(`An error has ocurred: "${error}"`);
  }
});

app.post("/login", async (req, res) => {
  try {
    const result = await pool.query(LOGIN_USER_QUERY, [req.body.username]);
    if (result.rows.length <= 0){
      throw("No user has been found with this email address");
    }
    if (result.rows[0].password != req.body.password){
      throw("Incorrect password");
    }
    res.render("secrets.ejs");
  } catch (error) {
    console.log(`An error has ocurred: "${error}"`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
