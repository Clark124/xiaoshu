var express = require('express');
var router = express.Router();
var User = require('../models/user')
var md5 = require('../models/md5')
/* GET users listing. */

router.post('/', function (req, res, next) {
  let { username, password, email, userId } = req.body
  password = md5(md5(password) + 'Clark')
  let userInfo = {
    username,
    password,
    email,
    userId,
    createTime: new Date(),
    attentions: [],
    attentioned: [],
    fans: [],
    favorite: [],
    sex:'secret',
    resume:'',
    avatar: 'https://res.cloudinary.com/dqaapmcak/image/upload/v1502766668/jbzbomsiko5c7envgbmz.jpg',
  }
  User.find({ username }, (error, result) => {

    if (error) {
      res.send({ status: 500, error: error });
      return;//服务器错误 
    }

    if (result.length !== 0) {
      res.send({ status: 201, message: '用户名已存在' });
      return;
    }
    User.create(userInfo, (error, result) => {
      if (error) {
        res.json({ status: 500, error: error })
        return
      }
      const { username, email, userId, createTime, avatar, favorite, fans, attentions } = result
      const data = { username, email, userId, createTime, avatar, favorite, fans, attentions }
      res.json({ status: 200, data: data })
    })
  })


});

module.exports = router;
