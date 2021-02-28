//Require Modules
const express = require("express");
const dotenv = require("dotenv");
var cors = require('cors')
const bodyParser = require("body-parser");
dotenv.config();

//Require Files


//Initialize with express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers","*")
    next();
});



app.use("/", require("./routes/index"));

app.listen(5000, () => {
    console.log("Listening");
})


