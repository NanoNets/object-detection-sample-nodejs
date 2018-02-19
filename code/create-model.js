var apiKey = process.env.NANONETS_API_KEY;

var request = require("request");

var options = {
    method: 'POST',
    url: 'https://app.nanonets.com/api/v2/ObjectDetection/Model/',
    auth: {
        'user': apiKey
    },
    body: {
        categories: ['TieFighter', 'MillenniumFalcon']
    },
    json: true
};

request(options, function(error, response, body) {
    if (error) throw new Error(error);
    model_id = body["model_id"];
    console.log("NEXT RUN: export NANONETS_MODEL_ID=" + model_id);
    console.log("THEN RUN: node ./code/upload-training.js");
});