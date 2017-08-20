var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;


passport.serializeUser(function(user, done){
    console.log('---serializeUser---')
    console.log(user)
    done(null,user);
});

passport.deserializeUser(function(obj,done){
    console.log('---serializeUser---')
    done(null,obj);
})




passport.use(new GitHubStrategy({
    clientID: '2ac39f481b737fea19a4',
    clientSecret: '63e715d444dd2cf74784f98c19126cd5e30920ad',
    callbackURL: "http://127.0.0.1:3010/auth/github/callback"
  },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ githubId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }  
// ));
     function(accessToken,refreshToken,profile,done){
        done(null,profile)
    }))


router.get('/',function(req,res){
    res.send()
});

 
router.get('/github/callback', 
passport.authenticate('github', { failureRedirect: '/login' }),
function(req, res) {
// Successful authentication, redirect home. 
    console.log('success.....')
    console.log(req.user);
     req.session.user = {
        id: req.user._json.uid,
        username: req.user.displayName || req.user.username,
        avatar: req.user._json.avatar_url,
        provider: req.user.provider
    }
    res.redirect('/');
});

router.get('/logout',function(req,res){
    req.session.destroy()
    res.redirect('/')




})




module.exports = router;
