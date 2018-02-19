const request = require('request');
var apiKey = process.env.NANONETS_API_KEY;
var modelId = process.env.NANONETS_MODEL_ID;


const resp = request.get({
    url: `https://app.nanonets.com/api/v2/ObjectDetection/Model/${modelId}/`,
    auth: {
        username: apiKey,
        password: ''
    }
}, (err, body) => {
    response = JSON.parse(body.body)
    if (response.state != 5) {
		console.log("The model isn't ready yet, it's status is:", response.status)
		console.log("We will send you an email when the model is ready. If your imapatient, run this script again in 10 minutes to check.")
	} else {
		console.log("NEXT RUN: node ./code/prediction.js ./images/videoplayback0051.jpg")
	}
});