const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const reader = require('xlsx');
const file = reader.readFile('ana.xlsx')
const Site = require('../models/siteDetail')

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
                        existingSiteConfig: result[0].existingSiteConfig || null,
                        newSiteConfig: result[0].newSiteConfig || null,
                    }
                })
            }
            else {
                res.status(404).json({
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
                error: err
            })
        })
})


router.post("/addSiteDetails", (req, res, next) => {
    console.log("adding details")
    console.log(req.body);
    const user = new Site({
        _id: mongoose.Types.ObjectId(),
        siteCode: req.body.siteCode || "-",
        siteName: req.body.siteName || "-",
        province: req.body.province || "-",
        siteFromCellCard: req.body.siteFromCellCard || "-",
        priority: req.body.priority || "-",
        cluster: req.body.cluster || "-",
        clusterTeam: req.body.clusterTeam || "-",
        activationPlan: req.body.activationPlan || "-",
        siteAddress: req.body.siteAddress || "-",
        lattitude: req.body.lattitude || "-",
        longitude: req.body.longitude || "-",
        towerHeight: req.body.towerHeight || "-",
        buildingHeight: req.body.buildingHeight || "-",
        antennaHeight: req.body.antennaHeight || "-",
        siteDown: req.body.siteDown || "-",
        btsId: req.body.btsId || "-",
        btsName: req.body.btsName || "-",
        lnbtsId: req.body.lnbtsId || "-",
        lnbtsName: req.body.lnbtsName || "-",
        rncId: req.body.rncId || "-",
        rncName: req.body.rncName || "-",
        wbtsId: req.body.wbtsId || "-",
        bscId: req.body.bscId || "-",
        bscName: req.body.bscName || "-",
        bcfId: req.body.bcfId || "-",
        oamIp: req.body.oamIp || "-",
        subnetMask: req.body.subnetMask || "-",
        existingSiteConfiguration: req.body.existingSiteConfiguration || "-",
        newSiteConfiguration: req.body.newSiteConfiguration || "-",
        u2978: req.body.u2978 || "-",
        u1076: req.body.u1076 || "-",
        u1078: req.body.u1078 || "-",
        u1081: req.body.u1081 || "-",
        u1083: req.body.u1083 || "-",
        u29789: req.body.u29789 || "-",
        u10762: req.body.u10762 || "-",
        u10787: req.body.u10787 || "-",
        note: req.body.note || "-"
    })
        .save()
        .then(usr => {
            res.status(200).json({
                success: true,
                message: "Data added",
                data: {
                    SiteInfo : usr
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

})


module.exports = router