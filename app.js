const { log } = require("console");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const reader = require('xlsx');
const { Router } = require("express");
const file = reader.readFile('ana.xlsx')



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

  
let data = []
const sheets = file.SheetNames
function search() {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[1]])
    temp.forEach((res) => {
        data.push(res)
    })
}
search()
app.get('/getData/:siteName', (req, res) => {
    var results = [];
    console.log('hello');
    for (var i = 0; i < data.length; i++) {
        if (data[i]['Site Name'] == req.params.siteName) {
            results = data[i];
            break
        }
    }
    res.status(200).json({
        data: {
            siteCode: results['Site Code'] || null,
            siteName: results['Site Name'] || null,
            btsId: results['BTS ID'] || null,
            rncId: results['RNC ID'] || null,
            wbtsId: results['WBTS ID'] || null,
            bscId: results['BSC ID'] || null,
            bcfId: results['BCF ID'] || null,
            oamIp: results['OAM IP'] || null,
            existingSiteConfig: results['Existing Site Configuration'] || null,
            newSiteConfig: results['New Site Configuration'] || null,
        }
    })
})
console.log(data)
module.exports = app