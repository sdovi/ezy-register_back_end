const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
