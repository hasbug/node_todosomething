var mongoose = require('mongoose');
var timeTool = require('./timeTool');


var oilStationSchema = new mongoose.Schema({
    completd: Boolean,
    id: mongoose.Schema.Types.ObjectId,
    oilName: String,
    lat: Number,
    long: Number,
    serve:[{
        id: mongoose.Schema.Types.ObjectId,
        desc:String
    }],
    createBy:String,
    updateBy:String,
    create_time: {type: Date, default: timeTool.getCurDate()},
    update_time: {type: Date, default: timeTool.getCurDate()},
});

module.exports = mongoose.model('oilStations', oilStationSchema);