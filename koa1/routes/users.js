const router = require('koa-router')()

router.prefix('/api/users')
const { create, login, list, comment, delete: del } = require('../controllers/user');

router.post('/register', create)

router.post('/login', login)

router.post('/delete', del)

router.post('/comment', comment)

router.get('/', list)



module.exports = router
