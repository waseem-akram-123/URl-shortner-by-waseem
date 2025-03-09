const {handleGenerateNerShortURL,handleGetLink,handlegetAnalytics} = require ("../controllers/url");
const express = require ("express");
const router = express.Router();

router.post ("/", handleGenerateNerShortURL);
router.get ("/:shortId", handleGetLink);
router.get ("/analytics/:shortId", handlegetAnalytics);

module.exports = router;