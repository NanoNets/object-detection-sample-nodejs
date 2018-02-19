const request = require('request');
var apiKey = process.env.NANONETS_API_KEY;
var modelId = process.env.NANONETS_MODEL_ID;


const resp = request.get({
    url: `https://app.nanonets.com/api/v2/ObjectDetection/${modelId}/`,
    auth: {
        username: api,
        password: ''
    }
}, (err, body) => {
    console.log(err, body)
});