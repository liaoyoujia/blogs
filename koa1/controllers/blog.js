const Blog = require('../models/blog');
const { SuccessModel } = require('../models/reply')
const { switchTimeFormat } = require('../util/index')
class Blogs {
  // 新建博客
  async create (ctx) {
    const blog = await new Blog(ctx.request.body).save()
    ctx.body = new SuccessModel(blog)
  }
  // 查询博客列表
  async find (ctx) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    const q = new RegExp(ctx.query.q);
    const total = await Blog.countDocuments({ $or: [{ title: q }, { tag: q }] }, (error, count) => { })
    const data = await Blog
      .find({ $or: [{ title: q }, { tag: q }] })
      .limit(perPage).skip(page * perPage);
    const res = { total, data }
    ctx.body = new SuccessModel(res)
  }

  // 更新博客
  async update (ctx) {
    let { id } = ctx.request.body
    const blog = await Blog.findByIdAndUpdate(id, ctx.request.body);
    if (!blog) { ctx.throw(404, '用户不存在'); }
    let newBlog = Object.assign(blog, ctx.request.body)
    ctx.body = new SuccessModel(newBlog)
  }

  // 删除博客
  async delete (ctx) {
    let { id } = ctx.request.body
    const blog = await Blog.findByIdAndRemove(id);
    if (!blog) { ctx.throw(404, '用户不存在'); }
    ctx.body = new SuccessModel("删除成功！")
  }

  // 查询博客类型
  async findType (ctx) {
    const data = await Blog.find().sort({ createdAt: -1 })
    const date = [...new Set(data.map((item) => switchTimeFormat(item.createdAt)))]
    const tags = [...new Set(data.filter(item => item.tag).map(item => item.tag))]
    const title = data.slice(0, 10).map(item => ({ title: item.title, _id: item._id }))
    ctx.body = new SuccessModel({ date, tags, title })
  }

  // 查询单个博客
  async findItem (ctx) {
    const { id } = ctx.query;
    const blog = await Blog.findById(id)
    if (!blog) { ctx.throw(404, '不存在该博客'); }
    ctx.body = new SuccessModel(blog)
  }
}

module.exports = new Blogs()
