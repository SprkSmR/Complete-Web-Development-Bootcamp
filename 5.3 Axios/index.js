import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let dataResult = "";
let errorMessage = "";

app.get("/", async (req, res) => {
  if (dataResult == "" && errorMessage == ""){
    try {
      const response = await axios.get("https://bored-api.appbrewery.com/random");
      dataResult = response.data;
      console.log(dataResult);
    } catch (error) {
      errorMessage = error.message
      console.error("Failed to make request:", errorMessage);
    }
  }

  res.render("index.ejs", { data: dataResult, error: errorMessage });
  dataResult = "";
  errorMessage = "";
});

app.post("/", async (req, res) => {
  try{
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${req.body["type"]}&${req.body["participants"]}`);
    dataResult = response.data[0];
  } catch(error) {
    errorMessage = `No activities that match your criteria (${error.message})`;
    console.error("Failed to make request: ", error.message);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
