var mongoose = require('mongoose');
var timeTool = require('./timeTool');


var oilStationSchema = new mongoose.Schema({
    completd: Boolean,
    oilId: String,
    oilList:[{
        oilType: String,
        oilPrice: Number
    }],
    id: mongoose.Schema.Types.ObjectId,
    userId:String,
    create_time: {type: Date, default: timeTool.getCurDate()},
    update_time: {type: Date, default: timeTool.getCurDate()},
});

module.exports = mongoose.model('oilStation', oilStationSchema);