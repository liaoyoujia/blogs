const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const userSchema = new Schema({
  __v: { type: Number, select: false },
  username: { type: String, required: true },
  password: { type: String, required: true },
  comments: { type: [{ type: String }], required: false },
  role: { type: [{ type: String }], select: false }
}, { timestamps: true });

module.exports = model('User', userSchema);
