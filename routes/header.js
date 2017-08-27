var express = require('express');
var router = express.Router();
var User = require('../models/user')

router.post('/userInfo', function (req, res, next) {
    let { username } = req.body
    User.find({ username }, (error, result) => {
        if (error) {
            res.send({ status: 500, error: error });
            return;//服务器错误 
        }
        const { username, email, userId, createTime, avatar, fans, attentions, favorite, sex, resume } = result[0]
        const data = { username, email, userId, createTime, avatar, fans, favorite, attentions, sex, resume }
        res.send({ status: 200, data: data })
    })
});
// router.get('/getSession',function(req,res){
//     console.log(req.session.user)
    
//     res.send({status:404})
// })
module.exports = router;