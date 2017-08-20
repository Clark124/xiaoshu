var express = require('express');
var router = express.Router();
var User = require('../models/user')
var md5 = require('../models/md5')
/* GET users listing. */

router.post('/', function (req, res, next) {
    let { username, password } = req.body
    password = md5(md5(password) + 'Clark')
    User.find({ username }, (error, result) => {
        if (error) {
            res.send({ status: 500, error: error });
            return;//服务器错误 
        }
        if (result.length === 0) {
            res.send({ status: 201, data: '用户名不存在' });
            return;
        } else if (result[0].password !== password) {
            res.send({ status: 202, data: '密码错误' });
            return;
        }
        const { username, email, userId, createTime, avatar, favorite, fans, attentions } = result[0]
        const data = { username, email, userId, createTime, avatar, favorite, fans, attentions }
        res.send({ status: 200, data: data })
    })


});

module.exports = router;
