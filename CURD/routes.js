var AccountProfile = require("./HIA/accountProfile.js")
var AdMaster = require("./HIA/adMaster.js")


var express = require("express");
const router = express.Router();

router.get("/getAllAccounts", AccountProfile.getAllData)
router.get("/getAllAds", AdMaster.getAllData)
router.post("/insertAd", AdMaster.InsertAd)


// Export all Registered Routes
module.exports = router;