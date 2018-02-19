const request = require('request');
var apiKey = process.env.NANONETS_API_KEY;
var modelId = process.env.NANONETS_MODEL_ID;


const resp = request.post({
    url: `https://app.nanonets.com/api/v2/ObjectDetection/Model/${modelId}/Train/`,
    auth: {
        username: apiKey,
        password: ''
    }
}, (err, body) => {
    response = JSON.parse(body.body)
    console.log(response)
    console.log("\n\nNEXT RUN: node ./code/model-state.js")
});