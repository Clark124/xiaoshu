var express = require('express');
var router = express.Router();
var User = require('../models/user')
var md5 = require('../models/md5')
/* GET users listing. */

router.post('/resetPassword', function (req, res, next) {
    let { username, password, newPassword } = req.body
    password = md5(md5(password) + 'Clark')
    User.find({ username }, (error, result) => {
        if (error) {
            res.send({ status: 500, error: error });
            return;//服务器错误 
        }
        if (result[0].password !== password) {
            res.send({ status: 202, data: '密码错误' });
            return;
        }
        newPassword = md5(md5(newPassword) + 'Clark')
        User.update({ username }, { password: newPassword }, (error) => {
            if (error) {
                res.send({ status: 500, error: error });
                return;//服务器错误 
            }
            res.send({ status: 200 })
        }) 
    })
});
router.post('/forgotPassword', function (req, res, next) { 
    let { username, email, password } = req.body
    password = md5(md5(password) + 'Clark')
    User.find({ username ,email}, (error, result) => {
        if (error) {
            res.send({ status: 500, error: error });
            return;//服务器错误 
        }
        console.log(result)
        if (result.length===0) {
            res.send({ status: 201, data: '用户名和邮箱不匹配' });
            return;
        }
        User.update({ username }, { password }, (error) => {
            if (error) {
                res.send({ status: 500, error: error });
                return;//服务器错误 
            }
            res.send({ status: 200 })
        }) 
    })
});

module.exports = router;