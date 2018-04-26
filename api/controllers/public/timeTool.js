var timeTool ={};

timeTool.getCurDate = function GetCurDate(){
    var a = new Date().toLocaleString();
    return a;

}

timeTool.getDateString = function(date){
    var year = date.getFullYear();
}

module.exports = timeTool;