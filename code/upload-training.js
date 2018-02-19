const parser = require('xml2json');
const fs = require("fs");
const request = require('request');
const async = require("async");
const find = require("find");
const path = require("path");

var apiKey = process.env.NANONETS_API_KEY;
var modelId = process.env.NANONETS_MODEL_ID;

const opts = {
    modelId: modelId,
    api: apiKey,
    annotationFolder: path.join(__dirname, '../annotations/xmls'),
    imageFolder: path.join(__dirname, '../images/')
}

find.file(opts.annotationFolder, (files) => {
    async.mapSeries(files, (file, outerCB) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                outerCB(err);
            }
            console.log(`processing ${file}`);
            let json, jsonObject;
            try {
                json = parser.toJson(data);
                jsonObject = JSON.parse(json);
            } catch (error) {
                outerCB(error);
            }

            const name = jsonObject.annotation.filename;
            let obj = jsonObject.annotation.object;
            if (!Array.isArray(obj)) obj = [obj];
            const out = {
                name,
                obj
            }
            async.mapSeries(obj, (element, callback) => {
                const category = element.name;
                const {
                    bndbox
                } = element;
                bndbox.xmin = parseInt(bndbox.xmin);
                bndbox.ymin = parseInt(bndbox.ymin);
                bndbox.xmax = parseInt(bndbox.xmax);
                bndbox.ymax = parseInt(bndbox.ymax);
                const jsonData = `[{"name":"${category.replace(/ /g,'')}", "bndbox": ${JSON.stringify(bndbox)}}]}]`
                const formData = {
                    modelId: opts.modelId,
                    data: `[{"filename":"${name}", "object": ${jsonData}`,
                    file: fs.createReadStream(path.join(opts.imageFolder, name))
                };

                const resp = request.post({
                    url: `https://app.nanonets.com/api/v2/ObjectDetection/Model/${opts.modelId}/UploadFile/`,
                    formData: formData,
                    auth: {
                        username: opts.api,
                        password: ''
                    }
                }, (err, body) => {
                    callback(err, body)
                });
            }, function (err, results) {
                outerCB(err, results);
            });
        });
    });
});