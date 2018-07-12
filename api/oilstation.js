var express = require('express');
var router = express.Router();
var timeTool = require('./controllers/public/timeTool');
var oilStationSchema = require('./controllers/public/oilStationSchema');
var oilPriceSchema = require('./controllers/public/oilPriceSchema');


//获取加油站列表
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});




//接收前台传送数据解析，插入数据库
router.post('/add', function(req, res, next){
    console.log(req.body.oilName)
    try{
        if((!res.body.oilName) || (!res.body.lat) || (!res.body.long)){
           return  res.json({code:500, msg:'请填写必须信息'});    
        }
    }catch(err){

        return  res.json(err);        
    }
    
   


    if(req.body.oilName==''){
        console.log('asasas')
        res.json({code:500, msg:'请输入加油站名称'});
        return;
    }
    if(req.body.lat==''){
        res.json({code:500, msg:'请输入加油站坐标'});
        return;
    }
    if(req.body.long==''){
        res.json({code:500, msg:'请输入加油站坐标'});
        return;
    }

    var item ={};
    item.oilName = req.body.oilName;
    item.lat = req.body.lat;
    item.long = req.body.long;
    item.completed = false;
    item.create_time = timeTool.getCurDate();
    oilStationSchema.create(item, function(err, post){
        if(err){
            next(err)
        }else{
            return res.json({code:200, msg:'创建成功'})
        }
    });
});


//此接口用于查询，返回已经完成的任务
/* router.post('/finishAdd', function(req, res, next){
    var item = {};
    item._id = req.body._id;
    item.completed = true;
    item.updated_time = timeTool.getCurDate();
    todoSchema.findByIdAndUpdate(item._id, item, function(err, post){
        if(err){
            next(err)
        }else{
            res.redirect('/')
        }
    })
}); */


module.exports = router;
