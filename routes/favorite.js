var express = require('express');
var router = express.Router();
var Article = require('../models/article')
var User = require('../models/user')

router.post('/fetchFavorite', function (req, res) {
    const { userId } = req.body
    User.find({ userId }, (error, result) => {
        if (error) {
            res.json({ status: 500, error: error })
            return
        }
        if (result.length === 0) {
            res.json({ status: 202, error: '用户不存在' })
            return
        }
        let arr = []
        function iterator(i) {
            if (i == result[0].favorite.length) {
                const data = {
                    favorite: arr
                }
                res.json({ status: 200, data: data })
                return
            }
            Article.find({ articleId: result[0].favorite[i] }, (error, res) => {
                if (error) {
                    res.json({ status: 500, error: error })
                    return
                }
                if(res.length===0){
                    iterator(i + 1)
                    return
                }
                User.find({ username: res[0].username }, (error, user) => {
                    if (error) {
                        res.json({ status: 500, error: error })
                        return
                    }
                    const obj = {
                        article: res[0],
                        authorInfo: {
                            username: user[0].username,
                            avatar: user[0].avatar,
                            userId: user[0].userId
                        }
                    }
                    arr.push(obj)
                    iterator(i + 1)
                })
            })
        }
        iterator(0)
    })


})

module.exports = router;