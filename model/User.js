const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  img: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  // username: {
  //   type: String,
  //   // required: true,
  //   // unique: true,
  // },
  role: {
    type: String,
    default: "Customer",
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: [String],
});

module.exports = mongoose.model("User", userSchema);
