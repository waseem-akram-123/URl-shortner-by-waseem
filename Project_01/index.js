const express = require ("express");
const app = express();
const PORT = 8000;
const {connectToMongodb} = require ("./connection");
const urlRoute = require ("./routes/url");
// const URL = require ("./models/url");
const path = require ("path");
const staticRoute = require ("./routes/staticRouter");
const cookieParser = require ("cookie-parser");
const userRoute = require ("./routes/user");
const {checkAuthentication,restrictTo} = require ("./middlewares/auth");

// connection
connectToMongodb ("mongodb://127.0.0.1:27017/URL-SHORTNER").then (()=> {
    console.log ("mongodb is connected !");
}).catch ((err)=> {
    console.log ("Error", err);
});

// set up ejs  ---> Known as Server Side Rendering 
app.set ("view engine", "ejs");
app.set ("views", path.join (__dirname, "views"));

// middlewares
app.use (express.json());  // to parse json data
app.use (express.urlencoded ({extended : false}));  // to parse form data
app.use (cookieParser());    // to parse cookie

 app.use (checkAuthentication);   // always running middleware

// routes

// app.use ("/url",restrictTo("NORMAL"),urlRoute);

app.use ("/url",restrictTo(["NORMAL"]),urlRoute);  // (  [ ]   )  -- > see properply the brackets

app.use ("/user", userRoute);

app.use ("/", staticRoute);

// app.get ("/url/:shortId", async (req,res) => {
//     const shortId = req.params.shortId;
//     const entry = await URL.findOneAndUpdate (
//         {
//             shortId,
//         },
//         {
//             $push : {
//                 visitHistory : {
//                     timeStamp : Date.now(),
//                 },
//             },
//         }
//     );
//      res.redirect (entry.redirectURL);
// });

app.listen (PORT, ()=> console.log (`server started at PORT ${PORT}`));