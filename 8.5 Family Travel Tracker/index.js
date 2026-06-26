import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const GET_USERS = 
`SELECT * FROM member;`;
const GET_VISITED_QUERY = 
`SELECT c.country_code AS code, c.country_name AS name
FROM visitation v
JOIN member m ON v.member_id = m.id
JOIN country c ON v.country_id = c.id
WHERE m.id = $1;`;
const POST_VISIT_QUERY = 
`INSERT INTO visitation (member_id, country_id)
VALUES ($1, $2);`;
const CHECK_COUNTRY_QUERY = 
`SELECT id, country_code 
FROM country
WHERE country_name ILIKE '%' || $1 || '%';`;
const POST_USER_QUERY = 
`INSERT INTO member (name, color)
VALUES ($1, $2)
RETURNING id;`;

var currentError = "";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "family_tracker",
  password: "7117",
  port: 5432
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  var countryList = [];
  var userList = [];
  var currentUser = null;
  try {
    const result = await pool.query(GET_USERS);
    userList = result.rows;
    if (userList.length > 0){
      currentUser = userList.find((user) => user.id == (req.query.user ? req.query.user : 1));
      try {
          const result = await pool.query(GET_VISITED_QUERY, [currentUser.id]);
          result.rows.forEach((country) => countryList.push(country.code));
        } catch(error) {
          currentError = "Unable to load countries!";
        }  
    } else {
      throw currentError;
    }
  } catch(error){countryList
    currentError = "Unable to load users!";
  }
  
  res.render("index.ejs", {total: countryList.length, countries: countryList, users: userList, active_user: currentUser, error: currentError });
});

app.post("/add", async (req, res) => {
  currentError = "";
  try {
    const resultFirst = await pool.query(CHECK_COUNTRY_QUERY, [req.body.country]);
    if (resultFirst.rows.length > 0) {
      try {
        await pool.query(POST_VISIT_QUERY, [req.body.user, resultFirst.rows[0].id]);
      } catch (error) {
        currentError = "Country has already been added or does not include a country code!";
      }
    } else {
      throw currentError;
    }
  } catch (error) {
    currentError = "Country does not exist!";
  }
  res.redirect(`/?user=${req.body.user}`);
});

app.get("/user", async (req, res) => {
  res.render("new.ejs");
});

app.post("/new", async (req, res) => {
  currentError = "";
  var createdUser = null; 
  try {
    const result = await pool.query(POST_USER_QUERY, [req.body.name, req.body.color]);
    createdUser = result.rows[0].id;
  } catch (error) {
    currentError = "Unable to create user!";
  }

  res.redirect(
    createdUser ? 
    `/?user=${createdUser}` : 
    "/"
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
