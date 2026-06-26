import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const GET_QUERY = "SELECT * FROM visited_countries;";
const POST_QUERY = "INSERT INTO visited_countries (country_code) VALUES ($1);"
const AUX_QUERY = "SELECT country_code FROM country_codes WHERE country_name ILIKE '%' || $1 || '%';";

var currentError = "";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "countries",
  password: "7117",
  port: 5432
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  let countryResult = [];

  try {
    const result = await pool.query(GET_QUERY);
    result.rows.forEach((country) => countryResult.push(country.country_code));
    res.render("index.ejs", {total: countryResult.length, countries: countryResult, error: currentError });
  } catch(error) {
    res.render("index.ejs", {total: 0, countries: [], error: "Unable to load countries!" });
  }
});

app.post("/add", async (req, res) => {
  currentError = "";
  try {
    const resultFirst = await pool.query(AUX_QUERY, [req.body.country]);
    if (resultFirst.rows.length > 0) {
      try {
        await pool.query(POST_QUERY, [resultFirst.rows[0].country_code]);
      } catch (error) {
        currentError = "Country has already been added or does not include a country code!";
      }
    } else {
      throw currentError;
    }
  } catch (error) {
    currentError = "Country does not exist!";
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});