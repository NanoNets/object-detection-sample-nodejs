const parser = require('xml2json');
const fs = require("fs");
const request = require('request');
const async = require("async");
const find = require("find");
const path = require("path");

const opts = {
    annotationFolder: path.join(__dirname, '../annotations/xmls')
}

find.file(opts.annotationFolder, (files) => {
    async.mapSeries(files, (file, outerCB) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                outerCB(err);
            }
            console.log(`processing ${file}`);
            const json = parser.toJson(data);
            const jsonObject = JSON.parse(json);
            const name = jsonObject.annotation.filename.split('.')[0];
            let obj = jsonObject.annotation.object;
            if (!Array.isArray(obj)) obj = [obj];
            obj.forEach(elem => {
                elem.name = elem.name.replace(/ /g,'');
                const {bndbox} = elem;
                elem.bndbox = {xmin: parseInt(bndbox.xmin), ymin: parseInt(bndbox.ymin), xmax: parseInt(bndbox.xmax), ymax: parseInt(bndbox.ymax)}
            });
            fs.writeFileSync(path.join(__dirname, '../annotations/json/', name + '.json'), JSON.stringify(obj), 'utf-8')
            outerCB(null, obj)
        });
    });
});