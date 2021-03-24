const { sql, poolPromise} = require("../db.js")

class AdMaster {

    // Get All the Ads.
    async getAllData(req, res) {
        try {
            const pool = await poolPromise;
            let result = await pool.query(`SELECT * FROM AdMaster`);
            res.json({"status":1,"data":result.recordset});
        } catch {
            res.json({"status":0,"data":"None"});
        }
    }

    // Insert An Advertisement
    async InsertAd(req,res) {
        try{
            if (req.body.AdImage && req.body.AdDescription && req.body.CreatedBy && req.body.CreatedDate && req.body.AdHeading && req.body.EmployeeId) {
                const pool = await poolPromise;
                let result = await pool
                    .request()
                    .input("AdImage", req.body.AdImage)
                    .input("AdDescription", req.body.AdDescription)
                    .input("CreatedBy", req.body.CreatedBy)
                    .input("CreatedDate", req.body.CreatedDate)
                    .input("AdHeading", req.body.AdHeading)
                    .input("EmployeeId", req.body.EmployeeId)
                    .query(`INSERT INTO AdMaster 
                    (AdImage,AdDescription,CreatedBy,CreatedDate,AdHeading,EmployeeId) 
                    VALUES (@AdImage, @AdDescription, @CreatedBy, @CreatedDate, @AdHeading, @EmployeeId)`)
                
                if (result.rowsAffected > 0) {
                    res.json({"status":1,"message":"Data Inserted Sucessfully!!!"});
                } else {
                    res.json({"status":1,"data":"Data Insertion Failed"})
                }
            }
            else {
                res.json({"status":0,"data":"Please enter all the Values"});
            }
        } catch {
            res.json({"status":0,"message":"Error on Fetching the Data!"})            
        }
    }
}


// Export Module Out
const admaster = new AdMaster();
module.exports = admaster;