const router = require('koa-router')()
// const jwt = require('koa-jwt');
// const { secret } = require('../util/constant');
// const auth = jwt({ secret });
const { create, find, update, findType, findItem, delete: del } = require('../controllers/blog');

router.prefix('/api/blogs');

router.get('/', find);

router.get('/types', findType);

router.get('/item', findItem);

router.post('/new', create)

router.post('/delete', del)

router.post('/update', update)

module.exports = router
