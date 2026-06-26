import e from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = e();
const port = 3000;
const responseDateMessages = ["It's a weekday, it's time to work hard!", "It's a weekend, it's time to have fun!"];

var date = new Date().getDay();
var responseDateMessage = "";

app.use((req, res, next) => {
    if (date > 0 && date < 6){
        responseDateMessage = responseDateMessages[0];
    }
    else{
        responseDateMessage = responseDateMessages[1];
    }
    next();
});

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs", 
        {dateMessage: responseDateMessage}
    );
});

app.listen(port, ()=> {
    console.log("Now hosting!");
});

