const express = require('express')
const bodyParser = require('body-parser')
const DatabaseConfig = require('./config.js');
const mongoose = require('mongoose')

const app = express();

app.use(bodyParser.urlencoded({ extended : true }))

app.use(bodyParser.json())
app.get('/', (req,res) => {
    res.json({"Message":"Welcome to my Curd Application"})
});

app.listen(10000, () =>{
    console.log("Server Started on Port 10000")
});

// Database Configuration
mongoose.connect(DatabaseConfig.url, {
    useNewUrlParser: true
    })
    .then(() => {
        console.log("Sucessfully connected to the Database!")
    })
    .catch(error => {
        console.log("Error on Connecting to the Database!",error);
        process.exit();
    });
