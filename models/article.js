var mongoose = require('mongoose');

var articleScheme = new mongoose.Schema({
    "collectionId": Number,
    "collectionName": String,
    "username": String,
    "createTime": String,
    "updateTime": String,
    "noteId": Number,
    "articleId": String,
    "title": String,
    "content": String,
    "isAttrubute": Boolean,
    "praise": [String],
    "hits": Number,
    "comment": [{
        "username": String,
        "content": String,
        "createTime": String,
        "avatar": String,
        "support": [String],
        "userId": String,
        "reply": [{ "username": String, "content": String, "createTime": String,"userId":String }]
    }],
})

var Article = mongoose.model('artile', articleScheme)

module.exports = Article