var express = require('express');
var router = express.Router();
var Article = require('../models/article')
var User = require('../models/user')

router.post('/', function (req, res) {
    let { page } = req.body
    Article.find({}, null, { skip: page * 5, limit: 5, sort: { "updateTime": -1 } }, (error, result) => {
        if (error) {
            res.json({ status: 500, error: error })
            return
        }
        let arr = []
        function iterator(i) {
            if (i == result.length) {
                const data = {
                    articleList: arr
                }
                res.json({ status: 200, data: data })
                return
            }
            User.find({ username: result[i].username }, (error, res) => {
                if (error) {
                    res.json({ status: 500, error: error })
                    return
                }
                const obj = {
                    article: result[i],
                    authorInfo: {
                        username: res[0].username,
                        avatar: res[0].avatar,
                        userId: res[0].userId
                    }
                }
                arr.push(obj)
                iterator(i + 1)
            })

        }
        iterator(0)
    })
})

router.post('/recommendAuthor', function (req, res) {
    let { page } = req.body
    User.find({}, null, { skip: page * 5, limit: 5, }, (error, result) => {
        if (error) {
            res.json({ status: 500, error: error })
            return
        }
        let arr = []
        function iterator(i) {
            if (i == result.length) {
                const data = {
                    authorList: arr
                }
                res.json({ status: 200, data: data })
                return
            }
            Article.find({ username: result[i].username }, (error, res) => {
                if (error) {
                    res.json({ status: 500, error: error })
                    return
                }
                let words = 0,
                    praise = 0

                res.forEach((item) => {
                    words += item.content.length
                    praise += item.praise.length
                })
                const obj = {
                    author: {
                        username: result[i].username,
                        userId: result[i].userId,
                        avatar: result[i].avatar,
                    },
                    words: words,
                    praise: praise
                }
                arr.push(obj)
                iterator(i + 1)
            })

        }
        iterator(0)
    })
})

module.exports = router;