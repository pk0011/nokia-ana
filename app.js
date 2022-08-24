const { log } = require("console");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const reader = require('xlsx');
const { Router } = require("express");
const file = reader.readFile('ana.xlsx')
const mongoose = require("mongoose")



const siteRoutes = require('./api/routes/sitedetails')





const URI = "mongodb+srv://1234:1234@cluster0.tegd4kr.mongodb.net/?retryWrites=true&w=majority"
// const URI="mongodb://localhost:27017/sitedetails";
mongoose.connect(URI, {

    useNewUrlParser: true, 
    
    useUnifiedTopology: true 
    
    }, err => {
    if(err) throw err;
    console.log('Connected to MongoDB!!!!')
    });


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

app.use(express.static('upload'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log("hello");

app.use('/siteDetails', siteRoutes);


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    // console.log(error);
    res.status(error.status || 500);
    res.json({
      error: {
        message: error
      }
    });
  });

// let data = []
// const sheets = file.SheetNames
// // function search() {
// //     const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[1]])
// //     temp.forEach((res) => {
// //         data.push(res)
// //     })
// // }
// // search()
// app.get('/getData/:siteName', (req, res) => {
//     var results = [];
//     console.log('hello');
//     for (var i = 0; i < data.length; i++) {
//         if (data[i]['Site Name'] == req.params.siteName) {
//             results = data[i];
//             break
//         }
//     }
//     res.status(200).json({
//         data: {
//             siteCode: results['Site Code'] || null,
//             siteName: results['Site Name'] || null,
//             btsId: results['BTS ID'] || null,
//             rncId: results['RNC ID'] || null,
//             wbtsId: results['WBTS ID'] || null,
//             bscId: results['BSC ID'] || null,
//             bcfId: results['BCF ID'] || null,
//             oamIp: results['OAM IP'] || null,
//             existingSiteConfig: results['Existing Site Configuration'] || null,
//             newSiteConfig: results['New Site Configuration'] || null,
//         }
//     })
// })
// console.log(data)
module.exports = app
