const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  deposit: Number,
  role: String,
  tokens: [String],
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
