const URL = require ("../models/url");
const shortid = require ("shortid");

async function handleGenerateNerShortURL (req,res) {
    const body = req.body;
    if (!body.url){
        return res.status (400).json ("url is required");
    }
    const shortID = shortid (8);

    await URL.create ({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : [],
    });

    return res.render ("home", {
        id : shortID,
    });
}

async function handleGetLink (req,res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate (
        {
            shortId,
        },
        {
            $push : {
                visitHistory : {
                    timeStamp : Date.now(),
                },
            },
        }
    );
    return res.redirect (entry.redirectURL);
}

async function handlegetAnalytics (req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne ({shortId});
    return res.json ({totalClicks : result.visitHistory.length, analytics : result.visitHistory});
}

module.exports = {
    handleGenerateNerShortURL,
    handleGetLink,
    handlegetAnalytics,
};