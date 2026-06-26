import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "pripyat";
const yourPassword = "wintermute777";
const yourAPIKey = "ad1a6e87-9060-4b34-b725-609222b28e9d";
const yourBearerToken = "9e833e13-14d1-458c-8ada-6be4ee3bdd8b";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  const response = await axios.get(`https://secrets-api.appbrewery.com/random`);
  let responseString = JSON.stringify(response.data)
  res.render("index.ejs", {content: responseString})
});

app.get("/basicAuth", async (req, res) => {
  const response = await axios.get(`https://secrets-api.appbrewery.com/all`, {
    auth: {
      username: yourUsername,
      password: yourPassword
    }
  });

  let responseString = JSON.stringify(response.data);
  res.render("index.ejs", {content: responseString});
});

app.get("/apiKey", async (req, res) => {
  let score = 5;
  const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=${score}&apiKey=${yourAPIKey}`);
  
  let responseString = JSON.stringify(response.data);
  res.render("index.ejs", {content: responseString});
});

app.get("/bearerToken", async (req, res) => {
  let id = 42;
  const response = await axios.get(`https://secrets-api.appbrewery.com/secrets/${id}`, {
    headers: {
      "Authorization" : `Bearer ${yourBearerToken}`
    }
  });  

  let responseString = JSON.stringify(response.data);
  res.render("index.ejs", {content: responseString});
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
