
var mongoose = require('mongoose')
// var db = mongoose.createConnection('mongodb://127.0.0.1:27017/studentsystem')
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://47.91.156.35:27100/blog');
mongoose.connect('mongodb://127.0.0.1:27017/blog');
var db = mongoose.connection;
db.once('open', function (callback) {
    console.log('数据库成功连接');
})



module.exports = db;