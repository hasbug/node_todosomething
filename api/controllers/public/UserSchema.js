var mongoose = require('mongoose');
var timeTool = require('./timeTool');

var UserSchema = new mongoose.Schema({
    id:Number,
    name: String,
    password: String,
    create_tiem: {type: Date, default: timeTool.getCurDate()},
    update_time: {type: Date, default: timeTool.getCurDate()}
});


module.exports = mongoose.model('User', UserSchema);