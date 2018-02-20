const request = require('request');
const fs = require("fs");
var apiKey = process.env.NANONETS_API_KEY;
var modelId = process.env.NANONETS_MODEL_ID;
const ImagePath = process.argv[2];

const formData = {
    modelId: modelId,
    file: fs.createReadStream(ImagePath)
};
const resp = request.post({
    url: `https://app.nanonets.com/api/v2/ObjectDetection/Model/${modelId}/LabelFile/`,
    formData: formData,
    auth: {
        username: apiKey,
        password: ''
    }
}, (err, body) => {
	response = JSON.parse(body.body)

	for (i=0;i<response.result.length;i++){
		console.log("input: "+response.result[i].input);
		console.log(response.result[i].prediction);
		console.log("\n");
	}
});