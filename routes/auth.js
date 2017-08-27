var express = require('express');
var router = express.Router();
var User = require('../models/user')
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//     done(null, obj);
// })


passport.use(new GitHubStrategy({
    clientID: 'ca34acf861e2fc21de0e',
    clientSecret: 'e9a40851535684d133d6be6211dbfbb0d5badfda',
    callbackURL: "http://127.0.0.1:3010/auth/github/callback"
},
    function (accessToken, refreshToken, profile, done) {
        done(null, profile)
    })
)

router.get('/github', passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home. 
        User.find({ username: req.user.username }, (error, result) => {
            if (error) {
                res.send({ status: 500, error: error });
                return;//服务器错误 
            }
            if (result.length === 0) {
                let userInfo = {
                    username: req.user.username,
                    userId: req.user.id,
                    createTime: new Date(),
                    attentions: [],
                    attentioned: [],
                    fans: [],
                    favorite: [],
                    sex: 'secret',
                    resume: '',
                    avatar: req.user._json.avatar_url,
                }
                User.create(userInfo, (error, result) => {
                    if (error) {
                        res.json({ status: 500, error: error })
                        return
                    }
                    req.session.username = req.user.username
                    res.redirect('/');
                    return
                }) 
            } 
            
            req.session.user = {username:req.user.username}
            console.log(req.session.user.username)
            res.redirect('/');
        })
    });


module.exports = router;
