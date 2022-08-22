const mongoose = require('mongoose');


const sitrSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    siteCode : {type: String},
    siteName : {type: String},
    province : {type: String},
    siteFromCellCard : {type: String},
    priority : {type: String},
    cluster : {type: String},
    clusterTeam : {type: String},
    activationPlan : {type: String},
    siteAddress : {type: String},
    lattitude : {type: String},
    longitude : {type: String},
    towerHeight : {type: String},
    buildingHeight : {type: String},
    antennaHeight : {type: String},
    siteDown : {type: String},
    btsId : {type: String},
    btsName : {type: String},
    lnbtsId : {type: String},
    lnbtsName : {type: String},
    rncId : {type: String},
    rncName : {type: String},
    wbtsId : {type: String},
    bscId : {type: String},
    bscName : {type: String},
    bcfId : {type: String},
    oamIp : {type: String},
    subnetMask : {type: String},
    existingSiteConfiguration : {type: String},
    newSiteConfiguration : {type: String},
    u2978 : {type: String},
    u1076 : {type: String},
    u1078 : {type: String},
    u1081 : {type: String},
    u1083 : {type: String},
    u29789 : {type: String},
    u10762 : {type: String},
    u10787 : {type: String},
    note : {type: String}
    
})


module.exports = mongoose.model('Site', sitrSchema);