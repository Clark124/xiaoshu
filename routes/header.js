var express = require('express');
var router = express.Router();
var User = require('../models/user')
var Article = require('../models/article')
router.post('/userInfo', function (req, res, next) {
    let { username } = req.body
    User.find({ username }, (error, result) => {
        if (error) {
            res.send({ status: 500, error: error });
            return;//服务器错误 
        }
        Article.find({username},(error,articles)=>{
            if (error) {
                res.send({ status: 500, error: error });
                return;//服务器错误 
            }
            const articlelen = articles.length
            const { username, email, userId, createTime, avatar, fans, attentions, favorite, sex, resume } = result[0]
            const data = { username, email, userId, createTime, avatar, fans, favorite, attentions, sex, resume,articlelen }
            res.send({ status: 200, data: data })
        })
        
    })
});
// router.get('/getSession',function(req,res){
//     if(req.session.username){
//         res.send({status:200,data:req.session.username})
//     }else{
//         req.send({status:404})
//     }
// })
module.exports = router;