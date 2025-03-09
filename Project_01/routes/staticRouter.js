const express = require ("express");
const router = express.Router();
const URL = require ("../models/url");
const { restrictTo } = require("../middlewares/auth");

router.get ("/",restrictTo(["NORMAL"]),async (req,res)=> {
    // router.get ("/",async (req,res)=> {   // where both comment and above line both are correct
    const allurls = await URL.find({});
    return res.render ("home",{
        urls : allurls,
    });
});

router.get ("/signup", (req,res)=> {
    return res.render ("signup");
});

router.get ("/login", (req,res)=> {
    return res.render ("login");
});

module.exports = router;