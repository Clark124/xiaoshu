var mongoose = require('mongoose');

var userScheme = new mongoose.Schema({
    "userId": String,
    "createTime":Date,
    "username": String,
    "password": String,
    "email": String,
    "attentions":[String],
    "fans":[String],
    "favorite":[String],
    "avatar": String,
    "sex":String,
    "resume":String,

})

var User = mongoose.model('user', userScheme)

module.exports = User

