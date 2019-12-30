import http from './config'
// 博客列表
export const reqBlogList = (data = {}) => http({ method: 'GET', url: 'api/blogs', params: data })
// 添加博客
export const reqAddBlog = (data = {}) => http({ url: 'api/blogs/new', method: 'POST', data })
// 登录
export const reqLogin = (data = {}) => http({ url: 'api/users/login', method: 'POST', data })
// 添加评论
export const reqAddComment = (data = {}) => http({ url: 'api/users/comment', method: 'POST', data })
// 标签时间列表
export const reqTagAndTimeList = (data = {}) => http({ url: '/api/blogs/types', method: 'GET', params: data })
// 单篇博客
export const reqBlogItem = (data = {}) => http({ url: '/api/blogs/item', method: 'GET', params: data })
// 评论列表
export const reqCommentList = (data = {}) => http({ url: '/api/users/getcomlist', method: 'GET', params: data })

// 上传接口
export const reqUploads = (data = {}) => {
  http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  return http({ url: 'api/uploads/', method: 'POST', data })
}
