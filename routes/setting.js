var formidable = require('formidable')
var express = require('express');
var router = express.Router();
var User = require('../models/user')

router.post('/setAvatar', function (req, res) {
    const { username, avatar } = req.body
    User.update({ username }, { avatar: avatar }, (error) => {
        if (error) {
            res.json({ status: 500, error: error })
            return
        }
        res.json({ status: 200 })
    })


})

router.post('/updateUserInfo', function (req, res) {
    const { username ,userId} = req.body
    User.update({ username }, { '$set':req.body }, (error) => {
        if (error) {
            res.json({ status: 500, error: error })
            return
        }
        res.json({ status: 200 })
    })


})

module.exports = router;
