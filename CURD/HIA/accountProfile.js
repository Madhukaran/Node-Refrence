const { sql, poolPromise} = require("../db.js")

class AccountProfile {
    async getAllData(req, res){
        try {
            const pool = await poolPromise;
            let result = await pool.query(`SELECT * FROM AccountProfile`);
            res.json({"status":1,"data":result.recordset});
        } catch {
            res.json({"status":0,"data":"None"});
        }
    }
}

// Export Module Out
const accountprofile = new AccountProfile();
module.exports = accountprofile;