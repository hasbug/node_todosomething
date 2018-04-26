var mongoose = require('mongoose');
var timeTool = require('./timeTool');


var ToDoSchema = new mongoose.Schema({
    completd: Boolean,
    note: String,
    userId: mongoose.Schema.Types.ObjectId,
    create_time: {type: Date, default: timeTool.getCurDate()},
});

module.exports = mongoose.model('ToDo', ToDoSchema);