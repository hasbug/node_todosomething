var express = require('express');
var router = express.Router();
var timeTool = require('./controllers/public/timeTool');
var todoSchema = require('./controllers/public/TodoSchema');


//获取todo列表
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/todolist', function(req,res,next){
    todoSchema.find({},null, function(err, data){
        if(err){
            res.json({code:500, msg:'查询出错'});
            return;
        }

        if(data){
            res.json({
                code:200,
                data:data,
                msg:'查询成功'
            })
        }

    })

});


//接收前台传送数据解析，插入数据库
router.post('/addTODO', function(req, res, next){
    console.log(req.body)
    
    //判断是否存在用户session
    if(!req.session.userId){
        res.json({code:500, msg:'请先登录'});
        return;
    }


    if(req.body.note==''){
        res.json({code:500, msg:'请输入todo内容'});
        return;
    }

    var item ={};
    item.note = req.body.note;
    item.userId = req.session.userId;
    item.completed = false;
    item.create_time = timeTool.getCurDate();
    todoSchema.create(item, function(err, post){
        if(err){
            next(err)
        }else{
            res.send({code:200, msg:'创建成功'})
        }
    });
});


//此接口用于查询，返回已经完成的任务
router.post('/finishAdd', function(req, res, next){
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
});


module.exports = router;
