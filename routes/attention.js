var express = require('express');
var router = express.Router();
var Article = require('../models/article')
var User = require('../models/user')

router.post('/fetchAttention', function (req, res) {
    const { userId } = req.body
    User.find({ userId }, (error, result) => {
        if (error) {
            res.json({ status: 500, error: error })
            return
        }
        if(result.length===0){
            res.json({ status: 202, error: '用户不存在' })
            return
        }
        let arr = [] 
        function iterator(i) {
            if (i == result[0].attentions.length) {
                const data = {
                    attentions: arr
                }
                res.json({ status: 200, data: data })
                return
            }
            User.find({ userId: result[0].attentions[i] }, (error, res) => {
                if (error) {
                    res.json({ status: 500, error: error })
                    return
                }
                arr.push({
                    username: res[0].username,
                    avatar: res[0].avatar,
                    userId: res[0].userId
                })
                iterator(i + 1)
            })

        }
        iterator(0)
    })


})

module.exports = router;