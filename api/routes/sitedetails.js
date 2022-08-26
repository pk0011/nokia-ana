const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const reader = require('xlsx');
const file = reader.readFile('ana.xlsx')
const Site = require('../models/siteDetail')
const eFile = require('../models/file')
var fs = require('fs');

const multer = require("multer");
const path = require("path");
const { log } = require('console');
// // storage engine 

const storage = multer.diskStorage({
    
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


const fileFilter = (req, file, cb)=>{
    str = file.originalname
    const ext = str.slice(str.length - 5)
    if (ext == '.xlsx')
    cb(null, true)
    else
    cb(null, false)
}


const upload = multer({
    storage: storage,
    arrayKey: " ",
    limit: {
        fileSize: 1024 * 1024
    },
    fileFilter : fileFilter
}).single('l_file')


router.post("/addSiteDetails", upload, (req, res, next) => {

    try {
        str = req.file.path
        const ext = str.slice(str.length - 5)
        if (ext == '.xlsx') {



            var tempFile = new eFile({
                _id: mongoose.Types.ObjectId(),
                l_file: req.file.path
            })
                .save()
                .then(result => {
                    const file = reader.readFile(result.l_file)
                    var sheetName = file.SheetNames[0]
                    var sheetValue = file.Sheets[sheetName]
                    var data = reader.utils.sheet_to_json(sheetValue)

                    for (let i = 0; i < data.length; i++) {
                        const user = new Site({
                            _id: mongoose.Types.ObjectId(),
                            siteCode: data[i].siteCode || "-",
                            siteName: data[i].siteName || "-",
                            province: data[i].province || "-",
                            siteFromCellCard: data[i].siteFromCellCard || "-",
                            priority: data[i].priority || "-",
                            cluster: data[i].cluster || "-",
                            clusterTeam: data[i].clusterTeam || "-",
                            activationPlan: data[i].activationPlan || "-",
                            siteAddress: data[i].siteAddress || "-",
                            lattitude: data[i].lattitude || "-",
                            longitude: data[i].longitude || "-",
                            towerHeight: data[i].towerHeight || "-",
                            buildingHeight: data[i].buildingHeight || "-",
                            antennaHeight: data[i].antennaHeight || "-",
                            siteDown: data[i].siteDown || "-",
                            btsId: data[i].btsId || "-",
                            btsName: data[i].btsName || "-",
                            lnbtsId: data[i].lnbtsId || "-",
                            lnbtsName: data[i].lnbtsName || "-",
                            rncId: data[i].rncId || "-",
                            rncName: data[i].rncName || "-",
                            wbtsId: data[i].wbtsId || "-",
                            bscId: data[i].bscId || "-",
                            bscName: data[i].bscName || "-",
                            bcfId: data[i].bcfId || "-",
                            oamIp: data[i].oamIp || "-",
                            subnetMask: data[i].subnetMask || "-",
                            existingSiteConfiguration: data[i].existingSiteConfiguration || "-",
                            newSiteConfiguration: data[i].newSiteConfiguration || "-",
                            u2978: data[i].u2978 || "-",
                            u1076: data[i].u1076 || "-",
                            u1078: data[i].u1078 || "-",
                            u1081: data[i].u1081 || "-",
                            u1083: data[i].u1083 || "-",
                            u29789: data[i].u29789 || "-",
                            u10762: data[i].u10762 || "-",
                            u10787: data[i].u10787 || "-",
                            note: data[i].note || "-"
                        })
                            .save()
                            .then()
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })

                    }
                    
                    fs.unlink(req.file.path, function (err) {
                        if (err) throw err;
                    })
                    res.status(200).json({
                        success: true,
                        message: "Data added",
                        data: {
                            SiteInfo: data
                        }
                    })


                })
        }
        else {
            res.status(200).json({
                success: false,
                message: "Kindly upload file with extension '.xlsx'",
                data: null
            })
        }
    }
    catch (err) {
        console.log(err)
        res.status(200).json({
            error: err,
            message: "incorrect file"
        })
    }
})



router.get('/getSite/:siteName', (req, res, next) => {

    console.log("blah");
    Site.find({ siteName: req.params.siteName })
        .exec()
        .then(result => {
            console.log(result[0])
            if (result.length >= 1) {
                res.status(200).json({
                    success: true,
                    message: "Data found",
                    data: {
                        siteCode: result[0].siteCode || null,
                        siteName: result[0].siteName || null,
                        btsId: result[0].btsId || null,
                        rncId: result[0].rncId || null,
                        wbtsId: result[0].wbtsId || null,
                        bscId: result[0].bscId || null,
                        bcfId: result[0].bcfId || null,
                        oamIp: result[0].oamIp || null,
                        existingSiteConfig: result[0].existingSiteConfiguration || null,
                        newSiteConfig: result[0].newSiteConfiguration || null,
                    }
                })
            }
            else {
                res.status(200).json({
                    success: false,
                    message: "Data not found",
                    data: {
                        data: null
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
            })
        })
})


module.exports = router
