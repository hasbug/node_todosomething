var express = require('express');
var router = express.Router();
var UserSchema = require('./controllers/public/UserSchema');
var crypto = require('crypto');
var timeTool = require('./controllers/public/timeTool')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//获取具体用户
router.get('/:name', function(req, res, next) {
  res.send('返回当前用户的信息，例如:名字='+req.params.name+' 6666666');
});


//用户注册
router.post('/register', function(req, res, next){

  console.log(req.body)
  
  var name = req.body.name;
  var password = req.body.password;
  var comfirmPassword = req.body.comfirmPassword;

  if(password !== comfirmPassword){
    res.json({code: 500, msg: '两次输入的密码不一致'});
    return;
  }

  UserSchema.findOne({'name': name}, function(err, data){
    if(err){
      res.json({code: 500, msg: 'check error'});
      return;
    }

    if(data!= null){
      console.log(data);
      res.json({code: 500, msg:'用户名已存在'});
      return;
    }

    //对密码进行md5加密
    var hash = crypto.createHash('sha1');
    hash.update(password);
    password = hash.digest('hex');

    var userInfo = {};
    userInfo.name = name;
    userInfo.password = password;

    UserSchema.create(userInfo, function(err,resData){
      if(err){
        res.json({code:500, msg:'注册失败，请重试'})
      }else{
        res.json({code:200, msg:'注册成功'})
      }

    })


  });

});

//登陆
router.post('/login', function(req,res,next){
  var name = req.body.name;
  var password = req.body.password;

  UserSchema.findOne({'name':name}, function(err, data){
    if(err){
      res.json({code:500, msg:'登录失败'});
      return;
    }

    if(data==null){
      res.json({code:500, msg:'用户不存在'});
      return;
    }

    var hash = crypto.createHash('sha1');
    hash.update(password);
    password = hash.digest('hex');
    UserSchema.findOne({'name':name, 'password': password}, function(err, data){
      if(err){
        res.json({code:500, msg:'登录失败'});
        return;
      }

      if(data==null){
        res.json({code: 500, msg: '密码不正确'});
        return;
      }

      UserSchema.findOneAndUpdate(
        {'name':name, 'password': password},
        {updated_time: timeTool.getCurDate()},
        function(err, data){
          if(err){
            res.json({code:500, msg:'登录失败'})
            return;
          }


          res.json({code: 200, msg: '登陆成功', _id:data._id});
          req.session.userName = req.body.name;  //设置session
          req.session.userId = data._id  //用户id存起来
          req.session.save();
        }
      )


    })

  });

})


module.exports = router;
