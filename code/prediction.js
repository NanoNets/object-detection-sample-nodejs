const request = require('request');
var apiKey = process.env.NANONETS_API_KEY;
var modelId = process.env.NANONETS_MODEL_ID;
const ImagePath = '';


const formData = {
    modelId,
    file: fs.createReadStream(ImagePath)
};
const resp = request.post({
    url: `https://app.nanonets.com/api/v2/ObjectDetection/Model/${modelId}/UploadFile/`,
    formData: formData,
    auth: {
        username: api,
        password: ''
    }
}, (err, body) => {
    callback(err, body)
});