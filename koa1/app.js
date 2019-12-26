const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const koaBody = require('koa-body');
const mongoose = require('mongoose');
const path = require('path');

const blogs = require('./routes/blog')
const users = require('./routes/users')
const upload = require('./routes/upload')


// error handler
onerror(app)
// 连接数据库
const { connectUrl } = require('./util/constant');
mongoose.connect(connectUrl, { useNewUrlParser: true }, () => console.log('MongoDB 连接成功了！'));
mongoose.connection.on('error', console.error);
// middlewares
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '/public/uploads'),
    keepExtensions: true,
  },
}));
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))

// routes
app.use(blogs.routes(), blogs.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
