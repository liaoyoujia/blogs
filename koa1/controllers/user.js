const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');
const { SuccessModel } = require('../models/reply')
const { secret } = require('../util/constant');
class Users {
  // 新建
  async create (ctx) {
    const { username } = ctx.request.body
    const repeatUser = await User.findOne({ username })
    if (repeatUser) {
      ctx.throw(409, '用户已被占用！')
    }
    const user = await new User(ctx.request.body).save()
    ctx.body = new SuccessModel(user)
  }

  // 登录
  async login (ctx) {
    const user = await User.findOne(ctx.request.body)
    if (!user) { ctx.throw(401, '用户或密码填写错误！') }
    const { _id, name } = user;
    const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: 60 });
    ctx.body = new SuccessModel(token)
  }

  async list (ctx) {
    const data = await User.find()
    ctx.body = data
  }

  async delete (ctx) {
    let { id } = ctx.request.body
    const blog = await User.findByIdAndRemove(id);
    if (!blog) { ctx.throw(404, '用户不存在'); }
    ctx.body = new SuccessModel("删除成功！")
  }
  // 评论
  async comment (ctx) {
    const { commentItems } = ctx.request.body
    const user = await User.find()
    let comments = user[0]['comments'] || []
    comments.push(commentItems)
    await user[0].updateOne({ comments });
    ctx.body = new SuccessModel(user);
  }

  //评论列表
  async commentList (ctx) {
    const user = await User.find()
    const comments = user[0]['comments'] || []
    ctx.body = new SuccessModel(comments);
  }
}

module.exports = new Users()
