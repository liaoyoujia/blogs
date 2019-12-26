const router = require('koa-router')()
const { upload } = require('../controllers/upload');
router.prefix('/api/uploads');
router.post('/', upload);

module.exports = router;
