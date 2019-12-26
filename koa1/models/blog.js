const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const blogSchema = new Schema({
  __v: { type: Number, select: false },
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['技术博客', '生活杂谈'], default: '生活杂谈', required: true },
  tag: { type: String, required: true }
}, { timestamps: true });

module.exports = model('Blog', blogSchema);
