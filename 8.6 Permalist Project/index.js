import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 4000;

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "7117",
  port: 5432
});

const GET_ITEM_QUERY = 
`SELECT * FROM items
WHERE mark = FALSE;`;

const DELETE_ITEM_QUERY =
`UPDATE items
SET mark = TRUE
WHERE id = $1;`;

const CREATE_ITEM_QUERY = 
`INSERT INTO items (title)
VALUES ($1);`;

const UPDATE_ITEM_QUERY = 
`UPDATE items
SET title = $2
WHERE id = $1;`;

var currentError = "";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  var items = []
  try {
    const result = await pool.query(GET_ITEM_QUERY);
    items = result.rows;
    console.log(items);
  } catch(error) {
    currentError = "No items available!";
  }
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  console.log(item);
  try {
    await pool.query(CREATE_ITEM_QUERY, [item]);
  } catch(error) {
    currentError = "Unable to insert item!";    
  }
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const itemChanges = req.body;
  try {
    await pool.query(UPDATE_ITEM_QUERY, [itemChanges.updatedItemId, itemChanges.updatedItemTitle]);
  } catch(error) {
    currentError = "Unable to modify item!";
    console.log(error);    
  }
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const itemDelete = req.body;
  try {
    await pool.query(DELETE_ITEM_QUERY, [itemDelete.deleteItemId]);
  } catch(error) {
    currentError = "Unable to modify item!";
    console.log(error);    
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
