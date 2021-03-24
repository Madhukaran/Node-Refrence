const sql = require("mssql");

const MSSQL_config = require("./config.json").MSSQL;

var config = MSSQL_config;

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

module.exports = {
  sql,
  poolPromise,
};
