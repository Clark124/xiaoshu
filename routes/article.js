var express = require('express');
var router = express.Router();
var Article = require('../models/article')
var User = require('../models/user')

router.post('/addHits', function (req, res, next) {
  const { articleId, hits } = req.body
  Article.update({ articleId }, { "hits": hits }, (error, result) => {
    if (error) {
      res.json({ status: 500, error: error })
    }
    res.send()
  })
});

router.post('/addAttention', function (req, res, next) {
  const { authorUserId, userId } = req.body
  User.update({ userId }, { '$push': { "attentions": authorUserId } }, (error, result) => {
    if (error) {
      res.json({ status: 500, error: error })
    }
    User.update({ userId: authorUserId }, { '$push': { "fans": userId } }, (error, result) => {
      if (error) {
        res.json({ status: 500, error: error })
      }
      res.json({ status: 200 })
    })


  })
});
router.post('/removeAttention', function (req, res, next) {
  const { authorUserId, userId } = req.body
  User.update({ userId }, { '$pull': { "attentions": authorUserId } }, (error, result) => {
    if (error) {
      res.json({ status: 500, error: error })
    }
    User.update({ userId: authorUserId }, { '$pull': { "fans": userId } }, (error, result) => {
      if (error) {
        res.json({ status: 500, error: error })
      }
      res.json({ status: 200 })
    })


  })
});
router.post('/addPraise', function (req, res, next) {
  const { articleId, userId } = req.body
  Article.update({ articleId }, { '$push': { "praise": userId } }, (error, result) => {
    if (error) {
      res.json({ status: 500, error: error })
    }
    User.update({ userId }, { '$push': { "favorite": articleId } }, (error) => {
      if (error) {
        res.json({ status: 500, error: error })
      }
      res.json({ status: 200 })
    })


  })
});

router.post('/removePraise', function (req, res, next) {
  const { articleId, userId } = req.body
  Article.update({ articleId }, { '$pull': { "praise": userId } }, (error, result) => {
    if (error) {
      res.json({ status: 500, error: error })
    }
    User.update({ userId }, { '$pull': { "favorite": articleId } }, (error) => {
      if (error) {
        res.json({ status: 500, error: error })
      }
      res.json({ status: 200 })
    })

  })
});

router.post('/addSupport', function (req, res, next) {
  const { index, articleId, userId } = req.body
  Article.find({ articleId }, (error, result) => {
    if (error) {
      res.json({ status: 500, error: error })
    }
    if (result.length === 0) {
      res.json({ status: 202, error: '用户不存在' })
      return
    }
    result[0].comment[index].support.push(userId)
    result[0].markModified('support')
    result[0].save(function (err) {
      res.json({ status: 200 })
      return;
    })
  })
});



router.post('/removeSupport', function (req, res, next) {
  const { index, articleId, userId } = req.body
  Article.find({ articleId }, (error, result) => {
    if (error) {
      res.json({ status: 500, error: error })
    }
    if (result.length === 0) {
      res.json({ status: 202, error: '用户不存在' })
      return
    }
    const supportIndex = result[0].comment[index].support.indexOf(userId)
    result[0].comment[index].support.splice(supportIndex, 1)
    result[0].markModified('support')
    result[0].save(function (err) {
      res.json({ status: 200 })
      return;
    })
  })
});

router.post('/deleteReply', function (req, res, next) {
  const { commentIndex, replyIndex, articleId } = req.body
  Article.find({ articleId }, (error, result) => {
    if (error) {
      res.json({ status: 500, error: error })
    }
    if (result.length === 0) {
      res.json({ status: 202, error: '用户不存在' })
      return
    }
    result[0].comment[commentIndex].reply.splice(replyIndex, 1)
    result[0].markModified('reply')
    result[0].save(function (err) {
      res.json({ status: 200 })
      return;
    })
  })
});

router.post('/deleteComment', function (req, res, next) {
  const index = req.body.index
  const articleId = req.body.articleId
  console.log(index)
  Article.find({ articleId }, (error, result) => {
    if (error) {
      res.json({ status: 500, error: error })
    }
    if (result.length === 0) {
      res.json({ status: 202, error: '用户不存在' })
      return
    }
    result[0].comment.splice(index, 1)
    result[0].markModified('comment')
    result[0].save(function (err) {
      res.json({ status: 200 })
      return;
    })
  })
});

router.post('/addComment', function (req, res, next) {
  const articleObj = req.body
  const { articleId } = req.body
  Article.update({ articleId }, { '$push': { "comment": articleObj } }, (error) => {
    if (error) {
      res.json({ status: 500, error: error })
    }
    res.json({ status: 200 })
  })

});

router.post('/addReply', function (req, res, next) {
  const replyObj = req.body
  const { articleId, index } = req.body
  Article.find({ articleId }, (error, result) => {
    if (error) {
      res.json({ status: 500, error: error })
    }
    if (result.length === 0) {
      res.json({ status: 202, error: '用户不存在' })
      return
    }
    for (var i = 0; i < result[0].comment.length; i++) {
      if (i === index) {
        result[0].comment[i].reply.push(replyObj)
        result[0].markModified('reply')
        result[0].save(function (err) {
          res.json({ status: 200 })
          return;
        })
      }
    }
  })

});

router.post('/send', function (req, res, next) {
  var articleObj = req.body

  Article.create(articleObj, (error) => {
    if (error) {
      res.json({ status: 500, error: error })
    }
    res.json({ status: 200 })
  })

});
router.post('/update', function (req, res, next) {
  const { updateTime, title, content } = req.body
  const { username, collectionId, noteId } = req.body
  Article.update({ username, collectionId, noteId }, { updateTime, title, content }, (error) => {
    if (error) {
      res.json({ status: 500, error: error })
    }
    res.json({ status: 200 })
  })

});

router.post('/removenote', function (req, res, next) {

  const { username, collectionId, noteId } = req.body
  Article.remove({ username, collectionId, noteId }, (error) => {
    if (error) {
      res.json({ status: 500, error: error })
    }
    res.json({ status: 200 })
  })

});
router.post('/removecollection', function (req, res, next) {

  const { username, collectionId } = req.body
  Article.remove({ username, collectionId }, (error) => {
    if (error) {
      res.json({ status: 500, error: error })
    }
    res.json({ status: 200 })
  })

});

router.post('/fetcharticle', function (req, res) {
  const { userId } = req.body
  User.find({ userId }, (error, result) => {
    if (error) {
      res.json({ status: 500, error: error })
    }
    if (result.length === 0) {
      res.json({ status: 202, error: '用户不存在' })
      return
    }
    const { username, avatar, attentions, fans, userId, resume } = result[0]
    Article.find({ username }, (error, result1) => {
      if (error) {
        res.json({ status: 500, error: error })
      }
      const data = {
        article: result1,
        authorInfo: { username, avatar, attentions, fans, userId, resume }
      }
      res.send({ status: 200, data: data })
    })

  })
})

router.post('/fetchArticlePage', function (req, res) {

  const { articleId } = req.body
  Article.find({ articleId }, (error, result) => {
    if (error) {
      res.json({ status: 500, error: error })
      return;
    }
    if (result.length === 0) {
      res.json({ status: 202, error: '用户不存在' })
      return
    }
    User.find({ username: result[0].username }, (error, result1) => {
      if (error) {
        res.json({ status: 500, error: error })
        return;
      }
      Article.find({ username: result[0].username }, (error, allArticles) => {
        if (error) {
          res.json({ status: 500, error: error })
          return;
        }
        let words = 0, praises = 0
        allArticles.forEach((item) => {
          words += item.content.length
          praises += item.praise.length
        })
        const data = {
          article: result[0],
          authorAvatar: result1[0].avatar,
          authorUserId: result1[0].userId,
          authorSex: result1[0].sex,
          authorResume: result1[0].resume,
          attentionLen: result1[0].attentions.length,
          fansLen: result1[0].fans.length,
          wordsLen: words,
          praiseLen: praises
        }
        res.send({ status: 200, data: data })
      })
    })
  })
})

router.post('/fetchdata', function (req, res, next) {
  var username = req.body.username

  Article.find({ username: username }, (error, ret) => {
    if (error) {
      res.json({ status: 500, error: error })
    }

    if (ret.length !== 0) {
      let article = ret
      let arr = []
      article.forEach((item, index) => {
        let { collectionId, collectionName, noteId, title, content } = item
        let obj = {
          id: collectionId,
          collectionName,
          notebooks: [{
            noteId,
            title,
            content,
            isAttrubute: true,
            select: false
          }]
        }
        arr.push(obj)
      })

      let collectionNameArr = []
      arr.forEach((item, index) => { collectionNameArr.push(item.collectionName) })

      let norepeatCollectionNameArr = new Set(collectionNameArr)

      norepeatCollectionNameArr = [...norepeatCollectionNameArr].map((item, index) => {
        return arr.filter((arritem, index) => {
          return arritem.collectionName === item
        })
      })

      let result = norepeatCollectionNameArr.map((item) => {
        let obj = item[0]
        if (item.length > 0) {
          for (let i = 1; i < item.length; i++) {
            item[0].notebooks.push(item[i].notebooks[0])
          }
          return obj
        }
      })
      var data = {
        article: result
      }
      res.json({ status: 200, data: data })

    } else {
      let data = {
      }
      res.json({ status: 200, data: data })
    }
  })

});

module.exports = router;