
var mongoose = require('mongoose')
// var db = mongoose.createConnection('mongodb://127.0.0.1:27017/studentsystem')
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://47.91.156.35:27100/blog');
mongoose.connect('mongodb://127.0.0.1:27017/blog');
var db = mongoose.connection;
db.once('open', function (callback) {
    console.log('数据库成功连接');
})


// var userScheme = new mongoose.Schema({
//     "id": Number,
//     "username": String,
//     "password": String,
//     "avatar": String,
//     "collections": [{
//         "collectionid": Number,
//         "collectionName": String,
//         "notebook": [{
//             "noteid": Number,
//             "title": String,
//             "content": String,
//             "praise": [String],
//             "comment": [{ "username": String, "content": String, "dateTime": Date }]
//         }]
//     }]
// })

// var User = mongoose.model('user', userScheme)

// const obj = {
//     "id": 2,
//     "username": 'Clark',
//     "password":198701124,
//     "avatar": 'mr.jpg',
//     "collections": [{
//         "collectionid": 1000,
//         "collectionName": "日记本",
//         "notebook": [{
//             "noteid": 10001,
//             "title": 'javascript',
//             "content": '好好学习',
//             "praise": ["cheche"],
//             "comment": [{
//                 "username": "cheche",
//                 "content": "非常好"
//             }]
//         }
//       ]
//     }

//     ]
// }
// User.create(obj,(error)=>{
//     console.log('保存成功')
// })


module.exports = db;