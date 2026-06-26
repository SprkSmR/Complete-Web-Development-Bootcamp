import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;
const URL = "https://secrets-api.appbrewery.com/random";

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try{
        const response = await axios.get(URL);

        res.render("index.ejs", { 
            secret: response.data["secret"],
            user: response.data["username"]
        });
    } catch(error){
        console.log(error.response.data);
    }
});

app.listen(PORT, () => {
    console.log("Now hosting!")
});