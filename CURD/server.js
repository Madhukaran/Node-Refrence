const express = require('express')
const bodyParser = require('body-parser')
const sql = require("mssql");
const MSSQL_config = require("./config.json").MSSQL;
const Routes = require("./routes")

const app = express();

app.use(bodyParser.urlencoded({ extended : true }))

app.use(bodyParser.json())
app.use(Routes);

app.get('/', (req,res) => {
    const poolPromise = new sql.ConnectionPool(MSSQL_config)
    .connect()
    .then((pool) => {
        console.log("Connected Database:HIA")
        res.json({"Status":1,"Message":"HIA Node Api-CURD Application!","Datbase":pool.config.database})
    })
    .catch((error) => {
        console.log("Error on Connecting to the Database",error)
        res.json({"status":0,"Message":"Database connection Failed!","Database":"None"})
    });
});

app.listen(10000, () =>{
    console.log("Server Started on Port 10000")
});